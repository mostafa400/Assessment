"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroCarousel from "@/components/sections/hero-carousel";
import TeamCarousel from "@/components/sections/team-carousel";
import TestimonialsCarousel from "@/components/sections/testimonials-carousel";
import { useTranslations } from 'next-intl';
import React from 'react';

// Define the type for a slide
interface Slide {
  id: number;
  title: string;
  Description: string;
  image: {
    url: string;
    formats?: {
      small?: {
        url: string;
      }
    }
  }[];
}

export default function HomePageClient({ slides }: { slides: Slide[] }) {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden">
        <div
          className="h-screen bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: "url('/images/hero-cityscape.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="relative ">
            <Header />
          </div>

          <div className="relative  h-full pt-20">
            <HeroCarousel slides={slides} />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <TeamCarousel />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Footer */}
      <Footer />
    </div>
  );
}
