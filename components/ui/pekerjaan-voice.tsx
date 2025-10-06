// components/pekerjaan-voice.tsx
"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { FiMic, FiSquare, FiVolume2 } from "react-icons/fi"
import { type Job, fetcher } from "@/lib/jobs"
import { JobList } from "./list-pekerjaan"

// ... (useSpeech, speak functions, and ParsedQuery type remain the same)
type ParsedQuery = {
  category?: string | null
  maxDistanceKm?: number | null
  locationHint?: string | null
}

function useSpeech() {
// ... (useSpeech function remains the same)
  const [supported, setSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState("")

  useEffect(() => {
    const w = window as any
    const SpeechRecognition = w.SpeechRecognition || w.webkitSpeechRecognition
    if (SpeechRecognition) {
      setSupported(true)
      const rec = new SpeechRecognition()
      rec.lang = "id-ID"
      rec.interimResults = true
      rec.continuous = false
      rec.onresult = (e: any) => {
        let text = ""
        for (let i = e.resultIndex; i < e.results.length; i++) {
          text += e.results[i][0].transcript
        }
        setTranscript(text.trim())
      }
      rec.onend = () => setListening(false)
      recognitionRef.current = rec
    }
  }, [])

  const start = useCallback(() => {
    if (recognitionRef.current && !listening) {
      setTranscript("")
      setListening(true)
      recognitionRef.current.start()
    }
  }, [listening])

  const stop = useCallback(() => {
    recognitionRef.current?.stop?.()
    setListening(false)
  }, [])

  return { supported, listening, transcript, start, stop, setTranscript }
}

function speak(text: string) {
  if (typeof window === "undefined") return
  const synth = window.speechSynthesis
  if (!synth) return
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = "id-ID"
  synth.cancel()
  synth.speak(utter)
}


export function VoiceJobSearch() {
  const { data: jobs } = useSWR<Job[]>("/api/jobs", fetcher)
  const { supported, listening, transcript, start, stop, setTranscript } = useSpeech()
  const [parsed, setParsed] = useState<ParsedQuery | null>(null)
  const [filtered, setFiltered] = useState<Job[]>([])
  const [speaking, setSpeaking] = useState(false)
  const [loading, setLoading] = useState(false)

  const canSearch = useMemo(() => (transcript && transcript.length > 2) || parsed, [transcript, parsed])
  
  // ... (runParse, useEffect, handleSpeakResults remain the same)
  const runParse = useCallback(async () => {
    if (!transcript) return
    setLoading(true)
    try {
      const res = await fetch("/api/ai/parse-query", {
        method: "POST",
        body: JSON.stringify({ query: transcript }),
      })
      const json = (await res.json()) as { data: ParsedQuery }
      setParsed(json.data)
    } finally {
      setLoading(false)
    }
  }, [transcript])

  useEffect(() => {
    if (!jobs) return
    // Apply simple filter client-side based on parsed request
    const cat = parsed?.category?.toLowerCase() || ""
    const maxD = parsed?.maxDistanceKm ?? null

    let list = jobs
    if (cat) {
      list = list.filter((j) => j.category.toLowerCase().includes(cat) || j.title.toLowerCase().includes(cat))
    }
    if (maxD != null) {
      list = list.filter((j) => j.distanceKm <= (maxD || 999))
    }
    setFiltered(list.slice(0, 10))
  }, [jobs, parsed])

  const handleSpeakResults = () => {
    if (!filtered?.length) {
      speak("Maaf, tidak ada pekerjaan yang cocok ditemukan.")
      return
    }
    setSpeaking(true)
    const firstThree = filtered.slice(0, 3)
    const summary = `Saya menemukan ${filtered.length} pekerjaan. Tiga terdekat: ${firstThree      .map((j) => `${j.title} di ${j.location}, jarak ${j.distanceKm} kilometer, upah ${j.rate}`)
      .join(". ")}`
    speak(summary)
    setTimeout(() => setSpeaking(false), 2000)
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-sm"> {/* Reduced mobile padding */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Cari kerja dengan suara</h3>
        <div className="text-sm text-gray-500 hidden sm:block">{supported ? "Voice tersedia" : "Voice tidak tersedia"}</div> {/* Hide on very small screens */}
      </div>

      <div className="mt-4 grid gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"> {/* Stack input and button on mobile */}
          <input
            className="flex-1 rounded border px-3 py-2 outline-none w-full"
            placeholder="Ucapkan atau ketik: 'cari tukang bangunan radius 5 km'"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
          {!listening ? (
            <Button onClick={start} disabled={!supported} className="flex items-center justify-center gap-2">
              <FiMic /> Bicara
            </Button>
          ) : (
            <Button onClick={stop} variant="destructive" className="flex items-center justify-center gap-2">
              <FiSquare /> Stop
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2"> {/* Stack action buttons on mobile */}
          <Button onClick={runParse} disabled={!canSearch || loading} className="w-full sm:w-auto">
            {loading ? "Mencari..." : "Cari"}
          </Button>
          <Button
            variant="secondary"
            onClick={handleSpeakResults}
            disabled={!filtered?.length || speaking}
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <FiVolume2 /> Bacakan hasil
          </Button>
        </div>

        {parsed && (
          <div className="text-sm text-gray-600 p-2 border-l-4 border-primary"> {/* Added a visual cue for the filter */}
            **Filter:**
            {parsed.category ? `kategori **${parsed.category}**` : "kategori **semua**"}
            {parsed.maxDistanceKm ? ` • max **${parsed.maxDistanceKm} km**` : ""}
            {parsed.locationHint ? ` • lokasi **${parsed.locationHint}**` : ""}
          </div>
        )}
      </div>

      <div className="mt-6">
        <JobList jobs={filtered} />
      </div>
    </div>
  )
}