/**
 * ClickUp API Client with retry logic and error handling
 * 
 * Two-step task creation:
 * 1. Create task with minimal payload (name + description only)
 * 2. Set custom fields one-by-one (safer, identifies which field fails)
 */

import { randomUUID } from 'crypto';

export interface ClickUpTask {
  id: string;
  name: string;
  url: string;
  status?: string;
  customFieldsApplied?: number;
  customFieldsFailed?: string[];
}

export interface ClickUpError {
  type: 'auth' | 'payload' | 'rate_limit' | 'server' | 'network' | 'unknown';
  statusCode?: number;
  message: string;
  retryable: boolean;
  details?: any;
}

interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
};

// Cache for list custom fields (TTL: 5 minutes)
const customFieldsCache: {
  [listId: string]: {
    fields: any[];
    timestamp: number;
  };
} = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateBackoff(attempt: number, config: RetryConfig): number {
  const delay = Math.min(
    config.initialDelay * Math.pow(config.backoffMultiplier, attempt),
    config.maxDelay
  );
  const jitter = delay * (0.5 + Math.random());
  return Math.min(jitter, config.maxDelay);
}

function classifyError(statusCode: number, responseBody: any): ClickUpError {
  if (statusCode === 401 || statusCode === 403) {
    return {
      type: 'auth',
      statusCode,
      message: 'Invalid or expired ClickUp API token',
      retryable: false,
      details: responseBody,
    };
  }

  if (statusCode === 429) {
    return {
      type: 'rate_limit',
      statusCode,
      message: 'ClickUp API rate limit exceeded',
      retryable: true,
      details: responseBody,
    };
  }

  if (statusCode >= 400 && statusCode < 500) {
    return {
      type: 'payload',
      statusCode,
      message: 'Invalid request payload for ClickUp API',
      retryable: false,
      details: responseBody,
    };
  }

  if (statusCode >= 500) {
    return {
      type: 'server',
      statusCode,
      message: 'ClickUp API server error',
      retryable: true,
      details: responseBody,
    };
  }

  return {
    type: 'unknown',
    statusCode,
    message: 'Unknown ClickUp API error',
    retryable: false,
    details: responseBody,
  };
}

/**
 * Get custom fields for a list (cached)
 */
