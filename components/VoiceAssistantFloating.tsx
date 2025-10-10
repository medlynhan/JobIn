"use client";

import { useEffect, useRef, useState } from "react";
import { createSpeechConfig, recognizeOnce, speak, parseIntent, VAStatus } from "@/lib/voice";
import { Mic, Square, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VoiceAssistantFloating() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<VAStatus>("idle");
  const loopRef = useRef<boolean>(false);
  const busyRef = useRef<boolean>(false);

  useEffect(() => {
    loopRef.current = enabled;
    if (!enabled) return;
    let cancelled = false;
    (async function runLoop() {
      const cfg = createSpeechConfig();
      if (!cfg) {
        setStatus("error");
        return;
      }
      while (loopRef.current && !cancelled) {
        try {
          setStatus("listening");
          const text = await recognizeOnce(cfg);
          if (!loopRef.current || cancelled) break;
          if (!text) continue;
          if (busyRef.current) continue;
          busyRef.current = true;

          const intent = parseIntent(text);
          if (intent?.back) {
            setStatus("speaking");
            await speak(cfg, intent.announce || "Kembali");
            router.back();
            busyRef.current = false;
            continue;
          }
          if (intent?.navigateTo) {
            setStatus("speaking");
            await speak(cfg, intent.announce || "Membuka halaman");
            router.push(intent.navigateTo);
            busyRef.current = false;
            continue;
          }

          setStatus("thinking");
          const res = await fetch("/api/ai/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: text, locale: "id-ID" }),
          });
          const json = await res.json();
          const assistant = (json?.text as string) || "";
          setStatus("speaking");
          await speak(cfg, assistant || "Baik, ada yang bisa saya bantu?");
        } catch {
          setStatus("error");
        } finally {
          busyRef.current = false;
          if (loopRef.current) setStatus("idle");
        }
      }
    })();
    return () => {
      cancelled = true;
      loopRef.current = false;
      setStatus("idle");
    };
  }, [enabled, router]);

  const listening = status === "listening";
  const thinking = status === "thinking";
  const speaking = status === "speaking";

  const readCurrentPage = async () => {
    const cfg = createSpeechConfig();
    if (!cfg) return;
    try {
      const main = document.querySelector("main") || document.body;
      const title = (document.title || "").trim();
      const raw = (main?.textContent || "").replace(/\s+/g, " ").trim();
      if (!raw) {
        await speak(cfg, "Halaman ini tidak memiliki teks untuk dibacakan.");
        return;
      }

      // Read literally: title first, then body in chunks
      const textToRead = `${title ? `${title}. ` : ""}${raw}`;
      const MAX_CHUNK = 800; // keep chunks small for stable TTS
      const chunks: string[] = [];
      // Try splitting by sentence boundaries near the limit
      let i = 0;
      while (i < textToRead.length) {
        let end = Math.min(i + MAX_CHUNK, textToRead.length);
        if (end < textToRead.length) {
          const slice = textToRead.slice(i, end);
          const lastPunct = Math.max(slice.lastIndexOf("."), slice.lastIndexOf("!"), slice.lastIndexOf("?"));
          if (lastPunct > 100) end = i + lastPunct + 1; // finish at a sentence end if reasonable
        }
        chunks.push(textToRead.slice(i, end).trim());
        i = end;
      }

      // Optionally cap very long readings (e.g., first ~5000 chars)
      let spoken = 0;
      for (const part of chunks) {
        if (!part) continue;
        setStatus("speaking");
        await speak(cfg, part);
        spoken += part.length;
        if (spoken > 5000) break; // prevent excessively long sessions for now
      }
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  };

  const stopAll = () => {
    loopRef.current = false;
    setEnabled(false);
    setStatus("idle");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="bg-white shadow-lg rounded-xl p-3 flex items-center gap-2 border">
        <button
          onClick={() => setEnabled((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
            enabled ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
          }`}
          aria-pressed={enabled}
        >
          <Mic className="h-4 w-4" />
          {enabled ? (listening ? "Mendengar…" : thinking ? "Berpikir…" : speaking ? "Membacakan…" : "Siap") : "Aktifkan"}
        </button>
        <button
          onClick={() => readCurrentPage()}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-muted"
        >
          <BookOpen className="h-4 w-4" /> Bacakan halaman
        </button>
        <button
          onClick={stopAll}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-muted"
        >
          <Square className="h-4 w-4" /> Hentikan
        </button>
      </div>
    </div>
  );
}
