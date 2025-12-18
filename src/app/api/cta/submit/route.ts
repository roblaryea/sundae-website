import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { saveSubmissionUnified, updateSubmissionUnified, getStorageType } from '@/lib/unifiedSubmissionStore';
import { createClickUpTask } from '@/lib/clickupClient';

// Force Node.js runtime (required for crypto and Google Auth)
export const runtime = 'nodejs';

// Resilient custom field ID constants with hard-coded fallbacks
const CLICKUP_CF_CTA_LABEL_ID =
  process.env.CLICKUP_CF_CTA_LABEL ?? '36f1fbf8-f073-4f59-b8eb-4c6437a9837d';
const CLICKUP_CF_SOURCE_PAGE_ID =
  process.env.CLICKUP_CF_SOURCE_PAGE ?? '78b29945-620e-4482-b0b8-968e5dab1177';
const CLICKUP_CF_UTM_SOURCE_ID =
  process.env.CLICKUP_CF_UTM_SOURCE ?? '398fcea4-120f-4fdb-8a80-4592039dd0eb';
const CLICKUP_CF_UTM_MEDIUM_ID =
  process.env.CLICKUP_CF_UTM_MEDIUM ?? '6904cc9c-248a-43d4-808e-673a18d983b6';
const CLICKUP_CF_UTM_CAMPAIGN_ID =
  process.env.CLICKUP_CF_UTM_CAMPAIGN ?? '679bdacd-8e4c-49c1-b86f-b271db411c18';

const CLICKUP_FIELD_FULL_NAME_ID =
  process.env.CLICKUP_FIELD_FULL_NAME ?? '0232fd57-5fd3-41b8-971d-b0029b5b4e36';
const CLICKUP_FIELD_EMAIL_ID =
  process.env.CLICKUP_FIELD_EMAIL ?? 'f713606f-9fa4-4365-98f2-7164be62b28e';
const CLICKUP_FIELD_COMPANY_ID =
  process.env.CLICKUP_FIELD_COMPANY ?? 'e3404ef6-a6d7-4cbc-8a4f-d8ade43d9ef0';
const CLICKUP_FIELD_ROLE_ID =
  process.env.CLICKUP_FIELD_ROLE ?? 'a926c39d-a9b7-4f2f-8e07-80e63404be95';
const CLICKUP_FIELD_PHONE_ID =
  process.env.CLICKUP_FIELD_PHONE ?? 'c27b9f74-0edc-4835-a806-ffacdad62b06';
const CLICKUP_FIELD_COUNTRY_ID =
  process.env.CLICKUP_FIELD_COUNTRY ?? 'beeceb60-b563-404f-81fd-261aeab7768b';
const CLICKUP_FIELD_POS_ID =
  process.env.CLICKUP_FIELD_POS ?? '3d0c2c5e-71ca-4ed1-85e2-c89049c8a4a9';
const CLICKUP_FIELD_LOCATIONS_ID =
  process.env.CLICKUP_FIELD_LOCATIONS ?? 'f261fec2-638b-49e8-bca6-c2a6c9beb0a1';
const CLICKUP_FIELD_MESSAGE_ID =
  process.env.CLICKUP_FIELD_MESSAGE ?? '20f58b0c-1c6c-4e3d-b989-5b93efb1ba53';

