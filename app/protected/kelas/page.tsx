import Header from "@/components/Header"
import { CourseBrowser } from "@/components/CoursesBrowser"

export default function KelasPage() {
  return (
    <>
      <Header />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Kelas Pelatihan</h1>
        <p className="text-muted-foreground mb-6">
          Pilih kelas pelatihan keterampilan yang sesuai dengan minatmu.
        </p>
        <CourseBrowser />
      </main>
    </>
  )
}
