# Testing Guide - Google Sheets & ClickUp Integration

## Quick Test Checklist

### Step 1: Check Health Endpoints ✅

```bash
# Start your dev server first
npm run dev

# Test ClickUp connection
curl http://localhost:3000/api/integrations/clickup/health

# Test Google Sheets connection (if configured)
curl http://localhost:3000/api/integrations/google-sheets/health
```

**Expected Responses:**

**ClickUp Health (Success):**
```json
{
  "ok": true,
  "timestamp": "2025-12-15T20:10:00.000Z",
  "latencyMs": 234
}
```

**Google Sheets Health (Success):**
```json
{
  "ok": true,
  "timestamp": "2025-12-15T20:10:00.000Z",
  "sheetId": "1A2B3C4D5E6F7G8H9I0J",
  "rowCount": 1
}
```

**Google Sheets Health (Not Configured):**
```json
{
  "ok": false,
  "error": "Google Sheets not configured"
}
```

---

### Step 2: Submit a Test Form 📝

1. Go to http://localhost:3000/demo or http://localhost:3000/contact
2. Fill out the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Company: Test Corp
   - Role: Manager
   - Country: United States
   - Phone: +1234567890
   - Number of Locations: 1
   - Primary POS: Toast
   - Message: Testing the integration

3. Submit the form
4. You should see a success message

---

### Step 3: Check Server Logs 🔍

Look for these log patterns in your terminal:

**✅ Google Sheets Enabled:**
```
[REQUEST_ID] ===== CTA SUBMISSION START =====
[REQUEST_ID] Validation passed for test@example.com
[REQUEST_ID] [GoogleSheets] Submission saved: abc-123-def at row 2
[REQUEST_ID] [UnifiedStore] Saved to Google Sheets: abc-123-def
[REQUEST_ID] Submission saved (google-sheets): abc-123-def
[REQUEST_ID] ClickUp minimal payload: { name: "Book a Demo – ...", ... }
[REQUEST_ID] ✅ Task created: 86953jnvr
[REQUEST_ID] Applying 15 custom fields...
[REQUEST_ID] Custom fields: 15 applied, 0 failed
[REQUEST_ID] [GoogleSheets] Updated submission abc-123-def at row 2
[REQUEST_ID] ===== SUCCESS (2340ms) =====
```

**⚠️ Google Sheets Disabled (Falls back to file storage):**
```
[REQUEST_ID] ===== CTA SUBMISSION START =====
[REQUEST_ID] Validation passed for test@example.com
[REQUEST_ID] [UnifiedStore] Saved to file storage: abc-123-def
[REQUEST_ID] Submission saved (file): abc-123-def
[REQUEST_ID] ClickUp minimal payload: { name: "Book a Demo – ...", ... }
[REQUEST_ID] ✅ Task created: 86953jnvr
[REQUEST_ID] ===== SUCCESS (1840ms) =====
```

---

### Step 4: Verify Data Storage 📊

#### If Google Sheets is Enabled:

1. **Open your Google Sheet**
2. **Check for new row** with your test data:

| submission_id | timestamp | name | email | company | ... | clickup_sync_status | clickup_task_id |
|--------------|-----------|------|-------|---------|-----|-------------------|----------------|
| abc-123-def | 2025-12-15... | Test User | test@example.com | Test Corp | ... | success | 86953jnvr |

3. **Column Q (clickup_sync_status)** should show:
   - `success` ✅ if ClickUp task was created
   - `failed` ⚠️ if ClickUp failed (but lead is still saved!)
   - `pending` ⏳ if still processing

#### If Google Sheets is NOT Enabled:

1. **Check the `.submissions/` directory** in your project root:
```bash
ls -lh .submissions/
# You should see: abc-123-def.json
```

2. **View the submission file:**
```bash
cat .submissions/abc-123-def.json
```

Example content:
```json
{
  "id": "abc-123-def",
  "timestamp": "2025-12-15T20:10:00.000Z",
  "data": {
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Corp",
    ...
  },
  "clickupSyncStatus": "success",
  "clickupTaskId": "86953jnvr",
  "retryCount": 0
}
```

---

### Step 5: Verify ClickUp Task 🎯

1. **Go to your ClickUp list**
2. **Find the new task:**
   - Name should be: "Book a Demo – Test User" (or your CTA label)
   - Description should contain all form data
   - Custom fields should be populated (if configured)

3. **Check the task description** for:
   - ✅ All form fields present
   - ✅ Request ID and Submission ID at the bottom
   - ✅ UTC timestamp

---

## Troubleshooting

### Issue: Health Check Returns `ok: false`

**For ClickUp:**
```json
{
  "ok": false,
  "error": "HTTP 401: Unauthorized"
}
```
**Solution:** Check `CLICKUP_API_TOKEN` in `.env.local`

