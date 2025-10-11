"use client";

import { useEffect, useRef, useState } from "react";
import { createSpeechConfig, recognizeOnce, speak, parseIntent, VAStatus } from "@/lib/voice";
import { Mic, Square } from "lucide-react";
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

          // Voice command: summarize current page
          const lower = text.toLowerCase();
          const wantsSummary =
            lower.includes("bacakan halaman") ||
            lower.includes("tolong bacakan halaman") ||
            lower.includes("ringkas halaman") ||
            lower.includes("baca ringkasan halaman") ||
            lower.includes("read this page") ||
            lower.includes("read page") ||
            lower.includes("summarize this page");
          if (wantsSummary) {
            await summarizeAndReadCurrentPage(cfg, setStatus);
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

  async function summarizeAndReadCurrentPage(cfg: any, setStatusFn: (s: VAStatus) => void) {
    try {
      const main = document.querySelector("main") || document.body;
      const title = (document.title || "").trim();
      const raw = (main?.textContent || "").replace(/\s+/g, " ").trim();
      if (!raw) {
        setStatusFn("speaking");
        await speak(cfg, "Maaf, halaman ini tidak memiliki teks untuk diringkas.");
        return;
      }

  const MAX_INPUT = 4000; // keep prompt size modest for provider limits
      const content = `${title ? `${title}. ` : ""}${raw}`.slice(0, MAX_INPUT);

      setStatusFn("thinking");
      const isProfile = typeof window !== 'undefined' && /\/profil\b/.test(window.location.pathname);
      const instruction = isProfile
        ? "Jelaskan halaman profil pengguna untuk tunanetra, tanpa istilah teknis. Sebutkan: nama pengguna, pekerjaan/headline, lokasi (jika ada), nomor telepon (jika ada), foto profil, daftar keahlian, pengalaman, serta tombol penting seperti Edit Profil dan Logout. Gunakan 5-8 kalimat singkat dan jelas."
        : "Ringkas halaman ini untuk tunanetra, tanpa istilah teknis. Sebutkan judul, tujuan utama halaman, bagian/bagian penting, dan tombol/tautan yang bisa ditekan. Gunakan 5-8 kalimat singkat dan jelas.";
      const prompt = `${instruction}\n\n---\n${content}`;
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, locale: "id-ID" }),
      });
      if (!res.ok) {
        try {
          const errJson = await res.json();
          console.error("/api/ai/chat error:", errJson);
        } catch {}
        setStatusFn("speaking");
        await speak(cfg, "Maaf, saya tidak dapat menghubungi AI untuk ringkasan saat ini.");
        return;
      }
      const json = await res.json();
      let summary: string = json?.text || "";
      if (!summary) {
        // provide audible feedback if response is empty
        setStatusFn("speaking");
        await speak(cfg, "Maaf, saya tidak mendapatkan ringkasan dari AI.");
        return;
      }

      // Speak the summary in manageable chunks
      const MAX_CHUNK = 800;
      let i = 0;
      while (i < summary.length) {
        let end = Math.min(i + MAX_CHUNK, summary.length);
        if (end < summary.length) {
          const slice = summary.slice(i, end);
          const lastPunct = Math.max(slice.lastIndexOf("."), slice.lastIndexOf("!"), slice.lastIndexOf("?"));
          if (lastPunct > 100) end = i + lastPunct + 1;
        }
        const part = summary.slice(i, end).trim();
        if (part) {
          setStatusFn("speaking");
          await speak(cfg, part);
        }
        i = end;
      }

      setStatusFn("idle");
    } catch {
      setStatusFn("error");
    }
  }

  const stopAll = () => {
    loopRef.current = false;
    setEnabled(false);
    setStatus("idle");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="bg-white shadow-lg rounded-xl p-3 flex flex-col md:flex-row items-end md:items-center gap-2 border">
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
          onClick={stopAll}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-muted"
        >
          <Square className="h-4 w-4" /> Hentikan
        </button>
      </div>
    </div>
  );
}
