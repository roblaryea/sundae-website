import { NextRequest, NextResponse } from 'next/server';


// Resilient custom field ID constants with hard-coded fallbacks
// These ensure custom fields always populate even if env vars fail to load
const CLICKUP_CF_CTA_LABEL_ID =
  process.env.CLICKUP_CF_CTA_LABEL ?? '36f1fbf8-f073-4f59-b8eb-4c6437a9837d';
const CLICKUP_CF_SOURCE_PAGE_ID =
  process.env.CLICKUP_CF_SOURCE_PAGE ?? '78b29945-620e-4482-b0b8-968e5dab1177';
const CLICKUP_CF_UTM_SOURCE_ID =
  process.env.CLICKUP_CF_UTM_SOURCE ?? '398fcea4-120f-4fdb-8a80-4592039dd0eb';
const CLICKUP_CF_UTM_MEDIUM_ID =
  process.env.CLICKUP_CF_UTM_MEDIUM ?? '6904cc9c-248a-43d4-808e-673a18d983b6';
const CLICKUP_CF_UTM_CAMPAIGN_ID =
  process.env.CLICKUP_CF_UTM_CAMPAIGN ?? '679bdacd-8e4c-49c1-b86f-b271db411c18';

const CLICKUP_FIELD_FULL_NAME_ID =
  process.env.CLICKUP_FIELD_FULL_NAME ?? '0232fd57-5fd3-41b8-971d-b0029b5b4e36';
const CLICKUP_FIELD_EMAIL_ID =
  process.env.CLICKUP_FIELD_EMAIL ?? 'f713606f-9fa4-4365-98f2-7164be62b28e';
const CLICKUP_FIELD_COMPANY_ID =
  process.env.CLICKUP_FIELD_COMPANY ?? 'e3404ef6-a6d7-4cbc-8a4f-d8ade43d9ef0';
const CLICKUP_FIELD_ROLE_ID =
  process.env.CLICKUP_FIELD_ROLE ?? 'a926c39d-a9b7-4f2f-8e07-80e63404be95';
const CLICKUP_FIELD_PHONE_ID =
  process.env.CLICKUP_FIELD_PHONE ?? 'c27b9f74-0edc-4835-a806-ffacdad62b06';
const CLICKUP_FIELD_COUNTRY_ID =
  process.env.CLICKUP_FIELD_COUNTRY ?? 'beeceb60-b563-404f-81fd-261aeab7768b';
const CLICKUP_FIELD_POS_ID =
  process.env.CLICKUP_FIELD_POS ?? '3d0c2c5e-71ca-4ed1-85e2-c89049c8a4a9';
const CLICKUP_FIELD_LOCATIONS_ID =
  process.env.CLICKUP_FIELD_LOCATIONS ?? 'f261fec2-638b-49e8-bca6-c2a6c9beb0a1';
const CLICKUP_FIELD_MESSAGE_ID =
  process.env.CLICKUP_FIELD_MESSAGE ?? '20f58b0c-1c6c-4e3d-b989-5b93efb1ba53';

