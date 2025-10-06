// components/navbar.tsx (Final Revision)
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Image from "next/image"
import { FiUser, FiBookOpen, FiCreditCard, FiMenu, FiX } from "react-icons/fi" 
import { MdOutlineWorkOutline } from "react-icons/md"

// Define navigation links with labels, hrefs, and ICONS
const navLinks = [
  { href: "/pekerjaan", label: "Pekerjaan", icon: MdOutlineWorkOutline },
  { href: "/pembayaran", label: "Pembayaran", icon: FiCreditCard },
  { href: "/kelas", label: "Kelas", icon: FiBookOpen },
  { href: "/profil", label: "Profil", icon: FiUser },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname?.startsWith(`${href}/`)
  }

  // --- Desktop Navigation (Visible on lg screens) ---
  const DesktopLinks = () => (
    <nav aria-label="Navigasi utama" className="hidden lg:flex items-center gap-1">
      {navLinks.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={cn(
            // Key change: Added `flex items-center gap-2` for spacing the icon and text
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive(l.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {/* Icon is now clearly visible on desktop */}
          <l.icon className="h-5 w-5" /> 
          {l.label}
        </Link>
      ))}
    </nav>
  )

  // --- Mobile Panel (Slide-in menu) ---
  const MobilePanel = () => (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 top-[68px] z-40 bg-white lg:hidden transform transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "translate-x-full",
      )}
    >
      <nav aria-label="Menu seluler" className="flex flex-col p-4 gap-1">
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium transition-colors",
              isActive(l.href)
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-gray-100 hover:text-foreground",
            )}
          >
            <l.icon className="h-5 w-5" /> 
            {l.label}
          </Link>
        ))}
        <Link href="/login" onClick={() => setOpen(false)} className="mt-4">
          <Button className="w-full">Masuk</Button>
        </Link>
      </nav>
    </div>
  )

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md flex justify-between items-center px-4 sm:px-8 lg:px-12 py-3 h-[68px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="JobIn logo"
            width={75}
            height={75}
            className="cursor-pointer"
            priority
          />
        </Link>

        {/* Desktop Links (Now includes clear icons) */}
        <DesktopLinks />

        {/* Desktop Login Button */}
        <div className="hidden lg:block">
          {pathname !== '/login' && (
            <Link href="/login">
              <Button>Masuk</Button>
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button (Hamburger/X) */}
        <div className="lg:hidden">
          <Button
            variant="outline"
            size="icon" 
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>
      {/* Mobile Panel */}
      <MobilePanel />
    </header>
  )
}