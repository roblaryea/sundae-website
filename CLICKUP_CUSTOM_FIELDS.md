# ClickUp Custom Fields Integration Guide

## Overview
The demo form now properly maps all lead capture fields to ClickUp Custom Fields, enabling structured data capture, filtering, and reporting within ClickUp.

## Configuration

### Step 1: Create Custom Fields in ClickUp

Navigate to your ClickUp list and create the following custom fields:

| Field Name | Type | Required | Purpose |
|------------|------|----------|---------|
| Full Name | Text | Yes | Lead's full name |
| Email | Email | Yes | Lead's work email |
| Company | Text | Yes | Company or group name |
| Role | Text | Yes | Job title/role |
| Phone | Phone | Yes | Phone number with country code |
| Country | Dropdown | Yes | Lead's country |
| Number of Locations | Dropdown | Yes | Restaurant/location count |
| Primary POS | Text | Yes | POS/system used |
| Message | Long Text | Yes | Lead's message/context |

**Optional Source Tracking Fields:**
| Field Name | Type | Required | Purpose |
|------------|------|----------|---------|
| CTA Label | Text | No | Which CTA was clicked |
| Source Page | Text | No | Page where form was filled |
| UTM Source | Text | No | UTM source parameter |
| UTM Medium | Text | No | UTM medium parameter |
| UTM Campaign | Text | No | UTM campaign parameter |

### Step 2: Get Custom Field IDs

