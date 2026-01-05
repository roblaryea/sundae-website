/**
 * Unified Submission Store
 * 
 * This module provides a unified interface for submission storage that automatically
 * chooses between Google Sheets (preferred) and file storage (fallback).
 * 
 * IMPORTANT: Storage is BEST-EFFORT and should never block ClickUp submission.
 * If storage fails, we log warnings but don't throw errors in production.
 */

import { 
  isGoogleSheetsEnabled, 
  appendSubmissionToSheet, 
  updateSubmissionInSheet 
} from './googleSheetsClient';
import { saveSubmission, updateSubmissionStatus } from './submissionStore';
import { randomUUID } from 'crypto';

export interface SubmissionData {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  phone: string;
  numberOfLocations: string;
  primaryPOS: string;
  message: string;
  ctaLabel?: string;
  sourcePage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface SavedSubmission {
  id: string;
  storageType: 'google-sheets' | 'file' | 'none';
  rowNumber?: number; // For Google Sheets
  storageError?: string; // Error message if storage failed
}

/**
 * Get missing Google Sheets env vars for logging
 * NEVER log actual secret values
 */
export function getMissingGoogleSheetsConfig(): string[] {
  const missing: string[] = [];
  if (process.env.GOOGLE_SHEETS_ENABLED !== 'true') missing.push('GOOGLE_SHEETS_ENABLED');
  if (!process.env.GOOGLE_SHEET_ID) missing.push('GOOGLE_SHEET_ID');
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) missing.push('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  if (!process.env.GOOGLE_PRIVATE_KEY && !process.env.GOOGLE_PRIVATE_KEY_B64) {
    missing.push('GOOGLE_PRIVATE_KEY or GOOGLE_PRIVATE_KEY_B64');
  }
  return missing;
}

/**
 * Save a submission to the configured storage backend (BEST-EFFORT)
 * 
 * This function will NEVER throw in production. If storage fails, it returns
 * a mock submission ID and logs the error. The primary goal is to not block
 * ClickUp submission.
 */
export async function saveSubmissionUnified(
  data: SubmissionData,
  clickupSyncStatus: 'pending' | 'success' | 'failed' = 'pending',
  clickupTaskId?: string,
  clickupError?: string,
  requestId?: string
): Promise<SavedSubmission> {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
  const logPrefix = requestId ? `[${requestId}]` : '[UnifiedStore]';
  
  // Try Google Sheets first if enabled
  if (isGoogleSheetsEnabled()) {
    try {
      const result = await appendSubmissionToSheet(
        data,
        clickupSyncStatus,
        clickupTaskId,
        clickupError
      );

      console.log(`${logPrefix} Saved to Google Sheets: ${result.submissionId}`);
      
      return {
        id: result.submissionId,
        storageType: 'google-sheets',
        rowNumber: result.rowNumber,
      };
    } catch (error: any) {
      console.error(`${logPrefix} [STORAGE_WARNING] Google Sheets save failed:`, {
        error: error.message,
        missingConfig: getMissingGoogleSheetsConfig(),
      });
      
      // In production, DON'T throw - return a mock ID and continue
      if (isProduction) {
        const mockId = `nostorage-${randomUUID()}`;
        console.warn(`${logPrefix} [STORAGE_DEGRADED] Continuing without storage. Mock ID: ${mockId}`);
        return {
          id: mockId,
          storageType: 'none',
          storageError: `Google Sheets failed: ${error.message}`,
        };
      }
      
      console.log(`${logPrefix} DEV: Falling back to file storage...`);
      // Fall through to file storage (dev only)
    }
  } else {
    // Google Sheets not enabled
    const missingVars = getMissingGoogleSheetsConfig();
    
    if (isProduction) {
      console.warn(`${logPrefix} [STORAGE_WARNING] Google Sheets not configured in production:`, {
        missingEnvVars: missingVars,
      });
      
      // DON'T throw - return a mock ID and continue
      const mockId = `nostorage-${randomUUID()}`;
      console.warn(`${logPrefix} [STORAGE_DEGRADED] Continuing without storage. Mock ID: ${mockId}`);
      return {
        id: mockId,
        storageType: 'none',
        storageError: `Google Sheets not configured. Missing: ${missingVars.join(', ')}`,
      };
    }
    
    console.log(`${logPrefix} DEV: Google Sheets not enabled, using file storage`);
  }

  // Fallback to file storage (development only)
  try {
    const submission = await saveSubmission(data, clickupSyncStatus, clickupTaskId, clickupError);
    
    console.log(`${logPrefix} Saved to file storage: ${submission.id}`);
    
    return {
      id: submission.id,
      storageType: 'file',
    };
  } catch (error: any) {
    console.error(`${logPrefix} [STORAGE_WARNING] File storage also failed:`, error.message);
    
    // Even in dev, don't fail completely - return mock ID
    const mockId = `nostorage-${randomUUID()}`;
    return {
      id: mockId,
      storageType: 'none',
      storageError: `All storage backends failed: ${error.message}`,
    };
  }
}