export async function POST(request: NextRequest) {
  // Generate unique request ID for tracking
  const requestId = randomUUID();
  const startTime = Date.now();

  console.log(`[${requestId}] ===== CTA SUBMISSION START =====`);

  try {
    // Parse request body
    const body = await request.json();
    const {
      name,
      email,
      company,
      role,
      country,
      phone,
      numberOfLocations,
      primaryPOS,
      message,
      ctaLabel,
      sourcePage,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Validate required fields
    const missingFields: string[] = [];
    if (!name?.trim()) missingFields.push('name');
    if (!email?.trim()) missingFields.push('email');
    if (!company?.trim()) missingFields.push('company');
    if (!role?.trim()) missingFields.push('role');
    if (!country?.trim()) missingFields.push('country');
    if (!phone?.trim()) missingFields.push('phone');
    if (!numberOfLocations?.trim()) missingFields.push('numberOfLocations');
    if (!primaryPOS?.trim()) missingFields.push('primaryPOS');
    if (!message?.trim()) missingFields.push('message');

    if (missingFields.length > 0) {
      console.error(`[${requestId}] Validation failed: missing fields`, missingFields);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing or invalid required fields',
          invalidFields: missingFields
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error(`[${requestId}] Validation failed: invalid email`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email address',
          invalidFields: ['email']
        },
        { status: 400 }
      );
    }

    // Validate phone number (must have at least 6 digits)
    const phoneDigits = phone.replace(/[\s\-\(\)]/g, '');
    if (!/\d{6,}/.test(phoneDigits)) {
      console.error(`[${requestId}] Validation failed: invalid phone`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid phone number',
          invalidFields: ['phone']
        },
        { status: 400 }
      );
    }

    console.log(`[${requestId}] Validation passed for ${email}`);

    // STEP 1: Save submission to fallback storage FIRST
    // This ensures we never lose leads, even if ClickUp fails
    const submissionData = {
      name,
      email,
      company,
      role,
      country,
      phone,
      numberOfLocations,
      primaryPOS,
      message,
      ctaLabel,
      sourcePage,
      utmSource,
      utmMedium,
      utmCampaign,
    };

    const submission = await saveSubmissionUnified(submissionData, 'pending');
    console.log(`[${requestId}] Submission saved (${submission.storageType}): ${submission.id}`);

    // STEP 2: Attempt to create ClickUp task
    // If this fails, user still gets success (we saved the submission)
    const apiToken = process.env.CLICKUP_API_TOKEN;
    const listId = process.env.CLICKUP_LIST_ID;

    if (!apiToken || !listId) {
      const missingVars = [];
      if (!apiToken) missingVars.push('CLICKUP_API_TOKEN');
      if (!listId) missingVars.push('CLICKUP_LIST_ID');
      
      console.error(`[${requestId}] Missing ClickUp configuration:`, missingVars);
      
      // Update submission status
      await updateSubmissionUnified(
        submission.id,
        'failed',
        undefined,
        `Missing config: ${missingVars.join(', ')}`
      );

      // Still return success to user - we saved the submission!
      console.log(`[${requestId}] Returning success despite ClickUp config missing`);
      return NextResponse.json({
        success: true,
        message: 'Your request has been received and will be processed shortly.',
        submissionId: submission.id,
      });
    }

    // Build task description
    const description = `
**Lead Information**
----------------
- **Name:** ${name}
- **Email:** ${email}
- **Company:** ${company}
- **Role:** ${role}
- **Country:** ${country}
- **Phone:** ${phone}
- **Number of Locations:** ${numberOfLocations}
- **Primary POS/System:** ${primaryPOS}

**Message:**
${message}

**Source Information**
----------------
- **CTA Label:** ${ctaLabel || 'Website Lead'}
- **Source Page:** ${sourcePage || 'Unknown'}
- **UTM Source:** ${utmSource || 'N/A'}
- **UTM Medium:** ${utmMedium || 'N/A'}
- **UTM Campaign:** ${utmCampaign || 'N/A'}

**Submitted:** ${new Date().toISOString()}
**Request ID:** ${requestId}
**Submission ID:** ${submission.id}
    `.trim();

    // Prepare ClickUp task payload
    // NOTE: Do not include 'status' - ClickUp will use list default
    // Status is only for internal tracking (UnifiedStore/Google Sheets)
    const taskPayload: any = {
      name: `${ctaLabel || 'Website Lead'} – ${name}`,
      description,
      priority: 3,
    };

    // Build custom fields array
    const customFields: { id: string; value: any }[] = [];
    
    if (CLICKUP_FIELD_FULL_NAME_ID && name) {
      customFields.push({ id: CLICKUP_FIELD_FULL_NAME_ID, value: name });
    }
    if (CLICKUP_FIELD_EMAIL_ID && email) {
      customFields.push({ id: CLICKUP_FIELD_EMAIL_ID, value: email });
    }
    if (CLICKUP_FIELD_COMPANY_ID && company) {
      customFields.push({ id: CLICKUP_FIELD_COMPANY_ID, value: company });
    }
    if (CLICKUP_FIELD_ROLE_ID && role) {
      customFields.push({ id: CLICKUP_FIELD_ROLE_ID, value: role });
    }
    if (CLICKUP_FIELD_PHONE_ID && phone) {
      customFields.push({ id: CLICKUP_FIELD_PHONE_ID, value: phone });
    }
    if (CLICKUP_FIELD_COUNTRY_ID && country) {
      customFields.push({ id: CLICKUP_FIELD_COUNTRY_ID, value: country });
    }
    if (CLICKUP_FIELD_POS_ID && primaryPOS) {
      customFields.push({ id: CLICKUP_FIELD_POS_ID, value: primaryPOS });
    }
    if (CLICKUP_FIELD_LOCATIONS_ID && numberOfLocations) {
      customFields.push({ id: CLICKUP_FIELD_LOCATIONS_ID, value: numberOfLocations });
    }
    if (CLICKUP_FIELD_MESSAGE_ID && message) {
      customFields.push({ id: CLICKUP_FIELD_MESSAGE_ID, value: message });
    }
    
    // Source tracking fields
    if (CLICKUP_CF_CTA_LABEL_ID && ctaLabel) {
      customFields.push({ id: CLICKUP_CF_CTA_LABEL_ID, value: ctaLabel });
    }
    if (CLICKUP_CF_SOURCE_PAGE_ID && sourcePage) {
      customFields.push({ id: CLICKUP_CF_SOURCE_PAGE_ID, value: sourcePage });
    }
    if (CLICKUP_CF_UTM_SOURCE_ID && utmSource) {
      customFields.push({ id: CLICKUP_CF_UTM_SOURCE_ID, value: utmSource });
    }
    if (CLICKUP_CF_UTM_MEDIUM_ID && utmMedium) {
      customFields.push({ id: CLICKUP_CF_UTM_MEDIUM_ID, value: utmMedium });
    }
    if (CLICKUP_CF_UTM_CAMPAIGN_ID && utmCampaign) {
      customFields.push({ id: CLICKUP_CF_UTM_CAMPAIGN_ID, value: utmCampaign });
    }

    if (customFields.length > 0) {
      taskPayload.custom_fields = customFields;
    }

    console.log(`[${requestId}] Attempting to create ClickUp task...`);

    // Call ClickUp API with automatic retries
    const result = await createClickUpTask(apiToken, listId, taskPayload, requestId);

    if (result.success) {
      // Success! Update submission status
      await updateSubmissionUnified(
        submission.id,
        'success',
        result.task.id,
        undefined
      );

      const duration = Date.now() - startTime;
      console.log(`[${requestId}] ===== SUCCESS (${duration}ms) =====`);
      console.log(`[${requestId}] ClickUp Task ID: ${result.task.id}`);
      console.log(`[${requestId}] ClickUp Task URL: ${result.task.url}`);

      return NextResponse.json({
        success: true,
        message: 'Thank you! We have received your request.',
        submissionId: submission.id,
        taskId: result.task.id,
        taskUrl: result.task.url,
      });
    } else {
      // ClickUp failed, but we already saved the submission
      const { error } = result;
      
      console.error(`[${requestId}] ClickUp sync failed:`, {
        type: error.type,
        message: error.message,
        retryable: error.retryable,
      });

      // Update submission with error details
      await updateSubmissionUnified(
        submission.id,
        'failed',
        undefined,
        `${error.type}: ${error.message}`
      );

      const duration = Date.now() - startTime;
      console.log(`[${requestId}] ===== PARTIAL SUCCESS (${duration}ms) =====`);
      console.log(`[${requestId}] Submission saved but ClickUp sync failed`);
      console.log(`[${requestId}] Error type: ${error.type}`);

      // IMPORTANT: Still return success to user!
      // We saved the submission, admin can manually create ClickUp task later
      return NextResponse.json({
        success: true,
        message: 'Your request has been received and will be processed shortly.',
        submissionId: submission.id,
      });
    }

  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`[${requestId}] ===== ERROR (${duration}ms) =====`);
    console.error(`[${requestId}] Error type:`, error.name);
    console.error(`[${requestId}] Error code:`, error.code);
    
    // Determine error type for safe logging
    let errorCode = 'INTERNAL_ERROR';
    if (error.message?.includes('not configured')) {
      errorCode = 'STORAGE_NOT_CONFIGURED';
    } else if (error.message?.includes('validation')) {
      errorCode = 'VALIDATION_ERROR';
    } else if (error.name === 'TypeError') {
      errorCode = 'TYPE_ERROR';
    }
    
    console.error(`[${requestId}] Error code:`, errorCode);

    return NextResponse.json(
      { 
        success: false, 
        error: 'We encountered an issue processing your request. Please try again or contact support.',
        requestId,
        code: errorCode,
      },
      { status: 500 }
    );
  }
}
