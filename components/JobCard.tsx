"use client"

import { MapPin} from "lucide-react"
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
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="w-full h-40 bg-muted overflow-hidden rounded-t-2xl">
        <img
          src={job.image || "/placeholder.svg"}
          alt={job.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 flex-1">
        <h3 className="text-lg font-semibold">{job.title}</h3>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" aria-hidden />
          <span className="text-sm">{job.location}</span>
        </div>

        <div className="flex items-center gap-2 font-medium text-chart-5">
          <span className="text-sm">{job.pay}</span>
        </div>

        <div className="mt-auto">
          <Button
            variant="outline"
            className="h-10 w-full rounded-xl bg-transparent"
            onClick={() => router.push(`/protected/pekerjaan/${job.id}`)}
          >
            Lihat Detail
          </Button>
        </div>
      </div>
    </Card>
  )
}
