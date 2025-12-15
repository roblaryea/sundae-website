# Google Sheets Environment Variables - Missing Configuration Fix

**Issue:** `{"ok":false,"error":"Google Sheets not configured"}`  
**Cause:** `.env.local` is missing Google Sheets environment variables  
**Status:** ⚠️ NEEDS CONFIGURATION

---

## Exact Problem

Your `.env.local` currently has:
✅ Google Analytics config  
✅ ClickUp config (working great!)  
❌ **Google Sheets config (MISSING)**

That's why you're getting: `"Google Sheets not configured"`

---

## Quick Fix - Add These 4 Variables

Add these lines to the **bottom** of your `.env.local` file:

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEET_ID=YOUR_SHEET_ID_HERE
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

---

## Step-by-Step Setup

### Step 1: Create Google Sheet (5 minutes)

1. **Go to:** https://sheets.google.com/
2. **Click:** "+ Blank" to create new sheet
3. **Name it:** "Sundae Lead Submissions"
4. **Add headers in Row 1** (copy this exactly):

```
submission_id	timestamp	name	email	company	role	country	phone	num_locations	primary_pos	message	cta_label	source_page	utm_source	utm_medium	utm_campaign	clickup_sync_status	clickup_task_id	clickup_error	created_at
```

**Or type these column headers (A through T):**
- A: submission_id
- B: timestamp
- C: name
- D: email
- E: company
- F: role
- G: country
- H: phone
- I: num_locations
- J: primary_pos
- K: message
- L: cta_label
- M: source_page
- N: utm_source
- O: utm_medium
- P: utm_campaign
- Q: clickup_sync_status
- R: clickup_task_id
- S: clickup_error
- T: created_at

5. **Copy the Sheet ID from URL:**
   - URL looks like: `https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit`
   - **Sheet ID** is the part between `/d/` and `/edit`: `1A2B3C4D5E6F7G8H9I0J`
   - Save this for later!

---

### Step 2: Create Google Cloud Service Account (10 minutes)

1. **Go to:** https://console.cloud.google.com/

2. **Create or select a project:**
   - Top bar → Select project → "New Project"
   - Name: "Sundae Submissions"
   - Click "Create"

3. **Enable Google Sheets API:**
   - Hamburger menu (☰) → "APIs & Services" → "Library"
   - Search: "Google Sheets API"
   - Click on it → Click "Enable"

4. **Create Service Account:**
   - Hamburger menu (☰) → "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" → "Service Account"
   - **Service account name:** `sundae-submissions`
   - **Service account ID:** (auto-fills) `sundae-submissions@...`
   - Click "CREATE AND CONTINUE"
   - **Role:** Select "Editor"
   - Click "CONTINUE" → "DONE"

5. **Create JSON Key:**
   - Click on the service account you just created
   - Go to "KEYS" tab
   - Click "ADD KEY" → "Create new key"
   - **Key type:** JSON
   - Click "CREATE"
   - **File downloads** - save it somewhere safe!

6. **Open the downloaded JSON file** - you'll need values from it

---

### Step 3: Share Google Sheet with Service Account

1. **Open your Google Sheet** (from Step 1)
2. **Click "Share"** button (top right)
3. **Paste the service account email:**
   - Open the JSON file you downloaded
   - Find `"client_email"`: `"sundae-submissions@project-name.iam.gserviceaccount.com"`
   - Copy that email
   - Paste it in the "Add people and groups" field
4. **Change permission to "Editor"**
5. **Uncheck "Notify people"**
6. **Click "Share"**

---

### Step 4: Add Variables to .env.local

**Open your `.env.local` file and add these lines at the bottom:**

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEET_ID=1A2B3C4D5E6F7G8H9I0J
GOOGLE_SERVICE_ACCOUNT_EMAIL=sundae-submissions@your-project-123456.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**Where to get the values:**

1. **GOOGLE_SHEET_ID:**
   - From Step 1: The ID you copied from the URL
   - Example: `1A2B3C4D5E6F7G8H9I0J`

2. **GOOGLE_SERVICE_ACCOUNT_EMAIL:**
   - From JSON file: `"client_email"` field
   - Example: `"sundae-submissions@my-project-123456.iam.gserviceaccount.com"`

