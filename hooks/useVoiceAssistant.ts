"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { useRouter } from "next/navigation";

export type VAStatus = "idle" | "listening" | "thinking" | "speaking" | "error";


function parseIntent(text: string): { navigateTo?: string; back?: boolean; announce?: string; readPage?: boolean; stop?: boolean } | null {
  const t = text.toLowerCase();
  const open = /(ke|buka|pergi|menuju|open|go to|goto)\s+/;
  if (/\b(kembali|back)\b/.test(t)) return { back: true, announce: "Kembali" };
  if (/\b(bacakan|baca halaman|baca|read (the )?page|read this page|read current page)\b/.test(t)) return { readPage: true, announce: "Membacakan halaman ini" };
  if (/\b(stop|berhenti|diam)\b/.test(t)) return { stop: true, announce: "Menghentikan" };
  if (open.test(t) || /\b(pekerjaan|jobs?)\b/.test(t)) {
    if (/\b(pekerjaan|jobs?)\b/.test(t)) return { navigateTo: "/pekerjaan", announce: "Membuka halaman pekerjaan" };
  }
  if ((open.test(t) && /kelas/.test(t)) || /\bkelas\b/.test(t)) return { navigateTo: "/kelas", announce: "Membuka halaman kelas" };
  if ((open.test(t) && /(profil|profile)/.test(t)) || /\b(profil|profile)\b/.test(t)) return { navigateTo: "/profil", announce: "Membuka profil" };
  if ((open.test(t) && /(pembayaran|bayar|payment)/.test(t)) || /\b(pembayaran|bayar|payment)\b/.test(t)) return { navigateTo: "/pembayaran", announce: "Membuka pembayaran" };
  if ((open.test(t) && /(beranda|home)/.test(t)) || /\b(beranda|home)\b/.test(t)) return { navigateTo: "/", announce: "Membuka beranda" };
  if ((open.test(t) && /(login|masuk)/.test(t)) || /\b(login|masuk)\b/.test(t)) return { navigateTo: "/login", announce: "Membuka halaman masuk" };
  return null;
}

