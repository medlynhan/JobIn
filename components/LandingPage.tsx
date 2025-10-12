import { Button } from "@/components/ui/button";
import { Briefcase, BookOpen, Mic } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import Link from "next/link";

const LandingPage = () => {
  return (
    //landing page
    <section className="relative overflow-hidden gradient-subtle py-20 md:py-32 px-10 lg:px-20">
      <div className="absolute z-10 top-5 left-5 flex gap-2 ">
        <img src="/logo.png" alt="logo" className="object-cover h-6 w-6" />
        <span className="font-bold text-xl text-foreground">JobIn</span>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
              Tanpa  Halangan,
              <br />
              <span className="text-primary">Semua Bisa Bekerja.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Temukan peluang baru dan kembangkan keterampilan di platform yang dirancang untuk pekerja informal.
            </p>

            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/login" className="">
                <Button size="lg" className="w-full text-base h-14 px-8 rounded-xl gradient-blue hover:opacity-90 transition-smooth">
                    Login
                </Button>
              </Link>
              <Link href="/role" className="">
                <Button size="lg" variant="outline" className="w-full text-base h-14 px-8 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth">
                  Daftar
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-3 pt-4 text-muted-foreground">
              <Mic className="w-5 h-5 text-primary" />
              <span className="text-sm">Voice assistance available - just ask!</span>
            </div>
          </div>
          
          <div className="relative animate-in fade-in slide-in-from-right duration-700  h-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full">
              <img 
                src="/hero.png"
                alt="Happy informal workers learning and working"
                className=" h-full w-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
