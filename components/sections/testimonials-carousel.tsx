"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    quote:
      "With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.",
    name: "Mohammed Saif",
    position: "CEO/Company",
    image: "/images/person-headshot.png",
  },
  {
    id: 2,
    quote:
      "The legal expertise and professionalism demonstrated by the team exceeded our expectations. Their attention to detail and commitment to our case was remarkable. We felt confident throughout the entire process.",
    name: "Ahmed Al-Rashid",
    position: "Managing Director",
    image: "/images/person-headshot.png",
  },
  {
    id: 3,
    quote:
      "Outstanding service and legal guidance. The team's deep understanding of corporate law helped us navigate complex regulations with ease. Highly recommended for any business legal needs.",
    name: "Fatima Al-Zahra",
    position: "Business Owner",
    image: "/images/person-headshot.png",
  },
  {
    id: 4,
    quote:
      "Professional, reliable, and results-driven. The legal consultation provided was comprehensive and tailored to our specific requirements. The team's expertise in international law is exceptional.",
    name: "Omar Hassan",
    position: "Investment Manager",
    image: "/images/person-headshot.png",
  },
  {
    id: 5,
    quote:
      "Exceptional legal services with a personal touch. The team's dedication to client satisfaction and their thorough approach to legal matters sets them apart from other firms.",
    name: "Layla Abdullah",
    position: "Corporate Executive",
    image: "/images/person-headshot.png",
  },
]

export default function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#643F2E" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What our clients are saying</h2>
          <p className="text-lg text-gray-300 max-w-3xl">
            Our clients range from individual investors, to local, international as well as fortune 500 companies. Our
            clients range from individual investors, to local, international as well as fortune 500 companies.
          </p>
        </div>

        {/* Testimonial Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Client Image */}
          <div className="flex justify-center md:justify-start">
            <div className="w-80 h-96 relative rounded-lg overflow-hidden" style={{ backgroundColor: "#8B5A3C" }}>
              <Image
                src={testimonials[currentSlide].image || "/placeholder.svg"}
                alt={testimonials[currentSlide].name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Testimonial Text */}
          <div className="space-y-8">
            <div className="relative">
              <div className="text-6xl text-gray-400 absolute -top-4 -left-4">"</div>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed pl-8">
                {testimonials[currentSlide].quote}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{testimonials[currentSlide].name}</h3>
              <p className="text-lg text-gray-400">{testimonials[currentSlide].position}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  )
}
