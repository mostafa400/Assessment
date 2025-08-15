
import HomePageClient from '@/components/home-page-client';
import React from 'react';
import  '@/styles/globals.css';


async function getHeroSlides(locale: string) {
  const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
  const apiToken = process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!strapiUrl || !apiToken) {
    throw new Error('Strapi URL or API token is not defined');
  }

  const res = await fetch(`${strapiUrl}/api/hero-slides?locale=${locale}&publicationState=live&populate=*&sort=order:asc`, {
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${apiToken}`
    }
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data.data || [];
}


export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const slides = await getHeroSlides(locale);


  return <HomePageClient slides={slides} />;
}
