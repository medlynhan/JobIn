import { useEffect, useState } from 'react';
import { auth,database } from '@/lib/firebase';
import { ref, onValue, set, remove } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type User = {
  username: string;
  email: string;
  password: string;

};

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const usersRef = ref(database, 'users');

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(Object.values(data)); // Convert Firebase object to array
      }
      setLoading(false); // Hide loading state once data is fetched
    });

    return () => {
      // Cleanup Firebase listener
    };
  }, []);

  const addUser = async (user: User) => {
    try {
      const { email, username, password } = user;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Menyimpan data pengguna ke Realtime Database
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



  const deleteUser = async (userId: string) => {
    const userRef = ref(database, 'users/' + userId);
    try {
      await set(userRef, null); // Menghapus data pengguna
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Terjadi kesalahan saat menghapus pengguna');
    }
  };

  return { users, loading, error, addUser, deleteUser };
};

export default useUsers;
