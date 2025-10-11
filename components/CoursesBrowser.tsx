"use client"

import * as React from "react"
import useSWR from "swr"
import { SearchInput } from "./SearchInput"
import { CategoryGrid } from "./CategoryGrid"
import { fetchCourses } from "@/lib/courses"
import type { Course } from "@/lib/types"
import CourseCard from "./CourseCard"

type Props = {
  showOnlyList?: boolean
}

export function CourseBrowser({ showOnlyList = false }: Props) {
  const [keyword, setKeyword] = React.useState("")
  const [category, setCategory] = React.useState<string | null>(null)

  const { data, isLoading, error } = useSWR("courses", fetchCourses, {
    revalidateOnFocus: false,
  })

  const courses = (data || []) as Course[]

  const filteredCourses = courses.filter((course) => {
    const matchesKeyword = course.title.toLowerCase().includes(keyword.toLowerCase())
    const matchesCategory = !category || course.category === category
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
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
          ))}

        {!isLoading && error && (
          <p className="text-sm text-destructive">
            Gagal memuat data. Pastikan Firebase sudah dikonfigurasi dengan benar.
          </p>
        )}

        {!isLoading && !error && filteredCourses.length === 0 && (
          <p className="text-sm text-muted-foreground">Tidak ada kelas yang cocok.</p>
        )}

        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