async function getListCustomFields(
  apiToken: string,
  listId: string,
  requestId: string
): Promise<any[]> {
  // Check cache
  const cached = customFieldsCache[listId];
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    console.log(`[${requestId}] Using cached custom fields for list ${listId}`);
    return cached.fields;
  }

  try {
    console.log(`[${requestId}] Fetching custom fields for list ${listId}`);
    
    const response = await fetch(`https://api.clickup.com/api/v2/list/${listId}/field`, {
      headers: { 'Authorization': apiToken },
    });

    if (!response.ok) {
      console.error(`[${requestId}] Failed to fetch custom fields: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const fields = data.fields || [];

    // Cache the result
    customFieldsCache[listId] = {
      fields,
      timestamp: Date.now(),
    };

    console.log(`[${requestId}] Found ${fields.length} custom fields`);
    return fields;
  } catch (error: any) {
    console.error(`[${requestId}] Error fetching custom fields:`, error.message);
    return [];
  }
}

/**
 * Set a custom field on a task
 */
async function setCustomField(
  apiToken: string,
  taskId: string,
  fieldId: string,
  value: any,
  requestId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(
      `https://api.clickup.com/api/v2/task/${taskId}/field/${fieldId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiToken,
        },
        body: JSON.stringify({ value }),
      }
    );

    if (response.ok) {
      return { success: true };
    }

    const errorText = await response.text();
    console.error(`[${requestId}] Field ${fieldId} failed (${response.status}):`, errorText);
    
    return {
      success: false,
      error: `${response.status}: ${errorText.substring(0, 100)}`,
    };
  } catch (error: any) {
    console.error(`[${requestId}] Field ${fieldId} exception:`, error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Create ClickUp task with two-step approach:
 * 1. Create minimal task (name + description only)
 * 2. Add custom fields one-by-one
 */
export async function createClickUpTask(
  apiToken: string,
  listId: string,
  taskPayload: any,
  requestId: string = randomUUID(),
  config: Partial<RetryConfig> = {}
): Promise<{ success: true; task: ClickUpTask } | { success: false; error: ClickUpError }> {
  const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  
  // STEP 1: Create task with MINIMAL payload
  const minimalPayload: any = {
    name: taskPayload.name,
    description: taskPayload.description || taskPayload.markdown_description || '',
  };

  // Optional safe fields
  // NOTE: Do NOT include status - ClickUp rejects it with CRTSK_001 error
  // Status is for internal tracking only (UnifiedStore/Google Sheets)
  if (taskPayload.priority) minimalPayload.priority = taskPayload.priority;
  if (taskPayload.tags && Array.isArray(taskPayload.tags)) {
    minimalPayload.tags = taskPayload.tags;
  }

  // DEBUG: Log sanitized payload (no tokens, hash email if present)
  console.log(`[${requestId}] ClickUp minimal payload:`, {
    name: minimalPayload.name?.substring(0, 50) + '...',
    descriptionLength: minimalPayload.description?.length || 0,
    status: minimalPayload.status,
    priority: minimalPayload.priority,
  });

  let lastError: ClickUpError | null = null;
  let createdTask: any = null;

  // Retry loop for task creation
  for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`[${requestId}] ClickUp retry attempt ${attempt}/${retryConfig.maxRetries}`);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': apiToken,
          },
          body: JSON.stringify(minimalPayload),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      const text = await response.text();
      let responseBody: any = null;
      try {
        responseBody = text ? JSON.parse(text) : null;
      } catch {
        responseBody = { raw: text };
      }

      if (response.ok) {
        createdTask = responseBody;
        console.log(`[${requestId}] ✅ Task created: ${createdTask.id}`);
        break; // Success! Exit retry loop
      }

      // Task creation failed
      const error = classifyError(response.status, responseBody);
      lastError = error;

      // DEBUG: Log full error response for 400 errors
      if (response.status === 400) {
        console.error(`[${requestId}] 400 Bad Request - Full response:`, JSON.stringify(responseBody, null, 2));
      }

      console.error(`[${requestId}] Task creation failed:`, {
        type: error.type,
        statusCode: error.statusCode,
        message: error.message,
        attempt: attempt + 1,
      });

      if (!error.retryable || attempt === retryConfig.maxRetries) {
        return { success: false, error };
      }

      const backoffDelay = calculateBackoff(attempt, retryConfig);
      console.log(`[${requestId}] Retrying in ${Math.round(backoffDelay)}ms...`);
      await sleep(backoffDelay);

    } catch (err: any) {
      lastError = {
        type: 'network',
        message: err.message || 'Network request failed',
        retryable: true,
        details: { name: err.name, message: err.message },
      };

      console.error(`[${requestId}] Network error:`, lastError.message);

      if (attempt === retryConfig.maxRetries) {
        return { success: false, error: lastError };
      }

      const backoffDelay = calculateBackoff(attempt, retryConfig);
      await sleep(backoffDelay);
    }
  }

  // If task creation failed after all retries
  if (!createdTask) {
    return {
      success: false,
      error: lastError || {
        type: 'unknown',
        message: 'Failed to create task after retries',
        retryable: false,
      },
    };
  }

  // STEP 2: Add custom fields one-by-one (best effort)
  const customFields = taskPayload.custom_fields || [];
  const appliedFields: string[] = [];
  const failedFields: string[] = [];

  if (customFields.length > 0) {
    console.log(`[${requestId}] Applying ${customFields.length} custom fields...`);

    // Get list fields for validation
    const listFields = await getListCustomFields(apiToken, listId, requestId);
    const validFieldIds = new Set(listFields.map((f: any) => f.id));

    for (const field of customFields) {
      const fieldId = field.id;
      const value = field.value;

      // Skip if field doesn't exist on list
      if (!validFieldIds.has(fieldId)) {
        console.warn(`[${requestId}] Field ${fieldId} not found on list, skipping`);
        failedFields.push(`${fieldId} (not on list)`);
        continue;
      }

      // Skip if value is empty
      if (value === null || value === undefined || value === '') {
        console.log(`[${requestId}] Field ${fieldId} has empty value, skipping`);
        continue;
      }

      // Try to set the field
      const result = await setCustomField(apiToken, createdTask.id, fieldId, value, requestId);

      if (result.success) {
        appliedFields.push(fieldId);
      } else {
        failedFields.push(`${fieldId} (${result.error})`);
      }
    }

    console.log(`[${requestId}] Custom fields: ${appliedFields.length} applied, ${failedFields.length} failed`);
    
    if (failedFields.length > 0) {
      console.warn(`[${requestId}] Failed fields:`, failedFields);
    }
  }

  // Return success with task info
  return {
    success: true,
    task: {
      id: createdTask.id,
      name: createdTask.name,
      url: createdTask.url,
      status: createdTask.status?.status,
      customFieldsApplied: appliedFields.length,
      customFieldsFailed: failedFields.length > 0 ? failedFields : undefined,
    },
  };
}

/**
 * Test ClickUp API health
 */
export async function testClickUpHealth(
  apiToken: string,
  timeout: number = 5000
): Promise<{ ok: boolean; latencyMs?: number; error?: string }> {
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch('https://api.clickup.com/api/v2/user', {
      method: 'GET',
      headers: { 'Authorization': apiToken },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const latencyMs = Date.now() - startTime;

    if (response.ok) {
      return { ok: true, latencyMs };
    }

    return {
      ok: false,
      latencyMs,
      error: `HTTP ${response.status}: ${response.statusText}`,
    };
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    return {
      ok: false,
      latencyMs,
      error: err.message || 'Request failed',
    };
  }
}
