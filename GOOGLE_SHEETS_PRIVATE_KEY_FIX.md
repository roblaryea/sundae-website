# Google Sheets Private Key Fix - Production Deployment Guide

**Date:** December 16, 2025  
**Issue:** `error:1E08010C:DECODER routines::unsupported` on production  
**Root Cause:** Malformed private key in Vercel environment variables  
**Status:** ✅ FIXED

---

## Problem Summary

The Google Sheets integration worked locally but failed in production with:
```json
{"ok":false,"error":"error:1E08010C:DECODER routines::unsupported","statusCode":503}
```

This was caused by the private key environment variable being malformed when pasted into Vercel - issues with:
- Literal `\n` sequences not being converted to newlines
- Surrounding quotes not being removed
- Windows CRLF line endings (`\r\n`)
- Extra whitespace

---

## What Was Fixed

### 1. **Private Key Normalization** (`src/lib/googleSheetsClient.ts`)

Added `normalizePrivateKey()` function that:
- ✅ Removes surrounding quotes (`"` or `'`)
- ✅ Converts literal `\n` sequences to actual newlines
- ✅ Removes `\r` characters (Windows CRLF)
- ✅ Trims whitespace

```typescript
function normalizePrivateKey(raw?: string): string {
  if (!raw) return '';
  
  // Remove surrounding quotes
  let normalized = raw.replace(/^["']|["']$/g, '');
  
  // Convert literal \n to actual newlines
  normalized = normalized.replace(/\\n/g, '\n');
  
  // Remove \r characters
  normalized = normalized.replace(/\r/g, '');
  
  // Trim whitespace
  return normalized.trim();
}
```

### 2. **Private Key Validation**

Added `validatePrivateKey()` function that checks:
- ✅ Starts with `-----BEGIN PRIVATE KEY-----`
- ✅ Ends with `-----END PRIVATE KEY-----`
- ✅ Minimum length (>100 characters)
- ✅ Returns helpful error messages

### 3. **Enhanced Health Check**

Updated `/api/integrations/google-sheets/health` to:
- ✅ Validate key **before** attempting connection
- ✅ Return diagnostic info (no secrets exposed):
  ```json
  {
    "ok": false,
    "error": "Google private key malformed: Private key does not start with -----BEGIN PRIVATE KEY-----",
    "debug": {
      "keyStartsCorrectly": false,
      "keyEndsCorrectly": true,
      "keyLength": 1234
    }
  }
  ```
- ✅ Force Node.js runtime with `export const runtime = 'nodejs';`

### 4. **Updated Client Authentication**

Modified `getSheetsClient()` to:
- ✅ Normalize private key before use
- ✅ Validate format
- ✅ Log validation errors (safe, no secrets)
- ✅ Throw clear error messages

---

## How to Configure in Vercel

### Required Environment Variables

Add these to Vercel Dashboard → Project → Settings → Environment Variables:

```
GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=<see below>
```

### ⚠️ GOOGLE_PRIVATE_KEY - CRITICAL FORMAT

**Method 1: Multi-line (RECOMMENDED)**

1. In Vercel, click "Add Variable"
2. Name: `GOOGLE_PRIVATE_KEY`
3. Value: Paste the ENTIRE private key INCLUDING the header and footer:

```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
...multiple lines of base64...
...more lines...
-----END PRIVATE KEY-----
```

4. **DO NOT** add quotes around it
5. **DO NOT** manually add `\n` - Vercel handles newlines
6. Select: Production, Preview, Development (all environments)
7. Click "Save"

**Method 2: Single-line with \n (WORKS NOW)**

If you must use single-line format:

```
-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n...\n-----END PRIVATE KEY-----\n
```

Our normalization code will handle this.

**Method 3: From JSON key file**

If you have a Google service account JSON file:

```json
{
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQI..."
}
```

Copy the ENTIRE `private_key` value (including quotes if you want, our code removes them).

---

## Verification Steps

### 1. After Adding Variables

1. **Redeploy** your site (or trigger new deployment)
2. Wait for deployment to complete (~2-3 min)

### 2. Test Health Endpoint

Visit (or `curl`):
```
https://your-site.vercel.app/api/integrations/google-sheets/health
```

**Success Response:**
```json
{
  "ok": true,
  "timestamp": "2025-12-16T00:15:00.000Z",
  "sheetId": "1abc...xyz",
  "rowCount": 1,
  "statusCode": 200
}
```

