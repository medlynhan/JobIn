"use client";

import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

export type VAStatus = "idle" | "listening" | "thinking" | "speaking" | "error";

export function parseIntent(text: string): { navigateTo?: string; back?: boolean; announce?: string } | null {
  const t = text.toLowerCase();
  const open = /(ke|buka|pergi|menuju|open|go to|goto)\s+/;
  if (/\b(kembali|back)\b/.test(t)) return { back: true, announce: "Kembali" };
  if ((open.test(t) && /kelas/.test(t)) || /\bkelas\b/.test(t)) return { navigateTo: "/kelas", announce: "Membuka halaman kelas" };
  if ((open.test(t) && /(profil|profile)/.test(t)) || /\b(profil|profile)\b/.test(t)) return { navigateTo: "/profil", announce: "Membuka profil" };
  if ((open.test(t) && /(pembayaran|bayar|payment)/.test(t)) || /\b(pembayaran|bayar|payment)\b/.test(t)) return { navigateTo: "/pembayaran", announce: "Membuka pembayaran" };
  if ((open.test(t) && /(beranda|home)/.test(t)) || /\b(beranda|home)\b/.test(t)) return { navigateTo: "/", announce: "Membuka beranda" };
  if ((open.test(t) && /(login|masuk)/.test(t)) || /\b(login|masuk)\b/.test(t)) return { navigateTo: "/login", announce: "Membuka halaman masuk" };
  if (open.test(t) || /\b(pekerjaan|jobs?)\b/.test(t)) {
    if (/\b(pekerjaan|jobs?)\b/.test(t)) return { navigateTo: "/pekerjaan", announce: "Membuka halaman pekerjaan" };
  }
  return null;
}

export function createSpeechConfig() {
  const speechKey = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
  const speechRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;
  if (!speechKey || !speechRegion) return null;
  const cfg = SpeechSDK.SpeechConfig.fromSubscription(speechKey, speechRegion);
  cfg.speechRecognitionLanguage = "id-ID";
  cfg.speechSynthesisLanguage = "id-ID";
  cfg.speechSynthesisVoiceName = "id-ID-ArdiNeural";
  return cfg;
}

export async function recognizeOnce(speechConfig: SpeechSDK.SpeechConfig): Promise<string | null> {
  return new Promise((resolve) => {
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    recognizer.recognizeOnceAsync((result) => {
      try {
        if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
          resolve(result.text?.trim() || "");
        } else {
          resolve(null);
        }
      } finally {
        recognizer.close();
      }
    });
  });
}

export async function speak(speechConfig: SpeechSDK.SpeechConfig, text: string): Promise<void> {
  return new Promise((resolve) => {
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(
      text,
      () => {
        synthesizer.close();
        resolve();
      },
      () => {
        synthesizer.close();
        resolve();
      }
    );
  });
}
