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

const Profile = () => {
  const { profile, loading } = useUsers(); 

  if (loading) {
    return <div className="loading-page">Loading...</div>;  
  }

  if (!profile) {
    return <div className="loading-page">Profile tidak ditemukan</div>;  
  }

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
                    <p className="text-xl text-muted-foreground mb-4">{profile.deskripsi || 'Belum ada deskripsi'}</p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.lokasi || "-"}</span>
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
                    <Link href="/">
                      <Button variant="outline" className="gap-2 w-full">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </Link>
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
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                      >
                        <span className="font-medium text-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferensi Pekerjaan */}
            {profile.pekerjaan && (
              <Card>
                <CardHeader>
                  <CardTitle>Preferensi Pekerjaan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tipe Pekerjaan</p>
                      <p className="font-medium text-foreground">{profile.pekerjaan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Lokasi yang Diinginkan</p>
                      <p className="font-medium text-foreground">{profile.lokasi}</p>
                    </div>
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

