/**
 * Unified Submission Store
 * 
 * This module provides a unified interface for submission storage that automatically
 * chooses between Google Sheets (preferred) and file storage (fallback).
 */

import { 
  isGoogleSheetsEnabled, 
  appendSubmissionToSheet, 
  updateSubmissionInSheet 
} from './googleSheetsClient';
import { saveSubmission, updateSubmissionStatus } from './submissionStore';

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
  storageType: 'google-sheets' | 'file';
  rowNumber?: number; // For Google Sheets
}

/**
 * Save a submission to the configured storage backend
 * In production: REQUIRES Google Sheets (no file storage fallback)
 * In development: Falls back to file storage if Sheets unavailable
 */
export async function saveSubmissionUnified(
  data: SubmissionData,
  clickupSyncStatus: 'pending' | 'success' | 'failed' = 'pending',
  clickupTaskId?: string,
  clickupError?: string
): Promise<SavedSubmission> {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
  
  // Try Google Sheets first if enabled
  if (isGoogleSheetsEnabled()) {
    try {
      const result = await appendSubmissionToSheet(
        data,
        clickupSyncStatus,
        clickupTaskId,
        clickupError
      );

      console.log(`[UnifiedStore] Saved to Google Sheets: ${result.submissionId}`);
      
      return {
        id: result.submissionId,
        storageType: 'google-sheets',
        rowNumber: result.rowNumber,
      };
    } catch (error: any) {
      console.error(`[UnifiedStore] Google Sheets save failed:`, error.message);
      
      // In production, Google Sheets failure is fatal
      if (isProduction) {
        console.error(`[UnifiedStore] PRODUCTION: Cannot fall back to file storage`);
        throw new Error(`Google Sheets not configured or failed: ${error.message}`);
      }
      
      console.log(`[UnifiedStore] DEV: Falling back to file storage...`);
      // Fall through to file storage (dev only)
    }
  } else {
    // Google Sheets not enabled
    if (isProduction) {
      console.error(`[UnifiedStore] PRODUCTION: Google Sheets not configured`);
      throw new Error('Google Sheets storage is not configured. Please contact support.');
    }
    
    console.log(`[UnifiedStore] DEV: Google Sheets not enabled, using file storage`);
  }

  // Fallback to file storage (development only)
  const submission = await saveSubmission(data, clickupSyncStatus, clickupTaskId, clickupError);
  
  console.log(`[UnifiedStore] Saved to file storage: ${submission.id}`);
  
  return {
    id: submission.id,
    storageType: 'file',
  };
}

/**
 * Update a submission's ClickUp sync status
 * Automatically determines storage backend based on current configuration
 */
export async function updateSubmissionUnified(
  submissionId: string,
  clickupSyncStatus: 'pending' | 'success' | 'failed',
  clickupTaskId?: string,
  clickupError?: string
): Promise<void> {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
  
  // Try Google Sheets first if enabled
  if (isGoogleSheetsEnabled()) {
    try {
      await updateSubmissionInSheet(
        submissionId,
        clickupSyncStatus,
        clickupTaskId,
        clickupError
      );
      console.log(`[UnifiedStore] Updated in Google Sheets: ${submissionId}`);
      return;
    } catch (error: any) {
      console.error(`[UnifiedStore] Google Sheets update failed:`, error.message);
      
      if (isProduction) {
        console.error(`[UnifiedStore] PRODUCTION: Cannot fall back to file storage for update`);
        // Don't throw - update failure is not fatal
        return;
      }
      
      console.log(`[UnifiedStore] DEV: Trying file storage...`);
      // Fall through to file storage (dev only)
    }
  } else if (isProduction) {
    console.error(`[UnifiedStore] PRODUCTION: Google Sheets not configured for update`);
    return; // Don't throw - update failure is not fatal
  }

  // Fallback to file storage (development only)
  await updateSubmissionStatus(
    submissionId,
    clickupSyncStatus,
    clickupTaskId,
    clickupError
  );
  console.log(`[UnifiedStore] Updated in file storage: ${submissionId}`);
}

/**
 * Get storage type being used
 */
export function getStorageType(): 'google-sheets' | 'file' | 'none' {
  if (isGoogleSheetsEnabled()) {
    return 'google-sheets';
  }
  return 'file';
}
