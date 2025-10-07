// lib/firebase.ts (or firebase.js)
import { initializeApp } from 'firebase/app';  // Import untuk menginisialisasi Firebase
import { getDatabase } from 'firebase/database';  // Import untuk Realtime Database

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://jobin-51767-default-rtdb.asia-southeast1.firebasedatabase.app/",  // URL Realtime Database
  projectId: "jobin-51767",
  storageBucket: "",  // Kosongkan jika tidak menggunakan Firebase Storage
  messagingSenderId: "",  // Kosongkan jika tidak menggunakan FCM
  appId: "YOUR_APP_ID",
};

// Inisialisasi Firebase (Modular SDK)
const app = initializeApp(firebaseConfig);  // Inisialisasi aplikasi Firebase

// Mendapatkan referensi ke Realtime Database
const database = getDatabase(app);

export { database };
