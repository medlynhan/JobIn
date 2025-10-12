import Header from "@/components/Header"
import { CourseBrowser } from "@/components/CoursesBrowser"
import Footer from "@/components/Footer"

export default function KelasPage() {
  return (
    <>
    <Header />
    <main className="min-h-dvh ">
      <section className="pt-8 bg-background">
        <div className="w-full">
          <div className="px-10 lg:px-20">
            <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl w-full">Kelas Pelatihan</h1>
            <p className="mt-2 text-muted-foreground md:text-lg w-full ">Pilih kelas pelatihan keterampilan yang sesuai dengan minatmu.</p>
          </div>
          <div className="mt-6">
            <CourseBrowser />
          </div>
        </div>
      </section>
      <Footer />
    </main>
    </>
  )
}