3. **GOOGLE_PRIVATE_KEY:**
   - From JSON file: `"private_key"` field
   - **IMPORTANT:** Copy it EXACTLY as it appears, including all `\n` characters
   - It should start with: `"-----BEGIN PRIVATE KEY-----\n`
   - It should end with: `\n-----END PRIVATE KEY-----\n"`
   - **Keep it in double quotes!**

---

### Step 5: Restart Server & Test

1. **Stop your dev server** (Ctrl+C)

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Test health check:**
   ```bash
   curl http://localhost:3000/api/integrations/google-sheets/health
   ```

   **Should return:**
   ```json
   {
     "ok": true,
     "timestamp": "2025-12-15T...",
     "sheetId": "1A2B3C4D5E6F7G8H9I0J",
     "rowCount": 1
   }
   ```

4. **Submit a test form** at http://localhost:3000/demo

5. **Check your Google Sheet** - you should see a new row!

---

## Example .env.local (Full File)

```bash
# Google Analytics 4 Configuration
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# ClickUp Configuration
CLICKUP_API_TOKEN=pk_94119884_NH8LKZZVQCGZBG9S6YS8C57AFY0VSCOQ
CLICKUP_LIST_ID=901322983082
CLICKUP_CF_CTA_LABEL=36f1fbf8-f073-4f59-b8eb-4c6437a9837d
CLICKUP_CF_SOURCE_PAGE=78b29945-620e-4482-b0b8-968e5dab1177
CLICKUP_CF_UTM_SOURCE=398fcea4-120f-4fdb-8a80-4592039dd0eb
CLICKUP_CF_UTM_MEDIUM=6904cc9c-248a-43d4-808e-673a18d983b6
CLICKUP_CF_UTM_CAMPAIGN=679bdacd-8e4c-49c1-b86f-b271db411c18
CLICKUP_FIELD_FULL_NAME=0232fd57-5fd3-41b8-971d-b0029b5b4e36
CLICKUP_FIELD_EMAIL=f713606f-9fa4-4365-98f2-7164be62b28e
CLICKUP_FIELD_COMPANY=e3404ef6-a6d7-4cbc-8a4f-d8ade43d9ef0
CLICKUP_FIELD_ROLE=a926c39d-a9b7-4f2f-8e07-80e63404be95
CLICKUP_FIELD_PHONE=c27b9f74-0edc-4835-a806-ffacdad62b06
CLICKUP_FIELD_COUNTRY=beeceb60-b563-404f-81fd-261aeab7768b
CLICKUP_FIELD_POS=3d0c2c5e-71ca-4ed1-85e2-c89049c8a4a9
CLICKUP_FIELD_LOCATIONS=f261fec2-638b-49e8-bca6-c2a6c9beb0a1
CLICKUP_FIELD_MESSAGE=20f58b0c-1c6c-4e3d-b989-5b93efb1ba53

# Google Sheets Configuration ← ADD THIS SECTION
GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEET_ID=1A2B3C4D5E6F7G8H9I0J
GOOGLE_SERVICE_ACCOUNT_EMAIL=sundae-submissions@my-project-123456.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...\n-----END PRIVATE KEY-----\n"
```

---

## Common Issues

### "The caller does not have permission"
**Fix:** Share the Google Sheet with the service account email (Step 3)

### "Invalid credentials"
**Fix:** Make sure `GOOGLE_PRIVATE_KEY` includes all `\n` characters and is wrapped in double quotes

### "Sheet not found"
**Fix:** Double-check `GOOGLE_SHEET_ID` is correct

### Health check still returns "not configured"
**Fix:** Restart your dev server after adding variables

---

## Verify It's Working

After setup, check these:

✅ **Health check returns ok:true**
```bash
curl http://localhost:3000/api/integrations/google-sheets/health
```

✅ **Form submission creates row in Google Sheet**
- Submit form at /demo
- Check Google Sheet for new row
- Column Q should show: `success`

✅ **Server logs show Google Sheets**
```
[REQUEST_ID] [GoogleSheets] Submission saved: abc-123 at row 2
[REQUEST_ID] Submission saved (google-sheets): abc-123
```

---

**Need help?** See `GOOGLE_SHEETS_QUICKSTART.md` for more details!
