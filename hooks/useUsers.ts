'use client';
import { useEffect, useState } from 'react';
import { auth,database } from '@/lib/firebase';
import { ref, onValue, set, update } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
  const [profile, setProfile] = useState<any>(null);

  //1.ambil semua user dari database
  useEffect(() => {
    const usersRef = ref(database, 'users');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(Object.values(data)); 
      }
      setLoading(false); 
    });

    return () => {
      
    };
  }, []);

  
  //2.ambil user yang sedang login
  useEffect(() => {
    const usersRef = ref(database, 'users');
    const currentUser = auth.currentUser;  

    if (currentUser) {
      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        const userData: User[] = Object.values(data);  

        
        const loggedInUser = userData.find((user) => user.email === currentUser.email);
        if (loggedInUser) {
          setProfile(loggedInUser); 
        }

        setLoading(false);  
      });
    } else {
      setLoading(false); 
    }

    return () => {
      
    };
  }, [users]);


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


  //5.ambil profile user yang sedang login
  useEffect(() => {
    const currentUser = auth.currentUser;  
    if (currentUser) {
      const userProfile = users.find(user => user.email === currentUser.email);
      setProfile(userProfile); 
    }
  }, [users]); 


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

  return { users, profile, loading, error, addUser, deleteUser, updateUser };
};

export default useUsers;
