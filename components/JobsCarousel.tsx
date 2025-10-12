"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "./JobCard";
import useEmblaCarousel from "embla-carousel-react";
import { fetchJobs } from "@/lib/jobs";
import type { Job } from "@/lib/types";
import { useUserLocation } from "@/hooks/useUserLocation"; // your hook
import Link from "next/link";

const JobsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, slidesToScroll: 1 });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const { label, status } = useUserLocation(); // your hook

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  // Filter jobs by exact city match
  const nearbyJobs =
    label && label !== "Di dekat Anda"
      ? jobs.filter((job) => {
          const jobCity = job.location.split(",")[0].trim().toLowerCase();
          return jobCity === label.toLowerCase();
        })
      : jobs;

  return (
    <section id="jobs" className="py-12 bg-background px-10 lg:px-20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Pekerjaan di {label}
            </h2>
            <p className="text-muted-foreground">
              Temukan pekerjaan informal di sekitar lokasi Anda.
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
          <p className="text-center text-muted-foreground">Memuat pekerjaan...</p>
        ) : nearbyJobs.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Tidak ada pekerjaan di dekat Anda.
          </p>
        ) : (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {nearbyJobs.map((job) => (
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
            Lihat Semua
          </Button>
        </Link>
      </div>
      </div>
    </section>
  );
};

export default JobsCarousel;
