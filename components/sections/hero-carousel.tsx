"use client"

import { useState, useEffect ,useCallback} from "react"

import { useParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import useSWR from 'swr';
import { useTranslations } from 'next-intl';


// const slides = [
//   {
//     id: 1,
//     title: "Expert Legal Consultation",
//     description:
//       "Providing comprehensive legal advice and consultation services with over 20 years of experience in corporate law, litigation, and legal compliance.",
//   },
//   {
//     id: 2,
//     title: "Corporate Law Excellence",
//     description:
//       "Specialized in corporate governance, mergers and acquisitions, and business restructuring to help your company navigate complex legal landscapes.",
//   },
//   {
//     id: 3,
//     title: "International Legal Services",
//     description:
//       "Cross-border legal expertise for multinational corporations, foreign investments, and international trade agreements with proven success.",
//   },
//   {
//     id: 4,
//     title: "Litigation & Defense",
//     description:
//       "Strong courtroom representation and strategic defense in commercial disputes, contract negotiations, and regulatory compliance matters.",
//   },
//   {
//     id: 5,
//     title: "Vision 2030 Compliance",
//     description:
//       "Supporting businesses in aligning with Saudi Arabia's Vision 2030 initiatives through specialized legal guidance and regulatory compliance.",
//   },
// ]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const params = useParams(); // 2. Get URL params
  const locale = params.locale;

  const t = useTranslations()
  

  const fetcher = (url: string) => fetch(url).then(res => res.json());

  
  const { data, error, isLoading } = useSWR(() => locale ? `/${locale}/api/hero-slides` : null, fetcher);



  const slides = data?.data || [];
  console.log("Strapi Data Received:", JSON.stringify(slides, null, 2)); // This will print the data nicely formatted


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
    console.log('Fetched slides:', slides);
     console.log('Current slide data:', slides[currentSlide]);
  }, [nextSlide, slides.length]);

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 1) % slides.length)
  // }

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  // }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

 const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  // This is a safer way to access nested properties
  const image = slides[currentSlide]?.image?.[0];
  const imageUrlPath = image?.formats?.small?.url || image?.url; // Use small if available

  
  const imageUrl = imageUrlPath 
    ? `${strapiUrl}${imageUrlPath}` 
    : '/placeholder.jpg'; 
  
 if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
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
