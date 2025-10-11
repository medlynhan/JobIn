"use client";
import { useState, useEffect } from "react";
import { User, MapPin, Mail, Phone, Edit, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useUsers from '@/hooks/useUsers'; 
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useUserLocation } from "@/hooks/useUserLocation";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const Profile = () => {
  const { profile, loading, logoutUser } = useUsers(); 
  const { label: locationLabel } = useUserLocation();
  const router = useRouter();

  if (loading) {
    return <Loading></Loading>;  
  }

  if (!profile) {
    return <Error />;  
  }

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      toast.success('Berhasil logout!');
      router.push('/login'); // arahkan ke halaman login
    } else {
      toast.error('Gagal logout.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-muted/30 px-10 lg:px-20">
        <div className="container py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={profile.foto || '/empty-profile.png'}  // Gambar default jika tidak ada foto
                    alt={profile.username || 'User Photo'}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/10"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{profile.username}</h1>
                    <p className="text-xl font-semibold mb-4 text-primary">{profile.pekerjaan || 'Belum ada deskripsi'}</p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="inline" title={locationLabel}>{locationLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{profile.nomor || "-"}</span>
                      </div>
                    </div>
                  </div>
                 <div className="flex gap-2">
                    <Link href="/edit-profil">
                        <Button className="gap-2 w-full">
                          <Edit className="h-4 w-4" />
                          Edit Profil
                        </Button>
                    </Link>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleLogout}
                      className="flex-1"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pengalaman */}
            {profile.pengalaman && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Pengalaman
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{profile.pengalaman}</p>
                </CardContent>
              </Card>
            )}

            {/* Keahlian */}
            {profile.keahlian && Array.isArray(profile.keahlian)  && profile.keahlian.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Keahlian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.keahlian.map((skill : any, index : any) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg bg-primary/20 "
                      >
                        <span className="font-medium text-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;

