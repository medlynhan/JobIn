"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

// import constructionCourse from "@/assets/construction-course.png";
// import repairCourse from "@/assets/repair-course.png";
// import sewingCourse from "@/assets/sewing-course.png";
// import etiquetteCourse from "@/assets/etiquette-course.png";
// import englishCourse from "@/assets/english-course.png";

const courses = [
  {
    title: "Basic Construction Skills",
    duration: "2 weeks",
    level: "Beginner",
    image: "/construction-course.png",
  },
  {
    title: "Motorcycle Repair",
    duration: "3 weeks",
    level: "Beginner",
    image: "/repair-course.png",
  },
  {
    title: "Sewing for Beginners",
    duration: "4 weeks",
    level: "Beginner",
    image: "/sewing-course.png",
  },
  {
    title: "Workplace Etiquette",
    duration: "1 week",
    level: "Beginner",
    image: "/etiquette-course.png",
  },
  {
    title: "English for Workers",
    duration: "6 weeks",
    level: "Beginner",
    image: "/english-course.png",
  },
];

const CoursesCarousel = () => {
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
    <section id="courses" className="py-12  px-10 lg:px-20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Pelajari Kemampuan Baru</h2>
            <p className="text-muted-foreground">Kelas pendek untuk meningkatkan kemampuan bekerja Anda.</p>
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
            {courses.map((course, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_25%]">
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" className="rounded-xl font-medium">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesCarousel;
