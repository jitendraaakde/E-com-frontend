import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const banners = [
  { id: 1, image: '/placeholder.svg?height=600&width=1200', alt: 'Promotion 1' },
  { id: 2, image: '/placeholder.svg?height=600&width=1200', alt: 'Promotion 2' },
  { id: 3, image: '/placeholder.svg?height=600&width=1200', alt: 'Promotion 3' },
]

export default function HeroSection() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentBanner * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="w-full h-[60vh] flex-shrink-0 relative"
          >
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevBanner}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
      >
        <FaChevronLeft className="text-2xl text-gray-800" />
      </button>
      <button
        onClick={nextBanner}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all duration-300"
      >
        <FaChevronRight className="text-2xl text-gray-800" />
      </button>
    </div>
  )
}