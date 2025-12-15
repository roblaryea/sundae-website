/**
 * Submission Store - Fallback storage for form submissions
 * 
 * This module provides a simple file-based storage system for form submissions
 * to ensure no leads are lost even when ClickUp API fails.
 * 
 * In production, this should be replaced with a proper database.
 */

import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export interface Submission {
  id: string;
  timestamp: string;
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
  };
  clickupSyncStatus: 'pending' | 'success' | 'failed';
  clickupTaskId?: string;
  clickupError?: string;
  retryCount: number;
  lastRetryAt?: string;
}

// Storage directory (in dev, use .submissions; in prod, use proper DB)
const STORAGE_DIR = path.join(process.cwd(), '.submissions');

/**
 * Initialize storage directory
 */
function ensureStorageDir(): void {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

/**
 * Save a submission to local storage
 */
export async function saveSubmission(
  data: Submission['data'],
  clickupSyncStatus: Submission['clickupSyncStatus'] = 'pending',
  clickupTaskId?: string,
  clickupError?: string
): Promise<Submission> {
  ensureStorageDir();

  const submission: Submission = {
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    data,
    clickupSyncStatus,
    clickupTaskId,
    clickupError,
    retryCount: 0,
  };

  const filename = `${submission.id}.json`;
  const filepath = path.join(STORAGE_DIR, filename);

  fs.writeFileSync(filepath, JSON.stringify(submission, null, 2), 'utf-8');

  return submission;
}

/**
 * Update submission sync status
 */
export async function updateSubmissionStatus(
  id: string,
  status: Submission['clickupSyncStatus'],
  clickupTaskId?: string,
  clickupError?: string
): Promise<void> {
  ensureStorageDir();

  const filepath = path.join(STORAGE_DIR, `${id}.json`);
  
  if (!fs.existsSync(filepath)) {
    console.warn(`Submission ${id} not found in store`);
    return;
  }

  const submission: Submission = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  submission.clickupSyncStatus = status;
  submission.clickupTaskId = clickupTaskId;
  submission.clickupError = clickupError;
  submission.retryCount = (submission.retryCount || 0) + 1;
  submission.lastRetryAt = new Date().toISOString();

  fs.writeFileSync(filepath, JSON.stringify(submission, null, 2), 'utf-8');
}

/**
 * Get all submissions with failed ClickUp sync
 */
export async function getFailedSubmissions(): Promise<Submission[]> {
  ensureStorageDir();

  const files = fs.readdirSync(STORAGE_DIR).filter(f => f.endsWith('.json'));
  const submissions: Submission[] = [];

  for (const file of files) {
    const filepath = path.join(STORAGE_DIR, file);
    const submission: Submission = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    
    if (submission.clickupSyncStatus === 'failed' || submission.clickupSyncStatus === 'pending') {
      submissions.push(submission);
    }
  }

  return submissions;
}

/**
 * Get submission by ID
 */
export async function getSubmission(id: string): Promise<Submission | null> {
  ensureStorageDir();

  const filepath = path.join(STORAGE_DIR, `${id}.json`);
  
  if (!fs.existsSync(filepath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

/**
 * List all submissions (admin/debug only)
 */
export async function listAllSubmissions(limit: number = 50): Promise<Submission[]> {
  ensureStorageDir();

  const files = fs.readdirSync(STORAGE_DIR)
    .filter(f => f.endsWith('.json'))
    .sort()
    .reverse()
    .slice(0, limit);

  const submissions: Submission[] = [];

  for (const file of files) {
    const filepath = path.join(STORAGE_DIR, file);
    try {
      const submission: Submission = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
      submissions.push(submission);
    } catch (err) {
      console.error(`Failed to parse submission ${file}:`, err);
    }
  }

  return submissions;
}
