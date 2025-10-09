"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobCard from "./JobCard";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

// import paintJob from "@/assets/paint-job.png";
// import cleaningJob from "@/assets/cleaning-job.png";
// import gardeningJob from "@/assets/gardening-job.png";

const recommendedJobs = [
  {
    title: "House Painter",
    location: "South Jakarta",
    pay: "Rp 180,000 - 250,000/day",
    image: "/paint-job.png",
  },
  {
    title: "Office Cleaning",
    location: "Central Jakarta",
    pay: "Rp 90,000 - 140,000/day",
    image: "/cleaning-job.png",
  },
  {
    title: "Gardening Service",
    location: "West Jakarta",
    pay: "Rp 100,000 - 160,000/day",
    image: "/gardening-job.png",
  },
];

const Recommendations = () => {
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
    <section className="py-12 bg-secondary/30  px-10 lg:px-20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Jobs That Match You</h2>
            <p className="text-muted-foreground">Personalized recommendations based on your profile.</p>
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
            {recommendedJobs.map((job, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%]">
                <JobCard {...job} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
