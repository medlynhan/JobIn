'use client';
import { useState } from 'react';
import useUsers from '@/hooks/useUsers';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";

export default function RegisterPage() {
  const { addUser, users, loading, error } = useUsers();  

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Validasi form untuk memastikan semua input valid
  const validateForm = () => {
    const emailExists = users.some(user => user.email === email);
   setIsFormValid(!!(username && email && password && !emailExists));
  };

  // Handle perubahan pada setiap input
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    validateForm();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateForm();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validateForm();
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        await addUser({ username, email, password });
      } catch (err) {
        console.error('Error during registration:', err);
      }
    }
  };

  // Render loading state
  if (loading) {
    return <div className='loading-page'>Loading...</div>;
  }

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
          <CardTitle className="text-2xl font-bold">Daftar Akun</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold hover:underline">
              Masuk
            </Link>
          </p>
        </CardHeader>

        <CardContent className="space-y-4 mt-2">
          <div className="space-y-1">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <Input
              id="username"
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
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
            type="submit"
            className="w-full text-white"
            onClick={handleSubmit}
            disabled={!isFormValid} // Disabled jika form tidak valid
          >
            Daftar
          </Button>
        </CardFooter>

        {/* Pesan error jika form tidak valid */}
        {!isFormValid && <p className="text-sm text-red-400 text-center mb-10">Harap isi semua data</p>}
        {error && <p className="text-sm text-red-400 text-center">{error}</p>} {/* Tampilkan error jika ada */}
      </Card>
    </div>
  );
}
