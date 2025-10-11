"use client"

import { use, useEffect, useState } from "react"
import { ref, get } from "firebase/database"
import { database } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params) // ✅ unwrap the promise
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchCourse() {
      try {
        console.log("Fetching course:", id)
        const courseRef = ref(database, `classes/${id}`)
        const snapshot = await get(courseRef)
        if (snapshot.exists()) {
          console.log("Found course:", snapshot.val())
          setCourse(snapshot.val())
        } else {
          console.error("Course not found")
        }
      } catch (err) {
        console.error("Firebase error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id])

  if (loading)
    return <div className="p-8 text-center text-muted-foreground">Memuat data kursus...</div>

  if (!course)
    return <div className="p-8 text-center text-red-500">Kursus tidak ditemukan.</div>

  return (
    <main className="min-h-screen bg-muted/30 p-8">
      <div className="max-w-5xl mx-auto bg-background rounded-2xl shadow-md p-6">
        <Button variant="secondary" className="mb-6" onClick={() => router.back()}>
          Kembali
        </Button>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
          <img
  src={course.image || "/placeholder.svg"}
  alt={course.title || "Course image"}
  className="rounded-xl object-cover w-full h-[300px]"
/>

          </div>

          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold text-foreground">{course.title}</h1>
            <p className="text-muted-foreground">{course.description}</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><strong>Kategori:</strong> {course.category}</p>
              <p><strong>Durasi:</strong> {course.duration}</p>
              <p><strong>Tingkat:</strong> {course.level}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
