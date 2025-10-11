// app/pekerjaan/new/page.tsx
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function NewJobPage() {
  // ... (form state, submitting state, router remain the same)
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    distanceKm: "1",
    rate: "",
    image: "",
    employer: "",
    description: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  // ... (onChange, onSubmit remain the same)
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch("/api/jobs", { method: "POST", body: JSON.stringify(form) })
      alert("Pekerjaan berhasil dibuat! (demo)")
      router.push("/jobs")
    } finally {
      setSubmitting(false)
    }
  }


  return (
    // Consistent mobile-first padding and centered container
    <main className="px-4 sm:px-8 lg:px-12 py-12 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Buat Pekerjaan</h1>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3">
        {/* All inputs will stack vertically, which is standard for mobile forms */}
        <label className="text-sm text-gray-600">Judul</label>
        <input className="rounded border px-3 py-2" name="title" value={form.title} onChange={onChange} required />

        <label className="text-sm text-gray-600">Kategori (mis. bangunan, kebersihan)</label>
        <input
          className="rounded border px-3 py-2"
          name="category"
          value={form.category}
          onChange={onChange}
          required
        />

        <label className="text-sm text-gray-600">Lokasi</label>
        <input
          className="rounded border px-3 py-2"
          name="location"
          value={form.location}
          onChange={onChange}
          required
        />

        <label className="text-sm text-gray-600">Jarak (km)</label>
        <input className="rounded border px-3 py-2" name="distanceKm" value={form.distanceKm} onChange={onChange} type="number" inputMode="numeric" /> {/* Added type/inputMode for better mobile keyboard */}

        <label className="text-sm text-gray-600">Upah (mis. Rp100rb/hari)</label>
        <input className="rounded border px-3 py-2" name="rate" value={form.rate} onChange={onChange} required />

        <label className="text-sm text-gray-600">URL Gambar (opsional)</label>
        <input
          className="rounded border px-3 py-2"
          name="image"
          value={form.image}
          onChange={onChange}
          placeholder="/placeholder.svg"
        />

        <label className="text-sm text-gray-600">Pemberi Kerja</label>
        <input
          className="rounded border px-3 py-2"
          name="employer"
          value={form.employer}
          onChange={onChange}
          required
        />

        <label className="text-sm text-gray-600">Deskripsi</label>
        <textarea
          className="rounded border px-3 py-2"
          name="description"
          rows={5}
          value={form.description}
          onChange={onChange}
          required
        />

        <Button type="submit" disabled={submitting} className="mt-2">
          {submitting ? "Menyimpan..." : "Buat Pekerjaan"}
        </Button>
      </form>
    </main>
  )
}