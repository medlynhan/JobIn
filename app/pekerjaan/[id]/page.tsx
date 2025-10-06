// app/pekerjaan/[id]/page.tsx
"use client"

import { useMemo, useState } from "react"
import useSWR from "swr"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { type Job, fetcher } from "@/lib/jobs"
import { useRouter } from "next/navigation"

export default function JobDetail({ params }: { params: { id: string } }) {
  const { data: jobs } = useSWR<Job[]>("/api/jobs", fetcher)
  const job = useMemo(() => jobs?.find((j) => j.id === params.id), [jobs, params.id])
  // ... (status, reviewWorker, reviewEmployer, router remain the same)
  const [status, setStatus] = useState<"idle" | "applied" | "confirmed" | "in-progress" | "completed" | "paid">("idle")
  const [reviewWorker, setReviewWorker] = useState("")
  const [reviewEmployer, setReviewEmployer] = useState("")
  const router = useRouter()

  // ... (onApply, onConfirm, onStart, onComplete, onPay, onSubmitReviews remain the same)
  if (!jobs) return <main className="px-4 py-12">Memuat...</main>
  if (!job) return <main className="px-4 py-12">Pekerjaan tidak ditemukan.</main>

  const onApply = () => setStatus("applied")
  const onConfirm = () => setStatus("confirmed")
  const onStart = () => setStatus("in-progress")
  const onComplete = () => setStatus("completed")
  const onPay = async () => {
    const res = await fetch("/api/payments/checkout", { method: "POST", body: JSON.stringify({ jobId: job.id }) })
    if (res.ok) setStatus("paid")
  }
  const onSubmitReviews = () => {
    // simple demo, no server storage
    alert("Terima kasih! Review terkirim.")
    router.push("/jobs")
  }

  return (
    // Consistent mobile-first padding
    <main className="px-4 sm:px-8 lg:px-12 py-12 grid gap-6">
      {/* Stacks on mobile, side-by-side on md+ */}
      <div className="flex gap-4 flex-col md:flex-row">
        <Image
          src={job.image || "/placeholder.svg"}
          alt={job.title}
          // Responsive image sizing
          width={480}
          height={320}
          className="rounded-xl object-cover w-full md:w-auto md:max-w-xs lg:max-w-md"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="text-gray-600 mt-1">
            {job.location} • {job.distanceKm} km • {job.rate}
          </p>
          <p className="mt-4 text-gray-700">{job.description}</p>

          <div className="mt-6 flex flex-wrap gap-2"> {/* flex-wrap handles overflow */}
            {status === "idle" && <Button onClick={onApply}>Lamar</Button>}
            {status === "applied" && <Button onClick={onConfirm}>Konfirmasi (Pemberi Kerja)</Button>}
            {status === "confirmed" && <Button onClick={onStart}>Mulai Kerja</Button>}
            {status === "in-progress" && <Button onClick={onComplete}>Selesaikan</Button>}
            {status === "completed" && <Button onClick={onPay}>Bayar</Button>}
            {status === "paid" && <span className="text-green-600 font-semibold">Pembayaran berhasil</span>}
          </div>
        </div>
      </div>

      {status === "paid" && (
        <section className="bg-white rounded-xl p-4 shadow grid gap-4">
          <h2 className="text-lg font-semibold">Ulasan dua arah</h2>
          {/* Stacks on mobile, two columns on md+ */}
          <div className="grid md:grid-cols-2 gap-4"> 
            <div>
              <label className="text-sm text-gray-600">Ulasan untuk Pekerja</label>
              <textarea
                className="w-full mt-1 rounded border p-2"
                rows={4}
                value={reviewWorker}
                onChange={(e) => setReviewWorker(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Ulasan untuk Pemberi Kerja</label>
              <textarea
                className="w-full mt-1 rounded border p-2"
                rows={4}
                value={reviewEmployer}
                onChange={(e) => setReviewEmployer(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={onSubmitReviews}>Kirim Ulasan</Button>
        </section>
      )}
    </main>
  )
}