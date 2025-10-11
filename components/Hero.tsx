import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image, { type StaticImageData } from "next/image";
import VoiceAssistantButton from "@/components/VoiceAssistantFloating";

const Hero = () => {
  return (
    <section className="container py-12 md:py-20  px-10 lg:px-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Search */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            <span className="text-primary">Mari kita mulai!</span><br />
            Cari pekerjaan yang cocok dengan Anda.
          </h1>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Contoh: pekerja bangunan, supir, tukang AC..."
                className="pl-12 pr-4 py-6 text-base rounded-xl border-2 focus:border-primary"
              />
            </div>
            <Button size="lg" className="w-full rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
              Cari Sekarang
            </Button>
          </div>
        </div>

        {/* Right Column - vAI Assistant */}
        <div className="relative">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 shadow-lg">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <img
                  src= "/maskot-AI.png"
                  alt="vAI Voice Assistant"
                  className="w-48 h-48 rounded-full shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium shadow-md">
                  AI
                </div>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-md">
                <p className="text-lg font-medium text-foreground mb-1">
                  Hi, Aku Jobi 👋
                </p>
                <p className="text-muted-foreground">
                  Apa yang bisa aku bantu ?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
