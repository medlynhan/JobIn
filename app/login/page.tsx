// app/login/page.tsx (Next.js App Router)
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { X } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Tombol X untuk kembali ke home */}
      <Link
        href="/"
        className="absolute top-6 right-6 text-black hover:text-neutral-600 transition-colors"
        aria-label="Kembali ke halaman utama"
      >
        <Button className="bg-primary/30 rounded-full text-neutral-600 text-bold  hover:text-background"><X className="w-6 h-6 text-bold" /></Button>
        
      </Link>

      <Card className="w-[380px] shadow-md border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Masuk Akun</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Belum punya akun?{" "}
            <Link href="/register" className="font-semibold  hover:underline">
              Daftar
            </Link>
          </p>
        </CardHeader>

        <CardContent className="space-y-4 mt-2">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email"
              className=""
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password"
              className=""
            />
          </div>
        </CardContent>

        <CardFooter>
          <Link href={"/beranda"} className="w-full">  
            <Button className="w-full text-white">
              Masuk
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
