import { NextResponse } from "next/server"
import { fetchJobs } from "@/lib/jobs"

export async function GET() {
  try {
    const jobs = await fetchJobs()
    return NextResponse.json(jobs)
  } catch (e) {
    return NextResponse.json({ error: "Gagal memuat pekerjaan" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  const nowId = String(Date.now())
  const created = {
    id: nowId,
    title: body.title || "Pekerjaan Baru",
    category: body.category || "lainnya",
    location: body.location || "Tidak diketahui",
    distanceKm: Number(body.distanceKm) || 1,
    rate: body.rate || "Rp0",
    image: body.image || "/placeholder.svg",
    postedMinutesAgo: 0,
    employer: body.employer || "Anonim",
    description: body.description || "Deskripsi belum diisi.",
  }
  // Note: this is a mock – not persisted. Return the created object.
  return NextResponse.json({ ok: true, job: created })
}
