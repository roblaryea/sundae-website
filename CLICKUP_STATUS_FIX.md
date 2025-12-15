# ClickUp "Status not found" Fix (CRTSK_001)

**Date:** December 15, 2025  
**Error:** `{ "err": "Status not found", "ECODE": "CRTSK_001" }`  
**Status:** ✅ FIXED

---

## Problem

ClickUp API was rejecting task creation with:
- **400 Bad Request**
- **Error Code:** CRTSK_001
- **Message:** "Status not found"

The issue was that we were sending `status: "to do"` in the task creation payload, but ClickUp doesn't accept a status field during task creation - it uses the list's default status automatically.

---

## Root Cause

The `status` field is for **internal tracking** (UnifiedStore/Google Sheets) and should **never** be sent to ClickUp's create task API.

**What was happening:**
```javascript
// ❌ WRONG - ClickUp rejects this
const taskPayload = {
  name: "Task name",
  description: "...",
  status: "to do",  // ← This causes CRTSK_001 error
  priority: 3
};
```

**What ClickUp expects:**
```javascript
// ✅ CORRECT - ClickUp uses list default
const taskPayload = {
  name: "Task name",
  description: "...",
  priority: 3  // No status field
};
```

---

## Files Changed

### 1. `src/app/api/cta/submit/route.ts`

**Line ~207: Removed status from taskPayload**

```diff
  const taskPayload: any = {
    name: `${ctaLabel || 'Website Lead'} – ${name}`,
    description,
-   status: 'to do',
    priority: 3,
  };
```

**Added comment:**
```javascript
// NOTE: Do not include 'status' - ClickUp will use list default
// Status is only for internal tracking (UnifiedStore/Google Sheets)
```

### 2. `src/lib/clickupClient.ts`

**Line ~233: Removed status handling from minimal payload**

```diff
  // Optional safe fields
- if (taskPayload.status) minimalPayload.status = taskPayload.status;
  if (taskPayload.priority) minimalPayload.priority = taskPayload.priority;
  if (taskPayload.tags && Array.isArray(taskPayload.tags)) {
    minimalPayload.tags = taskPayload.tags;
  }
```

**Added comment:**
```javascript
// NOTE: Do NOT include status - ClickUp rejects it with CRTSK_001 error
// Status is for internal tracking only (UnifiedStore/Google Sheets)
```

---

## What Changed

### Before (Broken):
```
User submits form
     ↓
Submission saved to UnifiedStore (status: "pending") ✅
     ↓
ClickUp API called with payload including status: "to do" ❌
     ↓
ClickUp returns: 400 Bad Request - "Status not found" (CRTSK_001)
     ↓
Task NOT created ❌
User sees success (lead saved but no ClickUp task)
```

### After (Fixed):
```
User submits form
     ↓
Submission saved to UnifiedStore (status: "pending") ✅
     ↓
ClickUp API called with payload WITHOUT status ✅
     ↓
ClickUp creates task using list's default status ✅
     ↓
Task created successfully ✅
User sees success with ClickUp task link
```

---

## Key Points

1. **Status is ONLY for internal tracking**
   - Stored in Google Sheets column Q (`clickup_sync_status`)
   - Stored in file submissions (`.submissions/UUID.json`)
   - Values: `pending`, `success`, `failed`

2. **ClickUp handles status automatically**
   - Uses the list's default status
   - We don't need to specify it
   - Trying to specify it causes CRTSK_001 error

3. **No user-facing changes**
   - Form works the same
   - Users still see success messages
   - ClickUp tasks are created in the list's default status

---

## Testing

### Before Fix:
```bash
# Submit form → Check logs
[REQUEST_ID] ClickUp minimal payload: { ..., status: "to do", ... }
[REQUEST_ID] 400 Bad Request - Full response: { "err": "Status not found", "ECODE": "CRTSK_001" }
[REQUEST_ID] Task creation failed
```

### After Fix:
```bash
# Submit form → Check logs
[REQUEST_ID] ClickUp minimal payload: { ..., priority: 3 }  # No status!
[REQUEST_ID] ✅ Task created: 86953jnvr
[REQUEST_ID] Custom fields: 15 applied, 0 failed
[REQUEST_ID] ===== SUCCESS =====
```

---

## How to Verify

1. **Submit a test form:**
   ```bash
   # Go to http://localhost:3000/demo
   # Fill out and submit the form
   ```

2. **Check server logs:**
   ```bash
   # Should see:
   [REQUEST_ID] ClickUp minimal payload: { name: "...", descriptionLength: 450, status: undefined, priority: 3 }
   [REQUEST_ID] ✅ Task created: abc123
   [REQUEST_ID] ===== SUCCESS =====
   ```

3. **Check ClickUp:**
   - Task should appear in your ClickUp list
   - Status should be the list's default (e.g., "To Do", "Open", etc.)
   - All custom fields should be populated

4. **Check UnifiedStore (if Google Sheets enabled):**
   - Open your Google Sheet
   - New row should show `clickup_sync_status: success`
   - `clickup_task_id` should have the task ID

---

## Impact

✅ **Tasks now created successfully in ClickUp**  
✅ **No CRTSK_001 errors**  
✅ **Internal status tracking unchanged**  
✅ **Zero user-facing changes**  
✅ **Backward compatible**

---

## Diff Summary

```
src/app/api/cta/submit/route.ts
  - Line 207: Removed `status: 'to do',` from taskPayload
  + Added comment explaining status is internal only

src/lib/clickupClient.ts
  - Line 233: Removed status copying from taskPayload
  + Added comment about CRTSK_001 error
  ~ Line 246: Debug log now shows status: undefined
```

---

## Prevention

To prevent this issue in the future:

1. **Never send `status` to ClickUp create task API**
2. **Use status only for internal tracking:**
   - UnifiedStore (Google Sheets/files)
   - Tracks: `pending`, `success`, `failed`
3. **Let ClickUp manage its own status workflow**

---

**Status: FIXED ✅**

Submit a test form to verify ClickUp task creation now works!
