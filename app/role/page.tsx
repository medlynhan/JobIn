'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";

const Onboarding = () => {
  const router = useRouter();

  const handleRoleSelect = (role: "worker" | "employer") => {
    if (role === "worker") {
      // arahkan ke situs eksternal
      router.push("/daftar");
    } else {
      // arahkan ke halaman internal daftar
      window.open("https://job-in-hire.vercel.app/", "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 px-10 lg:px-20">

      <Link
        href="/"
        className="absolute top-6 right-6 text-black hover:text-neutral-600 transition-colors"
        aria-label="Kembali ke halaman utama"
      >
        <Button className="bg-primary/30 rounded-full py-5 text-neutral-600 text-bold hover:text-background">
          <X className="w-6 h-6 text-bold" />
        </Button>
      </Link>

      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Pilih Peran Kamu</h1>
          <p className="text-muted-foreground">
            Mau cari kerja atau mau mencari pekerja? Yuk mulai dari sini!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* 🔹 Kartu Pekerja */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-all hover:border-primary flex justify-between flex-col"
            onClick={() => handleRoleSelect("worker")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Saya Pekerja</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>Cari dan pilih pekerjaan sesuai keahlianmu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>Dapat pelatihan dan tingkatkan kemampuan</span>
                </li>
              </ul>
              <Button className="w-full mt-4  text-white" size="lg">
                Lanjut sebagai Pekerja
              </Button>
            </CardContent>
          </Card>

          {/* 🔹 Kartu Pemberi Kerja */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-all hover:border-primary flex justify-between flex-col"
            onClick={() => handleRoleSelect("employer")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Saya Pemberi Kerja</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>Pasang kebutuhan pekerjaan dengan cepat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>Temukan pekerja sesuai keahlian dan lokasi</span>
                </li>
              </ul>
              <Button className="w-full mt-4  text-white" size="lg">
                Lanjut sebagai Pemberi Kerja
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