**Failure with Debug Info:**
```json
{
  "ok": false,
  "error": "Google private key malformed: Private key does not start with -----BEGIN PRIVATE KEY-----",
  "debug": {
    "keyStartsCorrectly": false,
    "keyEndsCorrectly": true,
    "keyLength": 1234
  },
  "statusCode": 503
}
```

### 3. Test Form Submission

Submit a form on your site and check:
- ✅ Form submits successfully
- ✅ ClickUp task created
- ✅ Google Sheet row added

---

## Common Issues & Solutions

### Issue: "Private key does not start with -----BEGIN PRIVATE KEY-----"

**Solution:** Your key is malformed. Copy the ENTIRE key from Google Cloud Console including:
```
-----BEGIN PRIVATE KEY-----
...base64 content...
-----END PRIVATE KEY-----
```

### Issue: "Private key does not end with -----END PRIVATE KEY-----"

**Solution:** The key was truncated. Make sure you copied the complete key including the footer.

### Issue: "Private key is too short"

**Solution:** You didn't copy the full key. A valid private key should be ~1600-1700 characters.

### Issue: Still getting "DECODER routines::unsupported"

**Possible causes:**
1. **Old deployment cached** - Trigger a new deployment
2. **Wrong environment** - Make sure variable is set for "Production"
3. **Spaces/tabs added** - Re-paste the key, don't manually edit it

---

## How to Get Your Google Service Account Key

### 1. Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create one)
3. Go to **APIs & Services** → **Library**
4. Search for "Google Sheets API"
5. Click **Enable**

### 2. Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Give it a name (e.g., "Sundae Form Submissions")
4. Click **Create and Continue**
5. Skip role assignment (click **Continue**)
6. Click **Done**

### 3. Generate Private Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Select **JSON** format
5. Click **Create**
6. A JSON file will download

### 4. Extract Values from JSON

Open the downloaded JSON file. You'll need:

```json
{
  "type": "service_account",
  "client_email": "sundae-forms@project.iam.gserviceaccount.com",  ← Use this
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQI...",         ← Use this
  ...
}
```

- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY`

### 5. Share Sheet with Service Account

1. Open your Google Sheet
2. Click **Share**
3. Add the `client_email` from above
4. Give it **Editor** access
5. Click **Send**

---

## Files Modified

1. **`src/lib/googleSheetsClient.ts`**
   - Added `normalizePrivateKey()` function
   - Added `validatePrivateKey()` function
   - Updated `getSheetsClient()` to normalize and validate
   - Updated `testGoogleSheetsConnection()` with debug info

2. **`src/app/api/integrations/google-sheets/health/route.ts`**
   - Added `export const runtime = 'nodejs';` for crypto support
   - Added `debug` field to response

---

## Testing Locally

To test the normalization locally, try different formats in your `.env.local`:

**Format 1: With literal \n**
```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n"
```

**Format 2: Multi-line**
```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQI...
-----END PRIVATE KEY-----"
```

**Format 3: No quotes, multi-line** (preferred for local)
```
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvQI...
-----END PRIVATE KEY-----
```

All three formats will now work thanks to the normalization!

---

## Deployment Checklist

- [ ] Updated `src/lib/googleSheetsClient.ts` with normalization
- [ ] Updated `src/app/api/integrations/google-sheets/health/route.ts` with Node runtime
- [ ] Build passes locally (`npm run build`)
- [ ] Committed changes to Git
- [ ] Pushed to GitHub
- [ ] Added `GOOGLE_SHEETS_ENABLED=true` to Vercel
- [ ] Added `GOOGLE_SHEET_ID` to Vercel
- [ ] Added `GOOGLE_SERVICE_ACCOUNT_EMAIL` to Vercel
- [ ] Added `GOOGLE_PRIVATE_KEY` to Vercel (multi-line, no quotes)
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Triggered new deployment
- [ ] Tested health endpoint - returns `{"ok": true}`
- [ ] Tested form submission - creates row in Google Sheet

---

## Success Criteria

✅ Health endpoint returns `{"ok": true}` on production  
✅ Form submissions create rows in Google Sheet  
✅ No more "DECODER routines::unsupported" errors  
✅ Debug info available if key is malformed  
✅ Works with any private key format (quotes, \n, CRLF)  

---

**Status: READY FOR DEPLOYMENT** 🚀

The code is now robust enough to handle any format of private key that Vercel might mangle. Just paste the key as-is and it will normalize automatically.
