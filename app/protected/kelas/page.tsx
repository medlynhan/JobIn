"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"

const COURSES = [
  {
    id: "c1",
    title: "Dasar Tukang Bangunan",
    duration: "45 menit",
    image: "/kursus-tukang-bangunan.jpg",
  },
  {
    id: "c2",
    title: "Kebersihan Rumah Efisien",
    duration: "30 menit",
    image: "/kursus-kebersihan-rumah.jpg",
  },
  {
    id: "c3",
    title: "Kasir Pemula",
    duration: "40 menit",
    image: "/kursus-kasir-ritel.jpg",
  },
]


export default function KelasPage() {
  return (
    <>
    <Header/>
    <main className="px-4 sm:px-8 lg:px-12 py-12">
      <h1 className="text-2xl font-bold mb-4">Kelas & Upskilling</h1>
      {/* The overflow-x-auto is the key to mobile responsiveness here */}
      <section className="flex gap-4 overflow-x-auto no-scrollbar py-1">
        {COURSES.map((c) => (
          <div key={c.id} className="min-w-[240px] max-w-[300px] bg-white rounded-xl shadow p-4">
            <Image
              src={c.image || "/placeholder.svg"}
              alt={c.title}
              // Adjusted width for better fit on small screens
              width={280} 
              height={160}
              className="rounded-lg object-cover w-full h-40" // Ensure image fills its container
            />
            <h3 className="text-lg font-semibold mt-3">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.duration}</p>
            <Button className="w-full mt-4">Mulai</Button>
          </div>
        ))}
      </section>
    </main>
    </>
  )
}