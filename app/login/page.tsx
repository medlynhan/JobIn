'use client';
import { useState } from 'react';
import { auth } from '@/lib/firebase'; // Import Firebase Authentication
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase auth function for login
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import { useRouter } from 'next/navigation'; // Untuk navigasi setelah login berhasil

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();  // Untuk navigasi setelah login berhasil

  // Validasi form untuk memastikan email dan password valid
  const validateForm = () => {
    setIsFormValid(!!(email && password));
  };

  // Handle perubahan pada input email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateForm();  // Validasi form saat ada perubahan
  };

  // Handle perubahan pada input password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validateForm();  // Validasi form saat ada perubahan
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');  // Reset error message

    try {
      // Melakukan login dengan email dan password menggunakan Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Jika login berhasil, arahkan ke halaman beranda
      router.push('/protected/beranda');
    } catch (error) {
      setErrorMsg('Email atau password salah.');
      console.error("Error during login:", error);
    } finally {
      setLoading(false);  // Menghentikan loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Tombol X untuk kembali ke home */}
      <Link
        href="/"
        className="absolute top-6 right-6 text-black hover:text-neutral-600 transition-colors"
        aria-label="Kembali ke halaman utama"
      >
        <Button className="bg-primary/30 rounded-full text-neutral-600 text-bold hover:text-background">
          <X className="w-6 h-6 text-bold" />
        </Button>
      </Link>

      <Card className="w-[380px] shadow-none sm:shadow-md border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Masuk Akun</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Belum punya akun?{" "}
            <Link href="/daftar" className="font-semibold hover:underline">
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
              value={email}
              onChange={handleEmailChange}
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
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full text-white"
            onClick={handleSubmit}
            disabled={loading || !isFormValid} // Disable jika form tidak valid atau sedang loading
          >
            {loading ? 'Memuat...' : 'Masuk'}
          </Button>
        </CardFooter>

        {/* Tampilkan pesan error jika ada */}
        {errorMsg && <p className="text-sm text-red-400 text-center mb-10">{errorMsg}</p>}
      </Card>
    </div>
  );
}