For each custom field:
1. Click on the field in ClickUp
2. Click "Settings" (gear icon)
3. Copy the **Field ID** (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 3: Add to .env.local

Copy `.env.local.template` to `.env.local` and add your field IDs:

```env
# Required ClickUp Configuration
CLICKUP_API_TOKEN=your_api_token_here
CLICKUP_LIST_ID=your_list_id_here

# Lead Information Custom Fields (Recommended)
CLICKUP_FIELD_FULL_NAME=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_FIELD_EMAIL=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_FIELD_COMPANY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_FIELD_ROLE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_FIELD_PHONE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_FIELD_COUNTRY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_FIELD_POS=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_FIELD_LOCATIONS=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_FIELD_MESSAGE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Source Tracking Custom Fields (Optional)
CLICKUP_CF_CTA_LABEL=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_CF_SOURCE_PAGE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_CF_UTM_SOURCE=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_CF_UTM_MEDIUM=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
CLICKUP_CF_UTM_CAMPAIGN=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

## How It Works

### Data Flow

```
User submits form
    ↓
Frontend validation (all 9 fields)
    ↓
API receives data
    ↓
Server-side validation
    ↓
Build ClickUp payload with:
    - Task name: "CTA Label – Lead Name"
    - Task description: Formatted text version
    - Custom fields: Structured data mapping
    ↓
Submit to ClickUp API
    ↓
Task created with:
    ✓ Readable description
    ✓ Filterable custom fields
    ✓ Sortable/searchable data
```

### Payload Structure

```typescript
{
  name: "Book a Demo – John Doe",
  description: "Formatted text with all details...",
  status: "to do",
  priority: 3,
  custom_fields: [
    { id: CLICKUP_FIELD_FULL_NAME, value: "John Doe" },
    { id: CLICKUP_FIELD_EMAIL, value: "john@company.com" },
    { id: CLICKUP_FIELD_COMPANY, value: "Company Inc" },
    { id: CLICKUP_FIELD_ROLE, value: "CEO" },
    { id: CLICKUP_FIELD_PHONE, value: "+971 50 123 4567" },
    { id: CLICKUP_FIELD_COUNTRY, value: "United Arab Emirates" },
    { id: CLICKUP_FIELD_POS, value: "Toast" },
    { id: CLICKUP_FIELD_LOCATIONS, value: "11-25" },
    { id: CLICKUP_FIELD_MESSAGE, value: "Looking to improve..." }
  ]
}
```

## Benefits of Custom Fields

### 1. **Structured Data**
- All leads have consistent data format
- Easy to parse and export
- Database-like querying capabilities

### 2. **Filtering & Sorting**
- Filter by country, location count, POS system
- Sort by any field
- Group by company size or region

### 3. **Reporting**
```
Examples:
- "Show all leads from UAE with 50+ locations"
- "Group leads by POS system"
- "Count leads by country"
- "Filter leads from specific campaigns"
```

### 4. **Automation**
Use ClickUp automations based on field values:
- Auto-assign based on country
- Tag based on location count
- Priority based on company size
- Email notifications for specific POS systems

### 5. **CRM Integration**
Export structured data to:
- HubSpot
- Salesforce
- Pipedrive
- Custom CRM

## Error Handling

### Missing Field IDs
If a custom field ID is not configured:
- **Behavior**: Field is skipped, warning logged
- **Console**: `CLICKUP_FIELD_XXX not configured`
- **Impact**: Data still in description, but not in custom field
- **Solution**: Add the field ID to `.env.local`

### API Errors
If ClickUp API returns an error:
- **Response**: `{ success: false, error: "Failed to create task in ClickUp" }`
- **Logged**: Full error response in server console
- **User sees**: Generic error message
- **Action**: Check ClickUp API token and field IDs

## Development Mode

When `NODE_ENV !== 'production'`, the API logs:

```javascript
console.log('CLICKUP PAYLOAD (sanitized):', {
  taskName: "Book a Demo – John Doe",
  hasCustomFields: true,
  customFieldsCount: 14,
  customFields: [
    { id: "field-123", value: "John Doe" },
    { id: "field-456", value: "john@company.com" },
    // ...
  ]
});
```

This helps debug custom field mapping issues.

## Testing Checklist

### Setup
- [ ] All custom fields created in ClickUp
- [ ] All field IDs copied to `.env.local`
- [ ] API token and list ID configured
- [ ] Server restarted after env changes

### Form Submission
- [ ] Submit a test form with all fields filled
- [ ] Check ClickUp task created successfully
- [ ] Verify task description contains all data
- [ ] **Verify each custom field populated correctly**

### Custom Field Validation
For each field, verify in ClickUp:
- [ ] Full Name field shows name
- [ ] Email field shows email (clickable)
- [ ] Company field shows company
- [ ] Role field shows role
- [ ] Phone field shows phone (formatted)
- [ ] Country field shows country
- [ ] POS field shows POS system
- [ ] Locations field shows location range
- [ ] Message field shows message

### Source Tracking (if configured)
- [ ] CTA Label field shows CTA
- [ ] Source Page field shows page URL
- [ ] UTM fields show campaign data

## Troubleshooting

### Custom Field Not Populating

**Problem**: Field shows in description but not in custom field

**Causes & Solutions:**
1. **Wrong Field ID**
   - Double-check field ID in ClickUp settings
   - Ensure no extra spaces in `.env.local`

2. **Field Type Mismatch**
   - ClickUp expects specific format for field type
   - Email fields need valid email
   - Phone fields need proper format

3. **Environment Variable Not Loaded**
   - Restart Next.js server after `.env.local` changes
   - Verify: `console.log(process.env.CLICKUP_FIELD_XXX)`

4. **API Token Permissions**
   - Ensure token has write access to custom fields
   - Check ClickUp workspace permissions

### Field Shows "Invalid Value"

**Problem**: ClickUp shows "Invalid value" for custom field

**Solution**: Check field type constraints
- Dropdown fields: Value must match exact option text
- Number fields: Value must be numeric
- Date fields: Value must be ISO date format

### No Warning Logs

**Problem**: No warning logs for missing field IDs

**Solution**: Check server console, not browser console
```bash
npm run dev
# Look for: "CLICKUP_FIELD_XXX not configured"
```

## Migration from Description-Only

If you previously used description-only (no custom fields):

1. **Backward Compatible**: Old behavior still works
2. **Add Gradually**: Add field IDs one at a time
3. **Test Each**: Verify each field as you add it
4. **Full Migration**: Once all IDs added, all data structured

## Best Practices

### 1. Use Dropdown Fields Where Possible
```
Examples:
- Country → Dropdown of countries
- Locations → Dropdown of ranges (1, 2-5, 6-10, etc.)
- POS System → Dropdown of common systems
```

### 2. Consistent Formatting
- Phone: `+XXX YY ZZZ ZZZZ` format
- Date: ISO 8601 format
- Country: Full name, not code

### 3. Required vs Optional
- Mark business-critical fields as required in ClickUp
- Keep form and ClickUp requirements aligned

### 4. Regular Audits
- Monthly: Review custom field usage
- Quarterly: Update dropdown options
- Annually: Audit field relevance

## Advanced: Custom Field Types

### Text Fields
```typescript
{ id: fieldId, value: "text string" }
```

### Email Fields
```typescript
{ id: fieldId, value: "email@domain.com" }
```

### Phone Fields
```typescript
{ id: fieldId, value: "+1 555 123 4567" }
```

### Dropdown Fields
```typescript
// Value must match exact option in ClickUp
{ id: fieldId, value: "11-25" }  // Must exist in dropdown
```

### Long Text Fields
```typescript
{ id: fieldId, value: "Multi-line\ntext\ncontent" }
```

### Number Fields
```typescript
{ id: fieldId, value: 42 }  // Number, not string
```

### Date Fields
```typescript
{ id: fieldId, value: "2025-11-29T21:47:00Z" }  // ISO 8601
```

## Support

For issues with:
- **ClickUp API**: [ClickUp API Docs](https://clickup.com/api)
- **Custom Fields**: [ClickUp Custom Fields Guide](https://docs.clickup.com/en/articles/custom-fields)
- **Implementation**: See `src/app/api/cta/submit/route.ts`

## Related Documentation

- `DEMO_FORM_ENHANCEMENTS.md` - Complete form implementation
- `CLICKUP_INTEGRATION.md` - Original ClickUp setup
- `CTA_TRACKING_IMPLEMENTATION.md` - CTA tracking system
- `.env.local.template` - Environment variable reference