**For Google Sheets:**
```json
{
  "ok": false,
  "error": "The caller does not have permission"
}
```
**Solution:** 
1. Share the Google Sheet with your service account email
2. Give it "Editor" access

---

### Issue: Form Submits But No Google Sheet Row

**Check logs for:**
```
[REQUEST_ID] [GoogleSheets] Failed to append row: The caller does not have permission
[REQUEST_ID] [UnifiedStore] Google Sheets save failed: ...
[REQUEST_ID] [UnifiedStore] Falling back to file storage...
```

**Solution:**
1. Verify `GOOGLE_SHEETS_ENABLED=true` in `.env.local`
2. Check service account has access to sheet
3. Verify Sheet ID is correct

---

### Issue: ClickUp Task Created But No Custom Fields

**Check logs for:**
```
[REQUEST_ID] Applying 15 custom fields...
[REQUEST_ID] Field abc-123... not found on list, skipping
[REQUEST_ID] Field def-456... not found on list, skipping
[REQUEST_ID] Custom fields: 0 applied, 15 failed
```

**Solution:**
1. Check field IDs in `.env.local` match your ClickUp list
2. Go to ClickUp → List Settings → Custom Fields
3. Click each field and copy the correct ID
4. Update `.env.local` with correct IDs

---

### Issue: Submission Saved But ClickUp Failed

**This is NORMAL and EXPECTED behavior!**

Check logs:
```
[REQUEST_ID] Submission saved (google-sheets): abc-123-def
[REQUEST_ID] ClickUp sync failed: auth: Invalid or expired ClickUp API token
[REQUEST_ID] ===== PARTIAL SUCCESS (1840ms) =====
```

**What happens:**
- ✅ User sees success message
- ✅ Submission is saved (in Google Sheets or file)
- ⚠️ ClickUp task not created
- 📝 Admin can manually create ClickUp task from saved submission

**This is by design** - we never lose leads even if ClickUp is down!

---

## Complete Test Flow

### Test #1: Everything Working

1. ✅ Health checks return `ok: true`
2. ✅ Submit form → Success message
3. ✅ Google Sheet shows new row (or file in `.submissions/`)
4. ✅ ClickUp task created with all fields
5. ✅ Logs show "SUCCESS"

### Test #2: Google Sheets Fails (Graceful Fallback)

1. Temporarily break Google Sheets (wrong Sheet ID)
2. Submit form → Still shows success! ✅
3. Check logs → "Falling back to file storage"
4. Check `.submissions/` → File exists ✅
5. ClickUp task still created ✅

### Test #3: ClickUp Fails (Still Saves Lead)

1. Temporarily break ClickUp (wrong token)
2. Submit form → Still shows success! ✅
3. Check Google Sheet → Row exists with `clickup_sync_status: failed` ✅
4. User never sees ClickUp error ✅

---

## Test Commands

```bash
# 1. Test health endpoints
curl http://localhost:3000/api/integrations/clickup/health
curl http://localhost:3000/api/integrations/google-sheets/health

# 2. Submit test via curl
curl -X POST http://localhost:3000/api/cta/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Corp",
    "role": "Manager",
    "country": "United States",
    "phone": "+1234567890",
    "numberOfLocations": "1",
    "primaryPOS": "Toast",
    "message": "Testing",
    "ctaLabel": "Test"
  }'

# 3. Check file submissions (if not using Google Sheets)
ls -lh .submissions/
cat .submissions/*.json | jq .

# 4. Watch logs in real-time
npm run dev | grep "REQUEST_ID"
```

---

## Success Criteria

✅ **Google Sheets Connected:**
- Health check returns `ok: true`
- New rows appear in sheet after form submission
- Column Q shows sync status

✅ **ClickUp Connected:**
- Health check returns `ok: true`
- Tasks appear in ClickUp list
- Custom fields populated

✅ **Graceful Degradation:**
- Form works even if Google Sheets fails
- Form works even if ClickUp fails
- Users never see technical errors

✅ **Zero Lost Leads:**
- Every submission saved somewhere (Google Sheets OR file)
- Admin can always access submission data

---

## Quick Diagnosis

**Run this command to check your setup:**

```bash
# Check environment variables
echo "ClickUp Token: ${CLICKUP_API_TOKEN:0:20}..."
echo "ClickUp List: $CLICKUP_LIST_ID"
echo "Google Sheets Enabled: $GOOGLE_SHEETS_ENABLED"
echo "Google Sheet ID: $GOOGLE_SHEET_ID"
```

**Expected output:**
```
ClickUp Token: pk_1234567890abcdef...
ClickUp List: 123456789
Google Sheets Enabled: true
Google Sheet ID: 1A2B3C4D5E6F7G8H9I0J
```

---

**Ready to test! 🚀**

Start with the health checks, then submit a test form and watch the magic happen!
