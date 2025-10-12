"use client"

import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CourseCard from "./CourseCard"
import useEmblaCarousel from "embla-carousel-react"
import { fetchCourses } from "@/lib/courses"
import type { Course } from "@/lib/types"
import Link from "next/link"

const CoursesCarousel = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  })

  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchCourses()
      setCourses(data)
      setLoading(false)
    }
    loadCourses()
  }, [])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section id="courses" className="py-12 px-10 lg:px-20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Pelajari Kemampuan Baru
            </h2>
            <p className="text-muted-foreground">
              Kelas pendek untuk meningkatkan kemampuan bekerja Anda.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading courses...</p>
        ) : (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%]"
                >
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/protected/kelas">
            <Button variant="outline" size="lg" className="rounded-xl font-medium">
              Lihat Semua Kelas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CoursesCarousel
