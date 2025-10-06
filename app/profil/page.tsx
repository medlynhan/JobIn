// app/profil/page.tsx
"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  // ... (state, save function remain the same)
  const [name, setName] = useState("Budi Santoso")
  const [bio, setBio] = useState("Pekerja harian lepas. Pengalaman 3 tahun di kebersihan.")
  const [skills, setSkills] = useState("kebersihan, kasir")
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    // mock save
    setTimeout(() => {
      setSaving(false)
      alert("Profil disimpan (demo).")
    }, 600)
  }

  return (
    // Consistent mobile-first padding and centered container
    <main className="px-4 sm:px-8 lg:px-12 py-12 max-w-3xl mx-auto grid gap-6">
      <div className="flex items-center gap-4">
        <Image
          src="/placeholder-user.jpg"
          alt="Foto Profil"
          // Reduced size slightly for mobile
          width={72} 
          height={72}
          className="rounded-full object-cover h-[72px] w-[72px] flex-shrink-0"
        />
        <div>
          <div className="text-xl font-semibold">{name}</div>
          <div className="text-sm text-gray-600">Rating: ★★★★☆ (4.2)</div>
        </div>
      </div>

      <section className="bg-white rounded-xl shadow p-4 grid gap-3">
        <label className="text-sm text-gray-600">Nama</label>
        <input className="rounded border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />

        <label className="text-sm text-gray-600">Tentang</label>
        <textarea className="rounded border px-3 py-2" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />

        <label className="text-sm text-gray-600">Keahlian</label>
        <input className="rounded border px-3 py-2" value={skills} onChange={(e) => setSkills(e.target.value)} />

        <Button onClick={save} disabled={saving} className="mt-2">
          {saving ? "Menyimpan..." : "Simpan Profil"}
        </Button>
      </section>

      <section className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Portofolio</h2>
        <div className="text-sm text-gray-600">Tambahkan foto/pekerjaan selesai di masa depan.</div>
      </section>
    </main>
  )
}