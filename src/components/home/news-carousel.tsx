"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getStrapiMedia } from "@/lib/strapi"

interface NewsCarouselProps {
  articles: any[]
}

export default function NewsCarousel({ articles }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const totalSlides = articles.length
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate visible slides
  const getVisibleSlides = () => {
    if (totalSlides <= 3) return articles

    // Create a circular array for smooth infinite scrolling
    const visibleSlides = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalSlides
      visibleSlides.push(articles[index])
    }
    return visibleSlides
  }

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  // Set up auto-rotation
  useEffect(() => {
    if (totalSlides <= 3) return // Don't auto-rotate if we have 3 or fewer slides

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentIndex, isPaused, totalSlides])

  // Pause rotation on hover
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  // If no articles, show placeholder
  if (totalSlides === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">暫無優先新聞</p>
      </div>
    )
  }

  const visibleSlides = getVisibleSlides()

  return (
    <div className="relative py-8" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex items-center justify-center gap-4 md:gap-8">
        {totalSlides > 3 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 z-10 rounded-full bg-white/80 shadow-md"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </Button>
        )}

        <div className="flex items-center justify-center gap-4 md:gap-8 overflow-hidden">
          {visibleSlides.map((article, idx) => {
            const isCenter = idx === 1
            const imageUrl = getStrapiMedia(article.heading?.coverImage?.data?.url)
            const publishDate = new Date(article.publishDate)

            return (
              <div
                key={article.id}
                className={`transition-all duration-500 ${
                  isCenter ? "w-full md:w-[400px] md:scale-110 z-10" : "w-full md:w-[300px] opacity-70"
                }`}
              >
                <Link href={`/news/${article.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                    <div className={`aspect-w-16 aspect-h-9 relative ${isCenter ? "md:aspect-h-8" : ""}`}>
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={article.heading.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500 mb-2">{publishDate.toLocaleDateString("zh-HK")}</div>
                      <h3
                        className={`font-medium text-gray-900 mb-2 line-clamp-2 ${isCenter ? "text-lg" : "text-base"}`}
                      >
                        {article.heading.title}
                      </h3>
                      {isCenter && (
                        <p className="text-gray-600 text-sm line-clamp-2">{article.heading.summary || ""}</p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </div>
            )
          })}
        </div>

        {totalSlides > 3 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 z-10 rounded-full bg-white/80 shadow-md"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </Button>
        )}
      </div>

      {/* Pagination indicators */}
      {totalSlides > 3 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "w-6 bg-red-800" : "w-2 bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
