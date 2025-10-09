'use client';
import { useState, useEffect } from "react";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingVoiceButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={`fixed bottom-8 right-8 h-16 w-16 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all duration-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
        }`}
        aria-label="Voice Assistant"
      >
        <Mic className="h-6 w-6 text-primary-foreground" />
      </Button>

      {showPopup && (
        <div
          className={`fixed bottom-28 right-8 bg-card border border-border rounded-lg shadow-lg p-4 animate-fade-in`}
        >
          <p className="text-sm text-foreground font-medium">
            Speak now – how can I help you? 🎙️
          </p>
        </div>
      )}
    </>
  );
};

export default FloatingVoiceButton;
