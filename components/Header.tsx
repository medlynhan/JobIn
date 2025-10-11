"use client";

import React from "react";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  User,
  Info,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { useUserLocation } from "@/hooks/useUserLocation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { label: locationLabel } = useUserLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card backdrop-blur supports-[backdrop-filter]:bg-card/80 px-6 lg:px-20 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-6">
            <img src="/logo.png" alt="JobIn logo" />
          </div>
          <Link href="/protected/beranda">
            <span className="font-bold text-xl text-foreground">JobIn</span>
          </Link>
        </div>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/protected/pekerjaan"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Briefcase className="h-4 w-4" />
            Pekerjaan
          </Link>

          <Link
            href="/protected/kelas"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <GraduationCap className="h-4 w-4" />
            Kelas
          </Link>

          <Link
            href="/protected/profil"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <User className="h-4 w-4" />
            Profil
          </Link>

          <Link
            href="/protected/tentang-kami"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Info className="h-4 w-4" />
            Tentang Kami
          </Link>
        </nav>

        {/* Location (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm font-semibold">
            <MapPin className="h-4 w-4" />
            <span className="inline" title={locationLabel}>
              {locationLabel}
            </span>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Buka menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-2 grid gap-8 px-5">
                <Link
                  href="/protected/pekerjaan"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <Briefcase className="h-4 w-4" />
                  Pekerjaan
                </Link>

                <Link
                  href="/protected/kelas"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <GraduationCap className="h-4 w-4" />
                  Kelas
                </Link>

                <Link
                  href="/protected/profil"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <User className="h-4 w-4" />
                  Profil
                </Link>

                <Link
                  href="/protected/tentang-kami"
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                  <Info className="h-4 w-4" />
                  Tentang Kami
                </Link>
              </div>
            </SheetContent>

          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
