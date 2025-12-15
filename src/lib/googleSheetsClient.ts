/**
 * Google Sheets Client for Submission Storage
 * 
 * This module provides integration with Google Sheets as a fallback storage
 * system for form submissions. It's more reliable and accessible than file storage.
 */

import { google } from 'googleapis';
import { randomUUID } from 'crypto';

export interface SheetSubmission {
  submission_id: string;
  timestamp: string;
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  phone: string;
  num_locations: string;
  primary_pos: string;
  message: string;
  cta_label: string;
  source_page: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  clickup_sync_status: 'pending' | 'success' | 'failed';
  clickup_task_id: string;
  clickup_error: string;
  created_at: string;
}

/**
 * Check if Google Sheets is configured
 */
export function isGoogleSheetsEnabled(): boolean {
  return (
    process.env.GOOGLE_SHEETS_ENABLED === 'true' &&
    !!process.env.GOOGLE_SHEET_ID &&
    !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    !!process.env.GOOGLE_PRIVATE_KEY
  );
}

/**
 * Get authenticated Google Sheets client
 */
async function getSheetsClient() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
  } catch (error: any) {
    console.error('[GoogleSheets] Failed to initialize client:', error.message);
    throw error;
  }
}

/**
 * Append a new submission row to Google Sheets
 */
export async function appendSubmissionToSheet(
  data: {
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
  },
  clickupSyncStatus: 'pending' | 'success' | 'failed' = 'pending',
  clickupTaskId?: string,
  clickupError?: string
): Promise<{ submissionId: string; rowNumber: number }> {
  if (!isGoogleSheetsEnabled()) {
    throw new Error('Google Sheets is not configured');
  }

  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const submissionId = randomUUID();
  const now = new Date().toISOString();

  // Prepare row data matching the header columns
  const row = [
    submissionId,                          // A: submission_id
    now,                                   // B: timestamp
    data.name,                             // C: name
    data.email,                            // D: email
    data.company,                          // E: company
    data.role,                             // F: role
    data.country,                          // G: country
    data.phone,                            // H: phone
    data.numberOfLocations,                // I: num_locations
    data.primaryPOS,                       // J: primary_pos
    data.message,                          // K: message
    data.ctaLabel || '',                   // L: cta_label
    data.sourcePage || '',                 // M: source_page
    data.utmSource || '',                  // N: utm_source
    data.utmMedium || '',                  // O: utm_medium
    data.utmCampaign || '',                // P: utm_campaign
    clickupSyncStatus,                     // Q: clickup_sync_status
    clickupTaskId || '',                   // R: clickup_task_id
    clickupError || '',                    // S: clickup_error
    now,                                   // T: created_at
  ];

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:T', // Adjust if your sheet has a different name
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });

    // Extract row number from the response
    const updatedRange = response.data.updates?.updatedRange || '';
    const rowNumber = parseInt(updatedRange.match(/\d+$/)?.[0] || '0');

    console.log(`[GoogleSheets] Submission saved: ${submissionId} at row ${rowNumber}`);

    return { submissionId, rowNumber };
  } catch (error: any) {
    console.error('[GoogleSheets] Failed to append row:', error.message);
    throw error;
  }
}

/**
 * Update an existing submission's ClickUp sync status
 */
export async function updateSubmissionInSheet(
  submissionId: string,
  clickupSyncStatus: 'pending' | 'success' | 'failed',
  clickupTaskId?: string,
  clickupError?: string
): Promise<void> {
  if (!isGoogleSheetsEnabled()) {
    throw new Error('Google Sheets is not configured');
  }

  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  try {
    // First, find the row with this submission_id (column A)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:A', // Get all submission IDs
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex((row) => row[0] === submissionId);

    if (rowIndex === -1) {
      console.warn(`[GoogleSheets] Submission ${submissionId} not found`);
      return;
    }

    const rowNumber = rowIndex + 1; // +1 because sheets are 1-indexed

    // Update columns Q (clickup_sync_status), R (clickup_task_id), S (clickup_error)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Sheet1!Q${rowNumber}:S${rowNumber}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[clickupSyncStatus, clickupTaskId || '', clickupError || '']],
      },
    });

    console.log(`[GoogleSheets] Updated submission ${submissionId} at row ${rowNumber}`);
  } catch (error: any) {
    console.error('[GoogleSheets] Failed to update row:', error.message);
    throw error;
  }
}

/**
 * Get all failed submissions from Google Sheets
 */
export async function getFailedSubmissionsFromSheet(): Promise<SheetSubmission[]> {
  if (!isGoogleSheetsEnabled()) {
    throw new Error('Google Sheets is not configured');
  }

  const sheets = await getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A2:T', // Skip header row
    });

    const rows = response.data.values || [];
    const failedSubmissions: SheetSubmission[] = [];

    for (const row of rows as any[]) {
      const clickupSyncStatus = row[16]; // Column Q
      if (clickupSyncStatus === 'failed' || clickupSyncStatus === 'pending') {
        failedSubmissions.push({
          submission_id: row[0] || '',
          timestamp: row[1] || '',
          name: row[2] || '',
          email: row[3] || '',
          company: row[4] || '',
          role: row[5] || '',
          country: row[6] || '',
          phone: row[7] || '',
          num_locations: row[8] || '',
          primary_pos: row[9] || '',
          message: row[10] || '',
          cta_label: row[11] || '',
          source_page: row[12] || '',
          utm_source: row[13] || '',
          utm_medium: row[14] || '',
          utm_campaign: row[15] || '',
          clickup_sync_status: (row[16] as any) || 'pending',
          clickup_task_id: row[17] || '',
          clickup_error: row[18] || '',
          created_at: row[19] || '',
        });
      }
    }

    return failedSubmissions;
  } catch (error: any) {
    console.error('[GoogleSheets] Failed to get failed submissions:', error.message);
    throw error;
  }
}

/**
 * Test Google Sheets connection (for health check)
 */
export async function testGoogleSheetsConnection(): Promise<{
  ok: boolean;
  sheetId?: string;
  rowCount?: number;
  error?: string;
}> {
  if (!isGoogleSheetsEnabled()) {
    return {
      ok: false,
      error: 'Google Sheets not configured',
    };
  }

  try {
    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

    // Try to read the first row (headers)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:T1',
    });

    const rowCount = response.data.values?.length || 0;

    return {
      ok: true,
      sheetId: spreadsheetId,
      rowCount,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error.message || 'Connection failed',
    };
  }
}
