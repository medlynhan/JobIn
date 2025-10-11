"use client"

import { MapPin, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Job } from "@/lib/types"

type Props = {
  job: Job
}

export function JobCard({ job }: Props) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl">
      {/* Fixed rectangular image */}
      <div className="w-full h-40 bg-muted overflow-hidden rounded-t-2xl">
        <img
          src={job.image || "/placeholder.svg"}
          alt={job.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold">{job.title}</h3>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" aria-hidden />
          <span className="text-sm">{job.location}</span>
        </div>

        <div className="flex items-center gap-2 font-medium text-chart-5">
          <DollarSign className="h-4 w-4" aria-hidden />
          <span className="text-sm">{job.pay}</span>
        </div>

        <div className="mt-auto">
          <Button variant="outline" className="h-10 w-full rounded-xl bg-transparent">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}
