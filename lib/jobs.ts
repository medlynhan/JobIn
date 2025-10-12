import { database } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import type { Job } from "@/lib/types"

export async function fetchJobs(): Promise<Job[]> {
  const jobsRef = ref(database, "jobs")
  const snapshot = await get(jobsRef)

  if (!snapshot.exists()) return []

  const data = snapshot.val()

  return Object.entries(data).map(([id, job]: [string, any]) => ({
    id,
    title: job.title || job.requirements?.title || "Tanpa Judul",
    location: job.location || "Tidak diketahui",
    pay: job.pay || job.requirements?.salary || "Rp — /hari",
    category: job.category || "Lainnya",
    employer: job.employer || "Tidak diketahui",
    image: job.picture || "/placeholder.svg",
    status: job.status || job.requirements?.status || "Tersedia",
  // Prefer top-level uid, fallback to requirements.uid for older entries
  uid: job.uid || job.requirements?.uid || "",
    postedDate: job.postedDate || "",
  })) as Job[]
}

export async function fetchJobById(id: string): Promise<Job | null> {
  const jobRef = ref(database, `jobs/${id}`)
  const snapshot = await get(jobRef)

  if (!snapshot.exists()) return null
  const job = snapshot.val()

  return {  
    id,
    title: job.title || job.requirements?.title || "Tanpa Judul",
    location: job.location || "Tidak diketahui",
    pay: job.pay || job.requirements?.salary || "Rp — /hari",
    category: job.category || "Lainnya",
    employer: job.employer || "Tidak diketahui",
    image: job.picture || "/placeholder.svg",
    status: job.status || job.requirements?.status || "Tersedia",
    uid: job.uid || job.requirements?.uid || "",
    postedDate: job.postedDate || "",
  }
}
