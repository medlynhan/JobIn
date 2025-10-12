"use client"

import * as React from "react"
import { ref, get } from "firebase/database"
import { database } from "@/lib/firebase"
import { SearchInput } from "./SearchInput"
import { LevelGrid } from "./LevelGrid"
import CourseCard from "./CourseCard"

type Props = {
  showOnlyList?: boolean
}

type Course = {
  id: string
  title: string
  description: string
  duration: string
  level: string
  image: string
  category: string
}

export function CourseBrowser({ showOnlyList = false }: Props) {
  const [keyword, setKeyword] = React.useState("")
  const [level, setLevel] = React.useState<string | null>(null)
  const [courses, setCourses] = React.useState<Course[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  // ✅ Fetch courses from Firebase
  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseRef = ref(database, "classes")
        const snapshot = await get(courseRef)

        if (snapshot.exists()) {
          const data = snapshot.val()
          const loadedCourses = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
          setCourses(loadedCourses)
        } else {
          setCourses([])
        }
      } catch (err) {
        console.error("Error fetching courses:", err)
        setError("Gagal memuat data. Pastikan Firebase sudah dikonfigurasi.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // 🔍 Filter by keyword + level
  const filteredCourses = courses.filter((course) => {
    const matchesKeyword =
      course.title.toLowerCase().includes(keyword.toLowerCase()) ||
      course.description.toLowerCase().includes(keyword.toLowerCase())

    const matchesLevel = !level || course.level === level

    return matchesKeyword && matchesLevel
  })

  return (
    <div>
      {!showOnlyList && (
        <div className="px-10 lg:px-20 space-y-6">
          <SearchInput
            value={keyword}
            onChange={setKeyword}
            placeholder="Cari kelas..."
          />
          <LevelGrid value={level} onChange={setLevel} />
        </div>
      )}

      {/* Course list */}
      <div className="mt-8 grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 lg:px-20">
        {isLoading &&
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-2xl bg-muted" />
          ))}

        {!isLoading && error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {!isLoading && !error && filteredCourses.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Tidak ada kelas yang cocok.
          </p>
        )}

        {!isLoading &&
          !error &&
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
      </div>
    </div>
  )
}
