// app/pekerjaan/page.tsx
"use client"

import { Suspense } from "react"
import useSWR from "swr"
import { type Job, fetcher } from "@/lib/jobs"
import { JobList } from "@/components/ui/list-pekerjaan"
import { VoiceJobSearch } from "@/components/ui/pekerjaan-voice"
import Link from "next/link"

export default function JobsPage() {
  return (
    // Consistent mobile-first padding
    <main className="px-4 sm:px-6 lg:px-12 py-12">
      <div className="border border-gray-300 rounded-2xl p-4 sm:p-6 lg:p-10 shadow-sm bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Pekerjaan</h1>
          <Link href="/pekerjaan/new" className="text-sm underline">
            Buat Pekerjaan
          </Link>
        </div>

        <Suspense fallback={<div>Memuat...</div>}>
          <VoiceJobSearch />
        </Suspense>

        <AllJobs />
      </div>
    </main>
  )
}

function AllJobs() {
// ... (AllJobs component remains the same)
  const { data } = useSWR<Job[]>("/api/jobs", fetcher)
  if (!data)
    return <div className="mt-8 text-sm text-gray-500">Memuat daftar pekerjaan...</div>

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-3">Semua Pekerjaan</h2>
      <JobList jobs={data} />
    </section>
  )
}