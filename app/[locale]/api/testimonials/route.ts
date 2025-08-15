import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { locale: string } }) {

     const locale = params.locale; 


  try {
    const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
    const apiToken = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    
    if (!strapiUrl) {
      throw new Error('Strapi URL environment variable is not defined');
    }
    if (!apiToken) {
      throw new Error('Strapi API token is not defined');
    }

    const res = await fetch(`${strapiUrl}/api/testimonials?locale=${locale}&publicationState=live&populate=*&sort=order:asc`, {
      cache: 'no-store', 
      headers: {
        'Authorization': `Bearer ${apiToken}`
      }
    });

    if (!res.ok) {
      throw new Error(`Strapi request failed with status ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    const error = err as Error;
    console.error('Error details:', {
      message: error.message,
      strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
      status: (error as any).status,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        error: 'Failed to fetch testimonials ',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