/**
 * Update a submission's ClickUp sync status (BEST-EFFORT)
 * This never throws - failures are logged but don't block the response.
 */
export async function updateSubmissionUnified(
  submissionId: string,
  clickupSyncStatus: 'pending' | 'success' | 'failed',
  clickupTaskId?: string,
  clickupError?: string,
  requestId?: string
): Promise<void> {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
  const logPrefix = requestId ? `[${requestId}]` : '[UnifiedStore]';
  
  // Skip update for mock submissions (no storage backend)
  if (submissionId.startsWith('nostorage-')) {
    console.log(`${logPrefix} Skipping update for no-storage submission: ${submissionId}`);
    return;
  }
  
  // Try Google Sheets first if enabled
  if (isGoogleSheetsEnabled()) {
    try {
      await updateSubmissionInSheet(
        submissionId,
        clickupSyncStatus,
        clickupTaskId,
        clickupError
      );
      console.log(`${logPrefix} Updated in Google Sheets: ${submissionId}`);
      return;
    } catch (error: any) {
      console.error(`${logPrefix} [STORAGE_WARNING] Google Sheets update failed:`, error.message);
      
      if (isProduction) {
        // Don't throw - update failure is not fatal
        return;
      }
      
      console.log(`${logPrefix} DEV: Trying file storage...`);
      // Fall through to file storage (dev only)
    }
  } else if (isProduction) {
    console.warn(`${logPrefix} [STORAGE_WARNING] Google Sheets not configured for update`);
    return; // Don't throw - update failure is not fatal
  }

  // Fallback to file storage (development only)
  try {
    await updateSubmissionStatus(
      submissionId,
      clickupSyncStatus,
      clickupTaskId,
      clickupError
    );
    console.log(`${logPrefix} Updated in file storage: ${submissionId}`);
  } catch (error: any) {
    console.error(`${logPrefix} [STORAGE_WARNING] File storage update failed:`, error.message);
    // Don't throw - update failure is not fatal
  }
}

/**
 * Get storage type being used
 */
export function getStorageType(): 'google-sheets' | 'file' | 'none' {
  if (isGoogleSheetsEnabled()) {
    return 'google-sheets';
  }
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
  return isProduction ? 'none' : 'file';
}

/**
 * Check storage health and configuration
 * Returns detailed info about storage status without revealing secrets
 */
export function checkStorageHealth(): {
  configured: boolean;
  type: 'google-sheets' | 'file' | 'none';
  missingEnvVars: string[];
  warnings: string[];
} {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
  const missingVars = getMissingGoogleSheetsConfig();
  const warnings: string[] = [];
  
  if (isGoogleSheetsEnabled()) {
    return {
      configured: true,
      type: 'google-sheets',
      missingEnvVars: [],
      warnings,
    };
  }
  
  if (isProduction) {
    warnings.push('Google Sheets not configured - submissions will still reach ClickUp but won\'t be stored');
    warnings.push(`Missing env vars: ${missingVars.join(', ')}`);
    return {
      configured: false,
      type: 'none',
      missingEnvVars: missingVars,
      warnings,
    };
  }
  
  // Development - file storage available
  return {
    configured: true,
    type: 'file',
    missingEnvVars: missingVars,
    warnings: ['Using file storage (dev only)'],
  };
}
