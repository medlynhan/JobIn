'use client';
import { useEffect, useState } from 'react';
import { auth, database } from '@/lib/firebase';
import { ref, onValue, set, update } from 'firebase/database';
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

type User = {
  username: string;
  email: string;
  password: string;
  nomor?: string;         
  pekerjaan?: string;     
  lokasi?: string;        
  deskripsi?: string;     
  keahlian?: string[];    
  pengalaman?: string;
  foto?: string;           
};

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<User | null>(null);

  // 1. Nonaktifkan langganan semua user untuk mempercepat load (hanya user saat ini)
  // Jika suatu halaman memang membutuhkan semua user, pertimbangkan membuat hook terpisah: useAllUsers()

  
  // 2. Pantau auth dan ambil profil user yang sedang login
  useEffect(() => {
    setLoading(true);
    let unsubscribeProfile: (() => void) | null = null;
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      // Bersihkan listener profil sebelumnya jika ada
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      if (firebaseUser) {
        const userRef = ref(database, 'users/' + firebaseUser.uid);
        unsubscribeProfile = onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setProfile((data as User) || null);
          setLoading(false);
        }, (error) => {
          console.error('Error fetching user profile:', error);
          setProfile(null);
          setLoading(false);
        });
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);


  //3.menambahkan user baru
  const addUser = async (user: User) => {
    try {
      const { email, username, password } = user;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;


      const userRef = ref(database, 'users/' + newUser.uid);
      await set(userRef, {
        username: username,
        email: email,
      });

      return newUser.uid;
    } catch (err) {
      setError('Terjadi kesalahan saat mendaftar pengguna');
      console.error('Error during user registration:', err);
    }
  };


  //4.menghapus user
  const deleteUser = async (userId: string) => {
    const userRef = ref(database, 'users/' + userId);
    try {
      await set(userRef, null); 
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Terjadi kesalahan saat menghapus pengguna');
    }
  };


  // Catatan: Profil kini dipantau langsung lewat node 'users/{uid}' di atas.


  //6.mengupdate profile user yang sedang login
  const updateUser = async (user: User) => {
    const currentUser = auth.currentUser;
    if (currentUser && profile) {
      const userRef = ref(database, 'users/' + currentUser.uid);
      try {
        // Update data pengguna di Realtime Database
        await update(userRef, {
          username: user.username,
          email: user.email,
          nomor: user.nomor,
          pekerjaan: user.pekerjaan,
          lokasi: user.lokasi,
          deskripsi: user.deskripsi,
          keahlian: user.keahlian,
          pengalaman: user.pengalaman,
          foto: user.foto,
        });

        // Setelah update, kita simpan data profil baru
        setProfile({ ...profile, ...user });
      } catch (err) {
        setError('Terjadi kesalahan saat memperbarui profil');
        console.error('Error updating user profile:', err);
      }
    }
  };

  // 6️ Logout user dari Firebase Auth
  const logoutUser = async () => {
    try {
      await signOut(auth);
      setProfile(null); // Bersihkan data profil lokal
      return true;
    } catch (err) {
      console.error('Error saat logout:', err);
      setError('Gagal logout dari Firebase');
      return false;
    }
  };



  return { users, profile, loading, error, addUser, deleteUser, updateUser,logoutUser };
};

export default useUsers;
