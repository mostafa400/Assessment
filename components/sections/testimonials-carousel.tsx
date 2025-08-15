

"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import useSWR from 'swr'
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useTranslations } from 'next-intl';

export default function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const params = useParams()
  const locale = params.locale
  const t = useTranslations()

  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR(() => locale ? `/${locale}/api/testimonials` : null, fetcher)
  const testimonials = data?.data || []

  const nextSlide = () => {
    if (testimonials.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }
  }

  const prevSlide = () => {
    if (testimonials.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
  }

  useEffect(() => {
    if (testimonials.length > 1) {
      const timer = setInterval(nextSlide, 6000)
      return () => clearInterval(timer)
    }
  }, [testimonials.length, nextSlide])

  if (error) return <div className="text-center py-20 text-white">Failed to load testimonials.</div>
  if (isLoading) return <div className="text-center py-20 text-white">Loading testimonials...</div>
  if (testimonials.length === 0) return <div className="text-center py-20 text-white">No testimonials found.</div>

  const currentTestimonial = testimonials[currentSlide];
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const imageUrlPath = currentTestimonial?.image?.[0]?.formats?.small?.url || currentTestimonial?.image?.[0]?.url;
  const imageUrl = imageUrlPath ? `${strapiUrl}${imageUrlPath}` : '/placeholder.svg';

  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#643F2E" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header with RTL support */}
        <div className="mb-16 text-start">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('TestimonialsSection.title')}</h2>
          <p className="text-lg text-gray-300 max-w-3xl">
            {t('TestimonialsSection.description')}
          </p>
        </div>

        {/* Grid with RTL support */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Image (order will be flipped on RTL) */}
          <div className="flex justify-center md:justify-start rtl:md:justify-end md:order-1 rtl:md:order-2">
            <div className="w-80 h-96 relative rounded-lg overflow-hidden" style={{ backgroundColor: "#8B5A3C" }}>
              <Image
                src={imageUrl}
                alt={currentTestimonial.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Testimonial Text (order will be flipped on RTL) */}
          <div className="space-y-8 md:order-2 rtl:md:order-1 text-start">
            <div className="relative">
              <div className="text-6xl text-gray-400 absolute -top-4 start-[-1rem]">"</div>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed ps-8">
                {currentTestimonial.quote}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{currentTestimonial.name}</h3>
              <p className="text-lg text-gray-400">{currentTestimonial.position}</p>
            </div>
          </div>
        </div>

        {/* Navigation with RTL support */}
        <div className="flex justify-end rtl:justify-start space-x-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  )
}
