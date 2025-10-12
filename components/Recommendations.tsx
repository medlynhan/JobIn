"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JobCard } from "./JobCard"
import { fetchJobs } from "@/lib/jobs"
import useEmblaCarousel from "embla-carousel-react"

export default function Recommendations({ label = "Sekitar Anda" }) {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" })

  useEffect(() => {
    fetchJobs()
      .then((data) => setJobs(data))
      .finally(() => setLoading(false))
  }, [])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <section id="jobs" className="py-12 bg-background px-10 lg:px-20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Lihat Pekerjaan Lainnya
            </h2>
            <p className="text-muted-foreground">
              Yuk, Kepoin pekerjaan informal lainnya !</p>
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
          <p className="text-center text-muted-foreground">Memuat pekerjaan...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Tidak ada pekerjaan di dekat Anda.
          </p>
        ) : (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%]"
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/protected/pekerjaan">
            <Button variant="outline" size="lg" className="rounded-xl font-medium">
              Lihat Semua Pekerjaan
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
