"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Star, Clock, TrendingUp, PlayCircle } from "lucide-react"
import Header from "@/components/Header"

type Props = {
  course: {
    title: string
    image: string
    description: string
    level: string
    duration: string
    rating?: number
    instructor?: string
    content?: { id: number; title: string }[]
  }
}

export function CourseDetailClient({ course }: Props) {
  const router = useRouter()

  return (
    <>
    <Header />
    <main className="min-h-screen bg-[#F8FAF6] p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 rounded-xl bg-gray-200 px-4 py-2 hover:bg-gray-300 text-sm"
        >
          Kembali
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-1/2 w-full">
            <Image
                src={course.image}
                alt={course.title}
                width={500}
                height={300}
                unoptimized
                className="rounded-xl object-cover w-full h-[300px]"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold text-foreground">
              {course.title}
            </h1>

            <p className="text-muted-foreground">
              oleh: {course.instructor || "Instruktur Profesional"}
            </p>

            <div className="flex flex-wrap gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" /> {course.level}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />{" "}
                {course.rating || "4.6"}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mt-3">
              {course.description}
            </p>
          </div>
        </div>

        {/* Course content */}
        <div className="mt-10 grid md:grid-cols-1 gap-10">
          <div>
            <h2 className="text-lg font-semibold mb-4">Konten Kursus</h2>
            <div className="space-y-3">
              {course.content?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl bg-[#BCD2E6]/70 p-3 hover:bg-[#4F90C4] transition-colors"
                >
                  <PlayCircle className="h-5 w-5 text-blue-700" />
                  <p className="text-sm font-medium">
                    {item.id}. {item.title}
                  </p>
                </div>
              ))}
              {!course.content && (
                <p className="text-muted-foreground text-sm">
                  Belum ada konten yang ditambahkan.
                </p>
              )}
            </div>
          </div>

          
        </div>
      </div>
    </main>
    </>
  )
}
