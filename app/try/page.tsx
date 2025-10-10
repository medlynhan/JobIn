'use client';  // Ensure this is a client component
import { useState } from 'react';
import useUsers from '@/hooks/useUsers';  // Import custom hook

const Home = () => {
  const { users, loading, addUser, deleteUser } = useUsers();  // Use the custom hook

  // Render loading state initially on the client
  if (loading) {
    return <div className='.loading-page'>Loading...</div>;  // Or some other placeholder
  }

  return (
    <div>
      <h1>Daftar Pengguna</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.location}
            <button onClick={() => deleteUser(user.name)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addUser({ name: 'New User', location: 'Unknown' })}>
        Add User
      </button>
    </div>
  );
};

export default Home;
