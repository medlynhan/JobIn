// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/ui/navbar"
import { Suspense } from "react"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "JobIn",
  description:
    "JobIn adalah web app inklusif untuk pekerja informal di Indonesia. Cari kerja, apply, dan belajar skill baru dengan AI voice assistant, meski internet lemah.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          {/* Increased padding-top to account for the fixed header height (approx 68px + a little gap) */}
          <main className="pt-[68px] lg:pt-[80px]">{children}</main>
        </Suspense>
      </body>
    </html>
  )
}