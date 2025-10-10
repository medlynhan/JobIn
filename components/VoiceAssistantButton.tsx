"use client";

import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createSpeechConfig, recognizeOnce, speak, parseIntent, VAStatus } from "@/lib/voice";
import { useRouter } from "next/navigation";

export default function VoiceAssistantButton() {
  const router = useRouter();
  const [status, setStatus] = useState<VAStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const listening = status === "listening";
  const thinking = status === "thinking";
  const speakingNow = status === "speaking";

  const start = async () => {
    const cfg = createSpeechConfig();
    if (!cfg) {
      setStatus("error");
      setReply("Konfigurasi suara tidak ditemukan. Setel NEXT_PUBLIC_AZURE_SPEECH_KEY dan NEXT_PUBLIC_AZURE_SPEECH_REGION pada .env.");
      return;
    }
    setStatus("listening");
    setTranscript("");
    setReply("");
    const text = await recognizeOnce(cfg);
    if (!text) {
      setStatus("idle");
      setReply("Maaf, saya tidak mendengar dengan jelas. Coba lagi.");
      await speak(cfg, "Maaf, saya tidak mendengar dengan jelas. Coba lagi.");
      return;
    }
    setTranscript(text);

    // Quick routing intents
    const intent = parseIntent(text);
    if (intent?.back) {
      setStatus("speaking");
      await speak(cfg, intent.announce || "Kembali");
      router.back();
      setStatus("idle");
      return;
    }
    if (intent?.navigateTo) {
      setStatus("speaking");
      await speak(cfg, intent.announce || "Membuka halaman");
      router.push(intent.navigateTo);
      setStatus("idle");
      return;
    }

    setStatus("thinking");
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text, locale: "id-ID" }),
    });
    const json = await res.json();
    const assistant = (json?.text as string) || "";
    setReply(assistant);
    setStatus("speaking");
    await speak(cfg, assistant || "Baik, ada yang bisa saya bantu?");
    setStatus("idle");
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <Button
        size="lg"
        variant="default"
        className="gap-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all bg-accent hover:bg-accent/90"
        onClick={start}
        disabled={listening || thinking || speakingNow}
        aria-live="polite"
      >
        <Mic className="h-5 w-5" />
        {listening ? "Mendengarkan…" : thinking ? "Berpikir…" : speakingNow ? "Membacakan…" : "Coba Bicara"}
      </Button>

      {(transcript || reply) && (
        <div className="text-sm text-muted-foreground max-w-sm">
          {transcript && <p><span className="font-semibold">Anda:</span> {transcript}</p>}
          {reply && <p><span className="font-semibold">Jobi:</span> {reply}</p>}
        </div>
      )}
    </div>
  );
}
