import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Log environment variable status (for debugging)
  console.log('CLICKUP_ENV_STATUS', {
    hasToken: !!process.env.CLICKUP_API_TOKEN,
    hasListId: !!process.env.CLICKUP_LIST_ID,
  });

  try {
    // Parse request body
    const body = await request.json();
    const {
      name,
      email,
      company,
      role,
      phone,
      message,
      ctaLabel,
      sourcePage,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Read environment variables
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

    // Build task description
    const description = `
**Lead Information**
- **Name:** ${name}
- **Email:** ${email}
- **Company:** ${company || 'N/A'}
- **Role:** ${role || 'N/A'}
- **Phone:** ${phone || 'N/A'}

**Message:**
${message || 'No message provided'}

**Source Information**
- **CTA Label:** ${ctaLabel || 'Website Lead'}
- **Source Page:** ${sourcePage || 'Unknown'}
- **UTM Source:** ${utmSource || 'N/A'}
- **UTM Medium:** ${utmMedium || 'N/A'}
- **UTM Campaign:** ${utmCampaign || 'N/A'}
    `.trim();

    // Prepare ClickUp task payload
    const taskPayload: any = {
      name: `${ctaLabel || 'Website Lead'} – ${name}`,
      description,
      status: 'to do',
      priority: 3,
    };

    // Add custom fields if environment variables exist
    const customFields: any[] = [];
    
    if (process.env.CLICKUP_CF_CTA_LABEL) {
      customFields.push({
        id: process.env.CLICKUP_CF_CTA_LABEL,
        value: ctaLabel || 'Book a Demo',
      });
    }
    
    if (process.env.CLICKUP_CF_SOURCE_PAGE) {
      customFields.push({
        id: process.env.CLICKUP_CF_SOURCE_PAGE,
        value: sourcePage || 'Unknown',
      });
    }
    
    if (process.env.CLICKUP_CF_UTM_SOURCE) {
      customFields.push({
        id: process.env.CLICKUP_CF_UTM_SOURCE,
        value: utmSource || 'N/A',
      });
    }
    
    if (process.env.CLICKUP_CF_UTM_MEDIUM) {
      customFields.push({
        id: process.env.CLICKUP_CF_UTM_MEDIUM,
        value: utmMedium || 'N/A',
      });
    }
    
    if (process.env.CLICKUP_CF_UTM_CAMPAIGN) {
      customFields.push({
        id: process.env.CLICKUP_CF_UTM_CAMPAIGN,
        value: utmCampaign || 'N/A',
      });
    }

    if (customFields.length > 0) {
      taskPayload.custom_fields = customFields;
    }

    // Log payload before sending (development only)
    if (process.env.NODE_ENV !== 'production') {
      console.log('CLICKUP PAYLOAD (sanitized):', {
        taskName: taskPayload.name,
        hasCustomFields: !!taskPayload.custom_fields,
        customFieldsCount: taskPayload.custom_fields?.length || 0,
        customFields: taskPayload.custom_fields?.map((f: any) => ({
          id: f.id,
          value: f.value,
        })),
      });
    }

    // Call ClickUp API
    const clickupResponse = await fetch(
      `https://api.clickup.com/api/v2/list/${listId}/task`,
      {
        method: 'POST',
        headers: {
          'Authorization': apiToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskPayload),
      }
    );

    if (!clickupResponse.ok) {
      const errorData = await clickupResponse.text();
      console.error('ClickUp API error:', errorData);
      return NextResponse.json(
        { success: false, error: 'Failed to create task in ClickUp' },
        { status: 500 }
      );
    }

    const clickupData = await clickupResponse.json();

    return NextResponse.json({
      success: true,
      taskId: clickupData.id,
    });

  } catch (error) {
    console.error('Error processing CTA submission:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
