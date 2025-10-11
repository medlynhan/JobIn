"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchJobById } from "@/lib/jobs"
import type { Job } from "@/lib/types"
import Header from "@/components/Header"

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadJob() {
      const data = await fetchJobById(id)
      setJob(data)
      setLoading(false)
    }
    loadJob()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="p-8 rounded-2xl w-full max-w-3xl space-y-4">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-10 w-24" />
        </Card>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-muted-foreground mb-4">
          Pekerjaan tidak ditemukan.
        </p>
        <Button variant="outline" onClick={() => router.back()}>
          Kembali
        </Button>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="flex flex-col md:flex-row items-start w-full max-w-5xl p-8 rounded-3xl shadow-lg bg-white gap-8">
          {/* Left: Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={job.image || "/placeholder.svg"}
              alt={job.title}
              className="w-full h-80 object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Right: Details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-muted-foreground">📍 {job.location}</p>
            <p className="text-green-600 font-semibold text-lg">💰 {job.pay}</p>

            <div className="text-sm leading-relaxed space-y-1">
              <p><strong>Status:</strong> {job.status}</p>
              <p><strong>Kategori:</strong> {job.category}</p>
              <p><strong>Employer:</strong> {job.employer}</p>
              <p><strong>Tanggal posting:</strong> {job.postedDate}</p>
            </div>

            <div className="pt-4">
              <Button variant="outline" onClick={() => router.back()}>
                Kembali
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
