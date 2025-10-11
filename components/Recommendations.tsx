"use client"
import { useEffect, useState } from "react"
import { fetchJobs } from "@/lib/jobs"
import { JobCard } from "./JobCard"

export default function Recommendations() {
  const [jobs, setJobs] = useState<any[]>([])

  useEffect(() => {
    fetchJobs().then(setJobs)
  }, [])

  return (
    <section className="py-12 bg-secondary/30 px-10 lg:px-20">
      <h2 className="text-3xl font-bold mb-6">Jobs That Match You</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}
