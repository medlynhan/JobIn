"use client"

import * as React from "react"
import useSWR from "swr"
import { SearchInput } from "./SearchInput"
import { CategoryGrid } from "./CategoryGrid"
import { JobCard } from "./JobCard"
import { fetchJobs } from "@/lib/jobs"
import type { Job } from "@/lib/types"

type Props = {
  showOnlyList?: boolean
}

export function JobsBrowser({ showOnlyList = false }: Props) {
  const [keyword, setKeyword] = React.useState("")
  const [category, setCategory] = React.useState<string | null>(null)

  const { data, isLoading, error } = useSWR("jobs", fetchJobs, {
    revalidateOnFocus: false,
  })

  const jobs = (data || []) as Job[]

  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword = job.title.toLowerCase().includes(keyword.toLowerCase())
    const matchesCategory = !category || job.category === category
    return matchesKeyword && matchesCategory
  })

  return (
    <div>
      {!showOnlyList && (
        <>
          <SearchInput value={keyword} onChange={setKeyword} />
          <CategoryGrid value={category} onChange={setCategory} />
        </>
      )}

<div className="mt-8 grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {isLoading &&
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
          ))}

        {!isLoading && error && (
          <p className="text-sm text-destructive">
            Gagal memuat data. Pastikan Firebase sudah dikonfigurasi.
          </p>
        )}

        {!isLoading && !error && filteredJobs.length === 0 && (
          <p className="text-sm text-muted-foreground">Tidak ada pekerjaan yang cocok.</p>
        )}

        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}
