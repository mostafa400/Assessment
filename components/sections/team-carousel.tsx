
"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import useSWR from 'swr'
import { ChevronLeft, ChevronRight, Phone, Mail, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useTranslations } from 'next-intl';

export default function TeamCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const params = useParams()
  const locale = params.locale
  const t = useTranslations()


  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR(() => locale ? `/${locale}/api/team-members` : null, fetcher)
  const teamMembers = data?.data || []

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2) // Added a tablet breakpoint
      } else {
        setItemsPerView(3)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // --- HERO CAROUSEL MECHANISM ---
  const nextSlide = useCallback(() => {
    if (teamMembers.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % teamMembers.length)
    }
  }, [teamMembers.length])

  const prevSlide = useCallback(() => {
    if (teamMembers.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
    }
  }, [teamMembers.length])


  if (error) return <div className="text-center py-16 text-red-500">Failed to load team members.</div>
  if (isLoading) return <div className="text-center py-16">Loading team...</div>
  if (teamMembers.length === 0) return <div className="text-center py-16">No team members found.</div>

  // --- CALCULATE VISIBLE ITEMS ---
  const visibleMembers = [];
  for (let i = 0; i < itemsPerView; i++) {
    const memberIndex = (currentSlide + i) % teamMembers.length;
    visibleMembers.push(teamMembers[memberIndex]);
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: "#643F2E" }}>{t('TeamSection.title')} </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t('TeamSection.description')}...</p>
        </div>

        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute start-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            style={{ color: "#643F2E" }}
          >
            <ChevronRight size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute end-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            style={{ color: "#643F2E" }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* RENDER ONLY VISIBLE ITEMS */}
          <div className="overflow-hidden mx-12">
            <div className="flex">
              {visibleMembers.map((member: any) => {
                const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
                const imageUrlPath = member.image?.[0]?.formats?.small?.url || member.image?.[0]?.url;
                const imageUrl = imageUrlPath ? `${strapiUrl}${imageUrlPath}` : '/placeholder.svg';

                return (
                  <div key={member.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="relative h-80" style={{ backgroundColor: "#643F2E" }}>
                        <Image src={imageUrl} alt={member.name} fill className="object-cover object-center" />
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-semibold mb-2" style={{ color: "#643F2E" }}>{member.name}</h3>
                        <p className="text-gray-500 uppercase tracking-wide text-sm mb-4">{member.position}</p>
                        <div className="flex justify-center space-x-4">
                          <div className="p-2 rounded-full" style={{ color: "#643F2E" }}>
                           <MessageCircle size={20} />
                          </div>
                          <div className="p-2 rounded-full" style={{ color: "#643F2E" }}>
                            <Phone size={20} />
                          </div>
                          <div className="p-2 rounded-full" style={{ color: "#643F2E" }}>
                            <Mail size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
