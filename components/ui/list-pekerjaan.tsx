// components/list-pekerjaan.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FiMapPin } from "react-icons/fi"
import type { Job } from "@/lib/jobs"

export function JobList({ jobs }: { jobs: Job[] }) {
  if (!jobs?.length) {
    return <div className="text-sm text-gray-500">Belum ada hasil.</div>
  }
  return (
    // This is the key for horizontal scrolling on mobile
    <div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
      {jobs.map((job) => (
        <div key={job.id} className="min-w-[240px] max-w-[300px] bg-white rounded-xl shadow p-4"> {/* Adjusted min-w/max-w */}
          <Image
            src={job.image || "/placeholder.svg"}
            alt={job.title}
            // Image size for job cards
            width={280} 
            height={160}
            className="rounded-lg aspect-4/3 object-cover w-full"
          />
          <h3 className="text-lg font-semibold mt-3 text-gray-800">{job.title}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FiMapPin /> {job.distanceKm} km · {job.rate}
          </p>
          <Link href={`/pekerjaan/${job.id}`}>
            <Button className="w-full mt-4">Lihat Detail</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}