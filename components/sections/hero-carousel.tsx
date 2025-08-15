"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useTranslations } from 'next-intl';

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


export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const t = useTranslations()

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

  const image = slides[currentSlide]?.image?.[0];
  const imageUrlPath = image?.formats?.small?.url || image?.url;

  const imageUrl = imageUrlPath
    ? `${strapiUrl}${imageUrlPath}`
    : '/placeholder.jpg';

  // 2. Remove the loading and error states, as data is now pre-fetched
  if (!slides || slides.length === 0) {
    return <div>No slides available</div>;
  }

  return (
    <div className="relative h-full flex items-center">
      {/* Left Navigation Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-8 z-20 p-2 text-white hover:text-gray-300 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={40} />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-8 z-20 p-2 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronRight size={40} />
      </button>

      {/* Main Content */}
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="text-white space-y-6">
            {/* Pagination Dots */}
            <div className="flex space-x-3 mb-8">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white" : "bg-white bg-opacity-40 hover:bg-opacity-60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Slide Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{slides[currentSlide]?.title}</h1>
              <p className="text-lg md:text-xl leading-relaxed max-w-lg">{slides[currentSlide]?.Description}</p>
              <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
               {t('Buttons.loadMore')}
              </button>
            </div>
          </div>

          {/* Right Content - Person Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-lg transform rotate-3"
                style={{ backgroundColor: "#643F2E" }}
              ></div>
              {/* Person Image */}
              <div
                className="relative rounded-lg p-4 transform -rotate-1 shadow-2xl"
                style={{ backgroundColor: "#643F2E" }}
              >
                <Image
                 src={imageUrl}
                  alt={slides[currentSlide]?.title || 'Professional lawyer'}
                  width={400}
                  height={500}
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
