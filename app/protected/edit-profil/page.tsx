'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Phone, Briefcase, ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useUsers from '@/hooks/useUsers';
import { useRouter } from 'next/navigation';
import { useUserLocation } from "@/hooks/useUserLocation";
import Loading from '@/components/Loading';

const editProfileSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit").max(15, "Nomor telepon maksimal 15 digit"),
  headline: z.string().min(3, "Headline minimal 3 karakter").max(100, "Headline maksimal 100 karakter"),
  experience: z.string().max(500, "Pengalaman maksimal 500 karakter").optional(),
  description: z.string().max(1000, "Deskripsi maksimal 1000 karakter").optional(),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

const EditProfile = () => {
  const { profile, loading, updateUser } = useUsers();
  const { label: locationLabel } = useUserLocation();

  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string>('/empty-profile.png');
  const [photo, setPhoto] = useState<File | null>(null);

  // Saat data profil tersedia, isi form dan tampilkan foto
  useEffect(() => {
    if (profile) {
      setValue('name', profile.username || '');
      setValue('phone', profile.nomor || '');
      setValue('headline', profile.pekerjaan || '');
      setValue('experience', profile.pengalaman || '');
      setValue('description', profile.deskripsi || '');
      setSelectedSkills(profile.keahlian || []);
      setPhotoPreview(profile.foto || '/empty-profile.png');
    }
  }, [profile, setValue]);

  // Upload foto dan tampilkan preview
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Ubah keahlian yang dipilih
  const handleSkillChange = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  //Saat submit
  const onSubmit = async (data: EditProfileFormData) => {
    try {
      await updateUser({
        username: data.name,
        email: profile?.email || '',
        password: profile?.password || '',
        nomor: data.phone,
        pekerjaan: data.headline,
        lokasi: profile?.lokasi || '',
        deskripsi: data.description || '',
        keahlian: selectedSkills,
        pengalaman: data.experience,
        foto: photoPreview || '',
      });

      toast.success('Profil berhasil diperbarui!');
      router.push('/protected/profil');
    } catch (error) {
      console.error(error);
      toast.error('Terjadi kesalahan saat memperbarui profil.');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-muted/30 px-10 lg:px-20">
        <div className="container py-8">
          <div className="max-w-3xl mx-auto ">
            <Button
              variant="ghost"
              className="bg-background rounded-full text-neutral-600 my-5 hover:bg-background hover:text-foreground transition-colors"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Edit Profil</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* 🔹 Foto Profil */}
                  <div className="space-y-2">
                    <Label htmlFor="foto">Foto Profil</Label>
                    <div className="flex items-center gap-4">
                      <img
                        src={photoPreview}
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

                  {/* 🔹 Nama */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      <User className="w-4 h-4 inline mr-2" />
                      Nama Lengkap
                    </Label>
                    <Input id="name" {...register('name')} />
                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                  </div>

                  {/* 🔹 Email (readonly) */}
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={profile?.email || ''} disabled />
                  </div>

                  {/* 🔹 Nomor Telepon */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Nomor Telepon
                    </Label>
                    <Input id="phone" {...register('phone')} placeholder="+62812345678" />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                  </div>

                  {/* 🔹 Headline */}
                  <div className="space-y-2">
                    <Label htmlFor="headline">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Headline Pekerjaan
                    </Label>
                    <Input id="headline" {...register('headline')} placeholder="Contoh: Penjahit & Pattern Maker" />
                    {errors.headline && <p className="text-sm text-destructive">{errors.headline.message}</p>}
                  </div>

                  {/* 🔹 Lokasi (readonly) */}
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Lokasi
                    </Label>
                    <Input value={profile?.lokasi || 'Tidak diketahui'} disabled />
                  </div>

                  {/* 🔹 Pengalaman */}
                  <div className="space-y-2">
                    <Label htmlFor="experience">Pengalaman</Label>
                    <Textarea id="experience" {...register('experience')} placeholder="Ceritakan pengalaman kerja Anda..." rows={3} />
                    {errors.experience && <p className="text-sm text-destructive">{errors.experience.message}</p>}
                  </div>

                  {/* 🔹 Deskripsi */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi Diri</Label>
                    <Textarea id="description" {...register('description')} placeholder="Ceritakan sedikit tentang diri Anda..." rows={3} />
                    {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                  </div>

                  {/* 🔹 Keahlian */}
                  <div className="space-y-2">
                    <Label>Keahlian</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Menjahit', 'Perbaikan', 'Memasak', 'Pekerjaan Rumah Tangga', 'Laundry', 'Melukis'].map(skill => (
                        <div key={skill} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`skill-${skill}`}
                            checked={selectedSkills.includes(skill)}
                            onChange={() => handleSkillChange(skill)}
                          />
                          <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 🔹 Tombol Simpan */}
                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => window.history.back()} className="flex-1">
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
