# ClickUp CTA Integration Documentation

## Overview

This document describes the centralized ClickUp integration for all lead capture forms on the Sundae marketing site. The integration automatically creates tasks in ClickUp whenever users submit forms through the website.

## Architecture

### Components

1. **API Route**: `/api/cta/submit` - Server-side endpoint that handles form submissions and creates ClickUp tasks
2. **Lead Capture Form Component**: `src/components/marketing/LeadCaptureForm.tsx` - Reusable form component used across CTA pages
3. **Environment Configuration**: `.env.local` - Contains ClickUp API credentials and configuration

### Data Flow

```
User fills form → LeadCaptureForm component → POST /api/cta/submit → ClickUp API → Task created
```

## Setup Instructions

### 1. Get ClickUp API Token

1. Log in to ClickUp
2. Go to **Settings** → **Apps** → **API Token**
3. Click **Generate** if you don't have one
4. Copy the API token

### 2. Get ClickUp List ID

1. Open the ClickUp list where you want tasks created
2. Look at the URL: `https://app.clickup.com/WORKSPACE_ID/v/li/LIST_ID`
3. Copy the `LIST_ID` from the URL

### 3. Configure Environment Variables

Copy `.env.local.template` to `.env.local` and add your credentials:

```bash
# Required
CLICKUP_API_TOKEN=pk_your_actual_token_here
CLICKUP_LIST_ID=123456789

# Optional - Custom Fields
CLICKUP_CF_CTA_LABEL=cf_abc123
CLICKUP_CF_SOURCE_PAGE=cf_def456
CLICKUP_CF_UTM_SOURCE=cf_ghi789
CLICKUP_CF_UTM_MEDIUM=cf_jkl012
CLICKUP_CF_UTM_CAMPAIGN=cf_mno345
```

### 4. (Optional) Set Up Custom Fields

If you want structured data in ClickUp:

1. In ClickUp, go to your list settings
2. Add custom fields:
   - **CTA Label** (text)
   - **Source Page** (text)
   - **UTM Source** (text)
   - **UTM Medium** (text)
   - **UTM Campaign** (text)
3. Click each field and copy its ID
4. Add the IDs to `.env.local`

## Implementation

### Using LeadCaptureForm Component

The form component is already integrated into these pages:

- `/demo` - Book a Demo form
- `/contact` - Contact Us form

To add it to other pages:

```tsx
import { LeadCaptureForm } from '@/components/marketing/LeadCaptureForm';

export default function YourPage() {
  return (
    <LeadCaptureForm 
      ctaLabel="Your CTA Label"
      defaultMessage="Optional pre-filled message"
    />
  );
}
```

### Form Fields

The form captures:

- **Name** (required)
- **Email** (required)
- **Company** (optional)
- **Role** (optional)
- **Phone** (optional)
- **Message** (optional)

### Automatic Data Capture

The system automatically captures:

- **CTA Label**: Identifier for which form was submitted
- **Source Page**: The page URL where the form was submitted
- **UTM Parameters**: Marketing attribution (utm_source, utm_medium, utm_campaign)

## ClickUp Task Structure

### Task Name Format

```
{CTA Label} – {User Name}
```

Example: `Book a Demo – John Smith`

### Task Description

```markdown
**Lead Information**
- **Name:** John Smith
- **Email:** john@restaurant.com
- **Company:** Smith's Restaurants
- **Role:** Operations Manager
- **Phone:** +1 (555) 123-4567

**Message:**
I'm interested in learning how Sundae can help reduce our labor costs.

**Source Information**
- **CTA Label:** Book a Demo
- **Source Page:** /demo
- **UTM Source:** google
- **UTM Medium:** cpc
- **UTM Campaign:** q4-2024
```

### Task Properties

- **Status**: "to do"
- **Priority**: 3 (Normal)
- **Custom Fields**: If configured, structured data is added

## API Reference

### POST /api/cta/submit

**Request Body:**

```json
{
  "name": "John Smith",
  "email": "john@restaurant.com",
  "company": "Smith's Restaurants",
  "role": "Operations Manager",
  "phone": "+1 (555) 123-4567",
  "message": "I'm interested in learning more",
  "ctaLabel": "Book a Demo",
  "sourcePage": "/demo",
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "q4-2024"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "taskId": "abc123xyz"
}
```

**Error Response (400/500):**

```json
{
  "success": false,
  "error": "Name and email are required"
}
```

## Error Handling

### Common Errors

1. **Missing Environment Variables**
   - Error: "Server configuration error"
   - Solution: Ensure `CLICKUP_API_TOKEN` and `CLICKUP_LIST_ID` are set in `.env.local`

2. **Invalid API Token**
   - Error: "Failed to create task in ClickUp"
   - Solution: Regenerate API token in ClickUp settings

3. **Invalid List ID**
   - Error: "Failed to create task in ClickUp"
   - Solution: Verify the list ID from the ClickUp URL

4. **Network Issues**
   - Error: "Internal server error"
   - Solution: Check server logs; ClickUp API may be temporarily unavailable

## Testing

### Manual Testing

1. Navigate to `/demo`
2. Fill out the form with test data
3. Submit the form
4. Verify:
   - Success message appears
   - Task is created in ClickUp
   - All data is captured correctly

### Test Credentials

Never use production API tokens in development. Create a separate ClickUp workspace/list for testing.

## Security Considerations

1. **API Token Security**
   - Never commit `.env.local` to git
   - Use different tokens for development/production
   - Rotate tokens periodically

2. **Data Validation**
   - Name and email are validated as required
   - Email format is validated on client and server
   - No SQL injection risk (using ClickUp API)

3. **Rate Limiting**
   - ClickUp API has rate limits (100 requests/minute)
   - Consider implementing rate limiting on the API route for production

## Monitoring

### What to Monitor

1. **Success Rate**: Track `/api/cta/submit` success/error responses
2. **Response Time**: Monitor API latency
3. **Error Logs**: Watch for ClickUp API errors
4. **Form Abandonment**: Track incomplete submissions

### Logging

The API route logs:
- Missing configuration errors
- ClickUp API errors (without sensitive data)
- General submission errors

Check Next.js server logs for debugging.

## Maintenance

### Regular Tasks

1. **Monthly**: Review ClickUp task creation success rate
2. **Quarterly**: Rotate API tokens
3. **As Needed**: Update custom field mappings
4. **As Needed**: Add new CTA pages using LeadCaptureForm

### Updating the Integration

To modify form fields or task structure:

1. Update `LeadCaptureForm.tsx` for UI changes
2. Update `/api/cta/submit/route.ts` for data processing
3. Test thoroughly before deploying

## Troubleshooting

### Form Not Submitting

1. Check browser console for JavaScript errors
2. Verify network request reaches `/api/cta/submit`
3. Check server logs for API errors

### Tasks Not Appearing in ClickUp

1. Verify API token is valid
2. Confirm list ID is correct
3. Check ClickUp API status page
4. Review server logs for error messages

### Custom Fields Not Populating

1. Verify custom field IDs in `.env.local`
2. Ensure field types match (e.g., text fields)
3. Check that fields exist in the target list

## Future Enhancements

Potential improvements:

1. **Email Notifications**: Send confirmation emails to users
2. **Webhook Integration**: Real-time updates from ClickUp
3. **Analytics Integration**: Track conversion funnels
4. **A/B Testing**: Test different form layouts
5. **Lead Scoring**: Automatic lead qualification

## Support

For issues or questions:

1. Check this documentation
2. Review server logs
3. Test with ClickUp API directly
4. Contact the development team

---

**Last Updated**: November 29, 2025  
**Version**: 1.0.0
