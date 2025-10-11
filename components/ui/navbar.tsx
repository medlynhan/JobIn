"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUserLocation } from "@/hooks/useUserLocation"
import { FiUser, FiBookOpen, FiCreditCard } from "react-icons/fi"
import { MdOutlineWorkOutline } from "react-icons/md"
import { BsInfoCircle } from "react-icons/bs"

export function Navbar() {
  const pathname = usePathname()
  const { label: locationLabel } = useUserLocation()

  const navLinks = [
    { href: "/pekerjaan", label: "Pekerjaan", icon: MdOutlineWorkOutline },
    { href: "/kelas", label: "Kelas", icon: FiBookOpen },
    { href: "/profil", label: "Profil", icon: FiUser },
    { href: "/tentang-kami", label: "Tentang Kami", icon: BsInfoCircle },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname?.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/80 px-6 lg:px-20 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 relative">
            <Image src="/logo.png" alt="JobIn logo" fill className="object-contain" />
          </div>
          <Link href="/beranda" className="font-bold text-xl text-foreground">
            JobIn
          </Link>
        </div>

        {/* Center: Navigation Links (with icons) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground",
                isActive(l.href)
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <l.icon className="h-5 w-5" />
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: User Location */}
        <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="inline" title={locationLabel}>
            {locationLabel || "Memuat lokasi..."}
          </span>
        </div>
      </div>
    </header>
  )
}
