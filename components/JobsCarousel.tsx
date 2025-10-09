"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobCard from "./JobCard";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

// import constructionJob from "@/assets/construction-job.png";
// import driverJob from "@/assets/driver-job.png";
// import tailorJob from "@/assets/tailor-job.png";
// import housekeeperJob from "@/assets/housekeeper-job.png";
// import vendorJob from "@/assets/vendor-job.png";

const jobs = [
  {
    title: "Construction Worker",
    location: "South Jakarta",
    pay: "Rp 150,000 - 200,000/day",
    image: "/construction-job.png",
  },
  {
    title: "Online Driver",
    location: "Central Jakarta",
    pay: "Rp 100,000 - 250,000/day",
    image: "/driver-job.png",
  },
  {
    title: "Tailor",
    location: "East Jakarta",
    pay: "Rp 120,000 - 180,000/day",
    image: "/tailor-job.png",
  },
  {
    title: "Housekeeper",
    location: "West Jakarta",
    pay: "Rp 80,000 - 150,000/day",
    image: "/housekeeper-job.png",
  },
  {
    title: "Street Vendor",
    location: "North Jakarta",
    pay: "Rp 100,000 - 300,000/day",
    image: "/vendor-job.png",
  },
];

const JobsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="jobs" className="py-12 bg-secondary/30  px-10 lg:px-20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Jobs Near You</h2>
            <p className="text-muted-foreground">Find informal work opportunities around your location.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {jobs.map((job, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%]">
                <JobCard {...job} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" className="rounded-xl font-medium">
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobsCarousel;
