# Google Sheets Integration Setup Guide

## Overview

This guide will help you set up Google Sheets as the fallback storage for form submissions, replacing the file-based system.

---

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Create Project"** or select existing project
3. Name it: `Sundae Submissions` (or similar)
4. Click **"Create"**

---

## Step 2: Enable Google Sheets API

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Sheets API"**
3. Click on it and click **"Enable"**

---

## Step 3: Create Service Account

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"Service Account"**
3. Fill in details:
   - **Service account name:** `sundae-submissions`
   - **Service account ID:** (auto-generated)
   - **Description:** `Service account for form submission tracking`
4. Click **"Create and Continue"**
5. **Grant this service account access:** Select role **"Editor"** (or just "Viewer" if you only need read access)
6. Click **"Continue"** → **"Done"**

---

## Step 4: Create Service Account Key

1. Click on the service account you just created
2. Go to **"Keys"** tab
3. Click **"Add Key"** → **"Create new key"**
4. Select **"JSON"** format
5. Click **"Create"**
6. A JSON file will download automatically - **SAVE THIS FILE SECURELY**

The JSON file looks like:
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "sundae-submissions@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

---

## Step 5: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Click **"Blank"** to create a new spreadsheet
3. Name it: `Sundae Lead Submissions`
4. Add column headers in **Row 1** (exactly as shown):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q | R |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| submission_id | timestamp | name | email | company | role | country | phone | num_locations | primary_pos | message | cta_label | source_page | utm_source | utm_medium | utm_campaign | clickup_sync_status | clickup_task_id | clickup_error | created_at |

5. **Copy the Sheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit`
   - Sheet ID is: `1A2B3C4D5E6F7G8H9I0J`

---

## Step 6: Share Sheet with Service Account

1. In your Google Sheet, click **"Share"** button (top right)
2. Paste the **service account email** from the JSON file
   - Format: `sundae-submissions@your-project.iam.gserviceaccount.com`
3. Give it **"Editor"** access
4. Uncheck **"Notify people"**
5. Click **"Share"**

---

## Step 7: Add Environment Variables

Open your `.env.local` file and add these new variables:

```bash
# Google Sheets Configuration (for fallback storage)
GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEET_ID=1A2B3C4D5E6F7G8H9I0J
GOOGLE_SERVICE_ACCOUNT_EMAIL=sundae-submissions@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"

# Alternative: Path to JSON key file (if not using individual env vars)
# GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
```

### Important Notes:

1. **GOOGLE_PRIVATE_KEY** must include the `\n` characters (newlines). Copy directly from the JSON file.
2. **Wrap in double quotes** to preserve the newlines
3. **Never commit** this file to git (already in .gitignore)

---

## Step 8: Install Google Sheets Package

Run this command in your project:

```bash
npm install googleapis
```

---

## Step 9: Test the Connection

After implementing the code changes (see next section), test with:

```bash
# Start your dev server
npm run dev

# In another terminal, test the health endpoint
curl http://localhost:3000/api/integrations/google-sheets/health
```

Expected response:
```json
{
  "ok": true,
  "timestamp": "2025-12-15T...",
  "sheetId": "1A2B3C4D5E6F7G8H9I0J",
  "rowCount": 1
}
```

---

## Troubleshooting

### Error: "The caller does not have permission"

**Solution:** Make sure you shared the Google Sheet with the service account email.

### Error: "Invalid credentials"

**Solution:** Double-check the `GOOGLE_PRIVATE_KEY` format - it must include `\n` characters.

### Error: "Sheet not found"

**Solution:** Verify the `GOOGLE_SHEET_ID` is correct (from the URL).

### Error: "Cannot find module 'googleapis'"

**Solution:** Run `npm install googleapis`

---

## Security Best Practices

1. ✅ **Never commit** the JSON key file to git
2. ✅ **Never commit** `.env.local` to git
3. ✅ Use separate service accounts for dev/staging/production
4. ✅ Limit service account permissions (Editor role only for the sheet)
5. ✅ Rotate service account keys periodically (every 90 days)
6. ✅ Use Google Cloud Secret Manager in production (optional)

---

## Production Deployment (Vercel)

1. Go to your Vercel project settings
2. Navigate to **"Environment Variables"**
3. Add all the Google Sheets variables:
   - `GOOGLE_SHEETS_ENABLED=true`
   - `GOOGLE_SHEET_ID=...`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL=...`
   - `GOOGLE_PRIVATE_KEY=...`
4. Deploy!

---

## What's Next?

After completing this setup:
1. ✅ Google Sheet is ready
2. ✅ Service account has access
3. ✅ Environment variables configured
4. ⏭️ Implement the code changes (see code files)
5. ⏭️ Test locally
6. ⏭️ Deploy to production

---

## Support

If you run into issues:
1. Check the [Google Sheets API documentation](https://developers.google.com/sheets/api)
2. Verify service account permissions
3. Check server logs for detailed error messages