export function useVoiceAssistant() {
  const router = useRouter();
  const [status, setStatus] = useState<VAStatus>("idle");
  const [transcript, setTranscript] = useState<string>("");
  const [reply, setReply] = useState<string>("");
  const speakingRef = useRef<SpeechSDK.SpeechSynthesizer | null>(null);
  const continuousRecRef = useRef<SpeechSDK.SpeechRecognizer | null>(null);
  const busyRef = useRef<boolean>(false); // prevents overlapping tasks in continuous mode

  const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
  const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

  const speechConfig = useMemo(() => {
    if (!speechKey || !speechRegion) return null;
    const cfg = SpeechSDK.SpeechConfig.fromSubscription(speechKey, speechRegion);
    cfg.speechRecognitionLanguage = "id-ID"; 
    cfg.speechSynthesisLanguage = "id-ID";
    cfg.speechSynthesisVoiceName = "id-ID-ArdiNeural";
    return cfg;
  }, [speechKey, speechRegion]);

  const speak = useCallback(async (text: string) => {
    if (!speechConfig) return;
    setStatus("speaking");
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
    speakingRef.current = synthesizer;
    return new Promise<void>((resolve) => {
      synthesizer.speakTextAsync(
        text,
        () => {
          synthesizer.close();
          speakingRef.current = null;
          setStatus("idle");
          resolve();
        },
        (err) => {
          console.error("TTS error", err);
          synthesizer.close();
          speakingRef.current = null;
          setStatus("error");
          resolve();
        }
      );
    });
  }, [speechConfig]);

  const cancelSpeak = useCallback(() => {
    try {
      speakingRef.current?.close();
      speakingRef.current = null;
      // Also attempt to cancel browser speech synthesis if used elsewhere
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } catch {}
    setStatus("idle");
  }, []);

  const start = useCallback(() => {
    if (!speechConfig) {
      setStatus("error");
      setReply("Konfigurasi suara tidak ditemukan. Setel NEXT_PUBLIC_AZURE_SPEECH_KEY dan NEXT_PUBLIC_AZURE_SPEECH_REGION pada .env.");
      return;
    }
    setStatus("listening");
    setTranscript("");
    setReply("");

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(async (result) => {
      try {
        if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
          const text = result.text?.trim() ?? "";
          setTranscript(text);

          // Quick client-side intent
          const intent = parseIntent(text);
          if (intent?.back) {
            await speak(intent.announce || "Kembali");
            router.back();
            recognizer.close();
            return;
          }
          if (intent?.stop) {
            cancelSpeak();
            recognizer.close();
            return;
          }
          if (intent?.readPage) {
            await speak(intent.announce || "Membacakan halaman");
            await readCurrentPage();
            recognizer.close();
            return;
          }
          if (intent?.navigateTo) {
            await speak(intent.announce || "Membuka halaman");
            router.push(intent.navigateTo);
            recognizer.close();
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
          await speak(assistant || "Baik, ada yang bisa saya bantu?");
          setStatus("idle");
        } else if (result.reason === SpeechSDK.ResultReason.NoMatch) {
          console.warn("NoMatch: speech could not be recognized");
          setReply("Maaf, saya tidak mendengar dengan jelas. Coba lagi.");
          await speak("Maaf, saya tidak mendengar dengan jelas. Coba lagi.");
          setStatus("idle");
        } else if (result.reason === SpeechSDK.ResultReason.Canceled) {
          const details = SpeechSDK.CancellationDetails.fromResult(result);
          console.warn("Recognition canceled:", details.reason, details.errorDetails);
          setReply("Mikrofon ditolak atau terjadi kesalahan. Periksa izin mikrofon dan koneksi.");
          await speak("Mikrofon ditolak atau terjadi kesalahan. Periksa izin mikrofon dan koneksi.");
          setStatus("error");
        } else {
          console.warn("Other recognition reason:", result.reason);
          setReply("Terjadi masalah saat mendengarkan.");
          await speak("Terjadi masalah saat mendengarkan.");
          setStatus("error");
        }
      } catch (e) {
        console.error(e);
        setStatus("error");
        setReply("Terjadi kesalahan.");
      } finally {
        recognizer.close();
      }
    });
  }, [router, speak, speechConfig]);

  const readCurrentPage = useCallback(async () => {
    try {
      const main = document.querySelector("main") || document.body;
      const title = document.title || "";
      const raw = (main?.textContent || "").replace(/\s+/g, " ").trim();
      if (!raw || raw.length < 20) {
        await speak("Halaman ini tidak memiliki konten yang jelas untuk diringkas.");
        return;
      }
      const excerpt = raw.slice(0, 3000);
      const prompt = `Ringkas halaman berikut secara singkat dan mudah dipahami untuk pengguna tunanetra dalam bahasa Indonesia. Fokus pada:\n- Judul dan konteks utama\n- 3–5 poin penting atau tindakan yang bisa dilakukan\n- Gunakan kalimat pendek dan jelas, hindari detail teknis\n\nJudul: ${title || "(tanpa judul)"}\nIsi:\n${excerpt}`;

      setStatus("thinking");
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, locale: "id-ID" }),
      });
      const json = await res.json();
      const summary = (json?.text as string) || "Maaf, saya tidak dapat merangkum halaman ini.";
      await speak(summary);
      setStatus("idle");
    } catch (e) {
      console.error("readCurrentPage error", e);
      await speak("Maaf, saya tidak dapat membacakan halaman ini.");
      setStatus("error");
    }
  }, [speak, setStatus]);

  const startContinuous = useCallback(() => {
    if (!speechConfig) {
      setStatus("error");
      setReply("Konfigurasi suara tidak ditemukan. Setel NEXT_PUBLIC_AZURE_SPEECH_KEY dan NEXT_PUBLIC_AZURE_SPEECH_REGION pada .env.");
      return;
    }
    if (continuousRecRef.current) return; // already running
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    continuousRecRef.current = recognizer;
    setStatus("listening");

    recognizer.recognized = async (_s, e) => {
      if (!e || !e.result) return;
      if (busyRef.current) return; // skip if handling another command
      if (e.result.reason !== SpeechSDK.ResultReason.RecognizedSpeech) return;
      const text = e.result.text?.trim() ?? "";
      if (!text) return;
      busyRef.current = true;
      try {
        setTranscript(text);
        const intent = parseIntent(text);
        if (intent?.back) {
          await speak(intent.announce || "Kembali");
          router.back();
          return;
        }
        if (intent?.stop) {
          cancelSpeak();
          return;
        }
        if (intent?.readPage) {
          await speak(intent.announce || "Membacakan halaman");
          await readCurrentPage();
          return;
        }
        if (intent?.navigateTo) {
          await speak(intent.announce || "Membuka halaman");
          router.push(intent.navigateTo);
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
        await speak(assistant || "Baik, ada yang bisa saya bantu?");
        setStatus("listening");
      } catch (err) {
        console.error("continuous recognized handler error", err);
        setStatus("error");
      } finally {
        busyRef.current = false;
      }
    };

    recognizer.canceled = (_s, e) => {
      console.warn("continuous recognition canceled", e);
      setStatus("error");
    };
    recognizer.sessionStopped = () => {
      setStatus("idle");
      continuousRecRef.current = null;
    };

    recognizer.startContinuousRecognitionAsync();
  }, [cancelSpeak, readCurrentPage, router, speak, speechConfig]);

  const stopContinuous = useCallback(() => {
    const r = continuousRecRef.current;
    if (!r) return;
    try {
      r.stopContinuousRecognitionAsync(() => {
        r.close();
        continuousRecRef.current = null;
        setStatus("idle");
      }, (err) => {
        console.error("stopContinuous error", err);
        r.close();
        continuousRecRef.current = null;
        setStatus("idle");
      });
    } catch (e) {
      console.error("stopContinuous exception", e);
      setStatus("idle");
    }
  }, []);

  const stop = useCallback(() => {
    cancelSpeak();
    stopContinuous();
    setStatus("idle");
  }, [cancelSpeak, stopContinuous]);

  return { status, transcript, reply, start, stop, startContinuous, stopContinuous, readCurrentPage } as const;
}
