// lib/courses.ts
import { database } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import type { Course } from "@/lib/types"

export async function fetchCourses(): Promise<Course[]> {
  const classRef = ref(database, "classes")
  const snapshot = await get(classRef)

  if (!snapshot.exists()) return []

  const data = snapshot.val()
  return Object.entries(data).map(([id, course]: [string, any]) => ({
    id,
    title: course.title || "Tanpa Judul",
    category: course.category || "Umum",
    duration: course.duration || "Tidak diketahui",
    level: course.level || "Beginner",
    image: course.image || "/placeholder.svg",
    description: course.description || "",
  })) as Course[]
}

export async function fetchCourseById(id: string): Promise<Course | null> {
  const snapshot = await get(ref(database, `classes/${id}`))
  if (!snapshot.exists()) return null
  const data = snapshot.val()
  return { id, ...data } as Course
}
