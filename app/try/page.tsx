'use client';  // Ensure this is a client component
import { useEffect, useState } from 'react';
import { database } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

type User = {
  name: string;
  location: string;
};

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // Add a loading state

  useEffect(() => {
    const usersRef = ref(database, 'users');  // Firebase reference
    
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(Object.values(data));  // Convert Firebase object to array
      }
      setLoading(false);  // Data fetched, hide loading state
    });

    return () => {
      // Cleanup Firebase listener if needed (onValue automatically cleans up on unmount)
    };
  }, []);

  // Render loading state initially on the client
  if (loading) {
    return <div>Loading...</div>;  // Or some other placeholder
  }

  return (
    <div>
      <h1>Daftar Pengguna</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
