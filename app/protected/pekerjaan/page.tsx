import type { Metadata } from "next"
import { JobsBrowser } from "@/components/JobsBrowser"
import Header from "@/components/Header"
import JobsCarousel from  "@/components/JobsCarousel";


export const metadata: Metadata = {
  title: "Cari Pekerjaan",
  description: "Temukan pekerjaan informal yang cocok untukmu",
}

export default function Page() {
  return (
    <>
    <Header />
    <main className="min-h-dvh">
      <section className="bg-muted/60">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">Cari Pekerjaan</h1>
          <p className="mt-2 text-muted-foreground md:text-lg">Temukan pekerjaan informal yang cocok untukmu</p>
          <div className="mt-6">
            <JobsBrowser />
          </div>
        </div>
      </section>

    <JobsCarousel />
    </main>
    </>
  )
}
