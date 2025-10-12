import Header from "@/components/Header";
import Hero from "@/components/Hero"; // Pastikan import ini bersih
import JobsCarousel from "@/components/JobsCarousel";
import CoursesCarousel from "@/components/CoursesCarousel";
import Recommendations from "@/components/Recommendations";
import Footer from "@/components/Footer";
export default function BerandaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <JobsCarousel />
        <CoursesCarousel />
        <Recommendations />
      </main>
      <Footer />
    </div>
  );
}