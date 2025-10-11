import { database } from "@/lib/firebase"
import { ref, get } from "firebase/database"
import type { Job } from "@/lib/types"

export async function fetchJobs() {
  const jobsRef = ref(database, "jobs")
  const snapshot = await get(jobsRef)

  if (!snapshot.exists()) return []

  const data = snapshot.val()

  // Convert object to array
  return Object.entries(data).map(([id, job]: [string, any]) => ({
    id,
    title: job.title || job.requirements?.title || "Tanpa Judul",
    location: job.location || "Tidak diketahui",
    pay: job.pay || job.requirements?.salary || "Rp — /bulan",
    category: job.category || "Lainnya",
    employer: job.employer || "Tidak diketahui",
    image: job.picture || "/placeholder.svg",
    status: job.status || job.requirements?.status || "Tersedia",
    uid: job.uid || job.requirements?.uid || "",
    postedDate: job.postedDate || "",
  })) as Job[]
}
