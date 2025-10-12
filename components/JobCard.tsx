"use client"

import { MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { Job } from "@/lib/types"

type Props = {
  job: Job
}

export function JobCard({ job }: Props) {
  const router = useRouter()

  return (
    <Card
      className="flex flex-col h-full overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => router.push(`/protected/pekerjaan/${job.id}`)}
    >
      {/* Gambar dengan animasi hover */}
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={job.image || "/placeholder.svg"}
          alt={job.title}
          className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Konten */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {job.title}
        </h3>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" aria-hidden />
          <span className="text-sm">{job.location}</span>
        </div>

        <div className="flex items-center gap-2 font-bold text-primary">
          <span className="text-sm">{job.pay}</span>
        </div>

        {/* Tombol biru dengan animasi */}
        <div className="mt-auto">
          <Button
            className="h-10 w-full rounded-xl bg-primary text-primary-foreground font-medium transition-all duration-300 hover:bg-primary/90 "
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/protected/pekerjaan/${job.id}`)
            }}
          >
            Lihat Detail
          </Button>
        </div>
      </div>
    </Card>
  )
}
