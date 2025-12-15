# Google Sheets Integration - Quick Start Guide

## ✅ What's Already Done

All code is already implemented! You just need to configure Google Sheets.

### Files Created:
- ✅ `src/lib/googleSheetsClient.ts` - Google Sheets API client
- ✅ `src/lib/unifiedSubmissionStore.ts` - Unified storage wrapper
- ✅ `src/app/api/integrations/google-sheets/health/route.ts` - Health check
- ✅ `src/app/api/cta/submit/route.ts` - Updated to use unified storage
- ✅ `GOOGLE_SHEETS_SETUP.md` - Detailed setup instructions

### Package Installed:
- ✅ `googleapis` package added to package.json

---

## 🚀 How to Enable Google Sheets (3 Steps)

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new blank spreadsheet
3. Name it: **"Sundae Lead Submissions"**
4. Add these headers in Row 1 (columns A-T):

```
submission_id | timestamp | name | email | company | role | country | phone | num_locations | primary_pos | message | cta_label | source_page | utm_source | utm_medium | utm_campaign | clickup_sync_status | clickup_task_id | clickup_error | created_at
```

5. **Copy the Sheet ID** from the URL:
   - Example URL: `https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit`
   - Sheet ID: `1A2B3C4D5E6F7G8H9I0J`

---

### Step 2: Create Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable **Google Sheets API**:
   - Go to "APIs & Services" → "Library"
   - Search "Google Sheets API" → Enable

4. Create Service Account:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name: `sundae-submissions`
   - Grant role: **Editor**
   - Create JSON key → Download the file

5. **Share your Google Sheet** with the service account email:
   - In your sheet, click "Share"
   - Paste the service account email (from JSON file)
   - Give it "Editor" access
   - Uncheck "Notify people"

---

### Step 3: Add Environment Variables

Open `.env.local` and add these variables:

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEET_ID=YOUR_SHEET_ID_HERE
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\n-----END PRIVATE KEY-----\n"
```

**Important:** 
- Copy the private key exactly from the JSON file (including `\n` characters)
- Wrap it in double quotes
- Never commit `.env.local` to git

---

## ✅ That's It!

The system will **automatically** use Google Sheets when configured.

### How It Works:

```
User submits form
     ↓
1. Try Google Sheets first (if GOOGLE_SHEETS_ENABLED=true)
2. If Google Sheets fails → fallback to file storage (.submissions/)
3. Try to create ClickUp task
4. Update Google Sheet/file with ClickUp sync status
5. User always sees success (zero lost leads!)
```

---

## 🧪 Test It

```bash
# Start dev server
npm run dev

# Test Google Sheets health check
curl http://localhost:3000/api/integrations/google-sheets/health

# Should return:
# {
#   "ok": true,
#   "sheetId": "1A2B3C4D5E6F7G8H9I0J",
#   "rowCount": 1
# }

# Test ClickUp health check
curl http://localhost:3000/api/integrations/clickup/health

# Submit a test form at /demo or /contact
```

---

## 📊 View Your Submissions

Just open your Google Sheet! You'll see:
- All form submissions
- Real-time ClickUp sync status
- Error messages if ClickUp fails
- Complete audit trail

**Column Q** shows sync status:
- `pending` = Waiting to sync
- `success` = ClickUp task created ✅
- `failed` = ClickUp failed (lead still saved) ⚠️

---

## 🔄 Without Google Sheets

If you don't configure Google Sheets:
- System automatically uses file storage (`.submissions/` directory)
- Everything still works the same
- No leads are lost

---

## 🎯 Production Deployment (Vercel)

1. Go to Vercel project settings
2. Add environment variables:
   - `GOOGLE_SHEETS_ENABLED=true`
   - `GOOGLE_SHEET_ID=...`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL=...`
   - `GOOGLE_PRIVATE_KEY=...` (paste the whole key including newlines)
3. Deploy!

---

## 🆘 Troubleshooting

### "The caller does not have permission"
→ Share the Google Sheet with the service account email

### "Invalid credentials"  
→ Check `GOOGLE_PRIVATE_KEY` includes `\n` characters

### "Sheet not found"
→ Verify `GOOGLE_SHEET_ID` is correct

### Health check returns `ok: false`
→ Check service account has access to the sheet

---

## 📚 Full Documentation

See `GOOGLE_SHEETS_SETUP.md` for detailed instructions and troubleshooting.

---

**Ready to go! 🚀**
