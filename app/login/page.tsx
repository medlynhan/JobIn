// app/login/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FiMic } from "react-icons/fi"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [listening, setListening] = useState(false)

  // ... (startVoice function remains the same)
  const startVoice = () => {
    const w = window as any
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition
    if (!SR) return
    const rec = new SR()
    rec.lang = "id-ID"
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript
      setEmail(text.replace(/\s/g, "").toLowerCase())
    }
    rec.onend = () => setListening(false)
    setListening(true)
    rec.start()
  }

  return (
    // Consistent mobile-first padding and centered container
    <main className="px-4 sm:px-8 py-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Masuk</h1>
      <div className="mt-6 grid gap-3">
        <label className="text-sm text-gray-600">Email atau Nomor HP</label>
        <div className="flex flex-col sm:flex-row gap-2"> {/* Added flex-col on mobile, flex-row on sm+ */}
          <input
            className="flex-1 rounded border px-3 py-2"
            placeholder="contoh: budi@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={startVoice} className="flex items-center justify-center gap-2"> {/* Added justify-center for full width on mobile */}
            <FiMic /> {listening ? "Mendengarkan..." : "Suara"}
          </Button>
        </div>
        <Button className="mt-2">Lanjut</Button>
      </div>
    </main>
  )
}