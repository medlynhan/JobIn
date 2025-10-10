"use client";

import React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { useUserLocation } from "@/hooks/useUserLocation";

const Header = () => {
  const { label: locationLabel } = useUserLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card  px-10 lg:px-20 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6">
              <img src="/logo.png" alt="" />
            </div>
            <Link href="/beranda">
            <span className="font-bold text-xl text-foreground">JobIn</span>
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/pekerjaan" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pekerjaan
          </Link>
          <Link href="/kelas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Kelas
          </Link>
          <Link href="/profil" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Profile
          </Link>
          <Link href="/tentang-kami" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Tentang Kami
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm font-semibold">
            <MapPin className="h-4 w-4" />
            <span className="inline" title={locationLabel}>{locationLabel}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
