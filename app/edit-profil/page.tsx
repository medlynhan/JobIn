'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, MapPin, Briefcase, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useUsers from '@/hooks/useUsers';
import Link from 'next/link';
import { useRouter } from 'next/router';

const editProfileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  email: z.string().email("Email tidak valid").max(255, "Email maksimal 255 karakter"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit").max(15, "Nomor telepon maksimal 15 digit"),
  headline: z.string().min(3, "Headline minimal 3 karakter").max(100, "Headline maksimal 100 karakter"),
  location: z.string().min(2, "Lokasi minimal 2 karakter").max(100, "Lokasi maksimal 100 karakter"),
  experience: z.string().max(500, "Pengalaman maksimal 500 karakter").optional(),
  password: z.string().min(6, "Password minimal 6 karakter").optional().or(z.literal("")),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

const EditProfile = () => {
  const { profile, loading, updateUser } = useUsers();  // Mengambil data profil pengguna
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
  });

  const router = useRouter();

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // Foto preview
  const [photo, setPhoto] = useState<File | null>(null); // Foto yang diunggah

  useEffect(() => {
    if (profile) {
      // Mengisi nilai default form dengan data profil yang ada
      setValue('name', profile.username || '');
      setValue('email', profile.email || '');
      setValue('phone', profile.nomor || '');
      setValue('headline', profile.pekerjaan || '');
      setValue('location', profile.lokasi || '');
      setValue('experience', profile.pengalaman || '');
    }
  }, [profile, setValue]);


  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      await updateUser({
        username: data.name,
        email: data.email,
        password: data.password || "", 
        nomor: data.phone,
        pekerjaan: data.headline,
        lokasi: data.location,
        deskripsi: "", // Add additional fields if necessary
        keahlian: [], // Keahlian diambil nanti dari form skill, jika ada
        pengalaman: data.experience,
        foto: photoPreview || "",
      });
      toast.success("Profil berhasil diperbarui!");
      router.push('/profil');

    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui profil.");
    }
  };

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-muted/30 px-10 lg:px-20">
        <div className="container py-8">
          <div className="max-w-3xl mx-auto ">
            <Button
              variant="ghost"
              className="bg-background rounded-full  text-neutral-600 text-bold my-5 hover:bg-primary/30 hover:text-foreground rounded-sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Profil
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Edit Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Foto Profil */}
                  <div className="space-y-2">
                    <Label htmlFor="foto">Foto Profil</Label>
                    <div className="flex items-center gap-4">
                      <img
                        src={photoPreview || '/empty-profile.png'}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div className="flex-1">
                        <Input
                          id="foto"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Maksimal 5MB (JPG, PNG)
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      <User className="w-4 h-4 inline mr-2" />
                      Nama Lengkap
                    </Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Nomor Telepon
                    </Label>
                    <Input id="phone" {...register("phone")} placeholder="+62812345678" />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Headline */}
                  <div className="space-y-2">
                    <Label htmlFor="headline">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Headline Pekerjaan
                    </Label>
                    <Input
                      id="headline"
                      {...register("headline")}
                      placeholder="Contoh: Penjahit & Pattern Maker"
                    />
                    {errors.headline && (
                      <p className="text-sm text-destructive">{errors.headline.message}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Lokasi
                    </Label>
                    <Input
                      id="location"
                      {...register("location")}
                      placeholder="Contoh: Jakarta Selatan"
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive">{errors.location.message}</p>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <Label htmlFor="experience">Pengalaman</Label>
                    <Textarea
                      id="experience"
                      {...register("experience")}
                      placeholder="Ceritakan pengalaman kerja Anda..."
                      rows={3}
                    />
                    {errors.experience && (
                      <p className="text-sm text-destructive">{errors.experience.message}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password Baru (Opsional)</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                      placeholder="Kosongkan jika tidak ingin mengubah"
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.history.back()}
                      className="flex-1"
                    >
                      Batal
                    </Button>
                    <Button type="submit" className="flex-1">
                      Simpan Perubahan
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EditProfile;