export async function POST(request: NextRequest) {
  // Log environment variable status (for debugging)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('ENVIRONMENT VARIABLES CHECK');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('CLICKUP_API_TOKEN:', process.env.CLICKUP_API_TOKEN ? `${process.env.CLICKUP_API_TOKEN.substring(0, 10)}...` : 'MISSING');
  console.log('CLICKUP_LIST_ID:', process.env.CLICKUP_LIST_ID || 'MISSING');
  console.log('CLICKUP_FIELD_FULL_NAME:', process.env.CLICKUP_FIELD_FULL_NAME || 'MISSING');
  console.log('CLICKUP_FIELD_EMAIL:', process.env.CLICKUP_FIELD_EMAIL || 'MISSING');
  console.log('CLICKUP_FIELD_COMPANY:', process.env.CLICKUP_FIELD_COMPANY || 'MISSING');
  console.log('CLICKUP_FIELD_ROLE:', process.env.CLICKUP_FIELD_ROLE || 'MISSING');
  console.log('CLICKUP_FIELD_PHONE:', process.env.CLICKUP_FIELD_PHONE || 'MISSING');
  console.log('CLICKUP_FIELD_COUNTRY:', process.env.CLICKUP_FIELD_COUNTRY || 'MISSING');
  console.log('CLICKUP_FIELD_POS:', process.env.CLICKUP_FIELD_POS || 'MISSING');
  console.log('CLICKUP_FIELD_LOCATIONS:', process.env.CLICKUP_FIELD_LOCATIONS || 'MISSING');
  console.log('CLICKUP_FIELD_MESSAGE:', process.env.CLICKUP_FIELD_MESSAGE || 'MISSING');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Parse request body
    const body = await request.json();
    const {
      name,
      email,
      company,
      role,
      country,
      phone,
      numberOfLocations,
      primaryPOS,
      message,
      ctaLabel,
      sourcePage,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Validate required fields
    const missingFields: string[] = [];
    if (!name?.trim()) missingFields.push('name');
    if (!email?.trim()) missingFields.push('email');
    if (!company?.trim()) missingFields.push('company');
    if (!role?.trim()) missingFields.push('role');
    if (!country?.trim()) missingFields.push('country');
    if (!phone?.trim()) missingFields.push('phone');
    if (!numberOfLocations?.trim()) missingFields.push('numberOfLocations');
    if (!primaryPOS?.trim()) missingFields.push('primaryPOS');
    if (!message?.trim()) missingFields.push('message');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing or invalid required fields',
          invalidFields: missingFields
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email address',
          invalidFields: ['email']
        },
        { status: 400 }
      );
    }

    // Validate phone number (must have at least 6 digits)
    const phoneDigits = phone.replace(/[\s\-\(\)]/g, '');
    if (!/\d{6,}/.test(phoneDigits)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid phone number',
          invalidFields: ['phone']
        },
        { status: 400 }
      );
    }

    // Read API credentials from environment
    const apiToken = process.env.CLICKUP_API_TOKEN;
    const listId = process.env.CLICKUP_LIST_ID;

    if (!apiToken || !listId) {
      const missingVars = [];
      if (!apiToken) missingVars.push('CLICKUP_API_TOKEN');
      if (!listId) missingVars.push('CLICKUP_LIST_ID');
      
      console.error('Missing ClickUp configuration:', missingVars.join(', '));
      return NextResponse.json(
        { 
          success: false, 
          error: `Server configuration error: ${missingVars.join(' and ')} is missing. Please check .env.local file.` 
        },
        { status: 500 }
      );
    }
    
    // Log custom field configuration status in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('CLICKUP_ENV_STATUS', {
        hasToken: !!apiToken,
        hasListId: !!listId,
      });
      console.log('Custom Field ID Constants Status (with fallbacks):');
      console.log({
        CLICKUP_FIELD_FULL_NAME_ID,
        CLICKUP_FIELD_EMAIL_ID,
        CLICKUP_FIELD_COMPANY_ID,
        CLICKUP_FIELD_ROLE_ID,
        CLICKUP_FIELD_PHONE_ID,
        CLICKUP_FIELD_COUNTRY_ID,
        CLICKUP_FIELD_POS_ID,
        CLICKUP_FIELD_LOCATIONS_ID,
        CLICKUP_FIELD_MESSAGE_ID,
      });
    }

    // Build task description
    const description = `
**Lead Information**
----------------
- **Name:** ${name}
- **Email:** ${email}
- **Company:** ${company}
- **Role:** ${role}
- **Country:** ${country}
- **Phone:** ${phone}
- **Number of Locations:** ${numberOfLocations}
- **Primary POS/System:** ${primaryPOS}

**Message:**
${message}

**Source Information**
----------------
- **CTA Label:** ${ctaLabel || 'Website Lead'}
- **Source Page:** ${sourcePage || 'Unknown'}
- **UTM Source:** ${utmSource || 'N/A'}
- **UTM Medium:** ${utmMedium || 'N/A'}
- **UTM Campaign:** ${utmCampaign || 'N/A'}

**Submitted:** ${new Date().toISOString()}
    `.trim();

    // Prepare ClickUp task payload
    const taskPayload: any = {
      name: `${ctaLabel || 'Website Lead'} – ${name}`,
      description,
      status: 'to do',
      priority: 3,
    };

    // Build custom fields array using resilient constants with fallbacks
    const customFields: { id: string; value: any }[] = [];
    
    // Lead Information Custom Fields
    if (CLICKUP_FIELD_FULL_NAME_ID && name) {
      customFields.push({ id: CLICKUP_FIELD_FULL_NAME_ID, value: name });
    }
    if (CLICKUP_FIELD_EMAIL_ID && email) {
      customFields.push({ id: CLICKUP_FIELD_EMAIL_ID, value: email });
    }
    if (CLICKUP_FIELD_COMPANY_ID && company) {
      customFields.push({ id: CLICKUP_FIELD_COMPANY_ID, value: company });
    }
    if (CLICKUP_FIELD_ROLE_ID && role) {
      customFields.push({ id: CLICKUP_FIELD_ROLE_ID, value: role });
    }
    // Phone: pass directly to text field (no normalization needed)
    if (CLICKUP_FIELD_PHONE_ID && phone) {
      customFields.push({ id: CLICKUP_FIELD_PHONE_ID, value: phone });
    }
    if (CLICKUP_FIELD_COUNTRY_ID && country) {
      customFields.push({ id: CLICKUP_FIELD_COUNTRY_ID, value: country });
    }
    if (CLICKUP_FIELD_POS_ID && primaryPOS) {
      customFields.push({ id: CLICKUP_FIELD_POS_ID, value: primaryPOS });
    }
    if (CLICKUP_FIELD_LOCATIONS_ID && numberOfLocations) {
      customFields.push({ id: CLICKUP_FIELD_LOCATIONS_ID, value: numberOfLocations });
    }
    if (CLICKUP_FIELD_MESSAGE_ID && message) {
      customFields.push({ id: CLICKUP_FIELD_MESSAGE_ID, value: message });
    }
    
    // Source Tracking Custom Fields (CTA/UTM)
    if (CLICKUP_CF_CTA_LABEL_ID && ctaLabel) {
      customFields.push({ id: CLICKUP_CF_CTA_LABEL_ID, value: ctaLabel });
    }
    if (CLICKUP_CF_SOURCE_PAGE_ID && sourcePage) {
      customFields.push({ id: CLICKUP_CF_SOURCE_PAGE_ID, value: sourcePage });
    }
    if (CLICKUP_CF_UTM_SOURCE_ID && utmSource) {
      customFields.push({ id: CLICKUP_CF_UTM_SOURCE_ID, value: utmSource });
    }
    if (CLICKUP_CF_UTM_MEDIUM_ID && utmMedium) {
      customFields.push({ id: CLICKUP_CF_UTM_MEDIUM_ID, value: utmMedium });
    }
    if (CLICKUP_CF_UTM_CAMPAIGN_ID && utmCampaign) {
      customFields.push({ id: CLICKUP_CF_UTM_CAMPAIGN_ID, value: utmCampaign });
    }

    // Add custom fields to payload only if we have any
    if (customFields.length > 0) {
      taskPayload.custom_fields = customFields;
    }

    // Log payload before sending (development only)
    if (process.env.NODE_ENV !== 'production') {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('CLICKUP FINAL TASK PAYLOAD (sanitized):');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Task Name:', taskPayload.name);
      console.log('Has Description:', !!taskPayload.description);
      console.log('Has Custom Fields:', !!taskPayload.custom_fields);
      console.log('Custom Fields Count:', taskPayload.custom_fields?.length || 0);
      console.log('Custom Fields Preview:', 
        (taskPayload.custom_fields || []).map((f: any) => ({
          id: f.id,
          value: typeof f.value === 'string' && f.value.length > 30 
            ? f.value.substring(0, 30) + '...' 
            : f.value,
        }))
      );
      console.log('API URL:', `https://api.clickup.com/api/v2/list/${listId}/task`);
      console.log('Has API Token:', !!apiToken);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }

    // Call ClickUp API
    try {
      const url = `https://api.clickup.com/api/v2/list/${listId}/task`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': apiToken!,
        },
        body: JSON.stringify(taskPayload),
      });

      const text = await response.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        // non-JSON body, leave json as null
      }

      if (!response.ok) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.error('CLICKUP API ERROR:');
          console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.error('Status:', response.status);
          console.error('Status Text:', response.statusText);
          console.error('Response Body:', text);
          console.error('Parsed JSON:', json);
          console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        }

        return NextResponse.json(
          {
            success: false,
            error: 'CLICKUP_API_ERROR',
            status: response.status,
            message: 'Failed to create task in ClickUp',
            details: process.env.NODE_ENV !== 'production' ? text : undefined,
          },
          { status: 500 }
        );
      }

      const clickupData = json || {};

      if (process.env.NODE_ENV !== 'production') {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('CLICKUP TASK CREATED SUCCESSFULLY:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Task ID:', clickupData.id);
        console.log('Task Name:', clickupData.name);
        console.log('Task URL:', clickupData.url);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      }

      return NextResponse.json({
        success: true,
        taskId: clickupData.id,
        taskUrl: clickupData.url,
      });
    } catch (err: any) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('CLICKUP REQUEST FAILED:');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('Error Message:', err?.message);
        console.error('Error Stack:', err?.stack);
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      }

      return NextResponse.json(
        {
          success: false,
          error: 'CLICKUP_REQUEST_FAILED',
          message: 'Failed to create task in ClickUp',
          details: process.env.NODE_ENV !== 'production' ? err?.message : undefined,
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing CTA submission:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
