// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/ui/navbar"
import { Suspense } from "react"
import VoiceAssistantFloating from "@/components/VoiceAssistantFloating"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "JobIn",
  description:
    "JobIn adalah web app inklusif untuk pekerja informal di Indonesia. Cari kerja, apply, dan belajar skill baru dengan AI voice assistant, meski internet lemah.",
  icons: {
    icon: '/icon-web.png', // bisa juga '/favicon.ico'
  },
}


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <VoiceAssistantFloating />
      </body>
    </html>
  )
}
      
