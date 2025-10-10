// lib/firebase.ts (or firebase.js)
import { initializeApp } from 'firebase/app';  // Import untuk menginisialisasi Firebase
import { getDatabase } from 'firebase/database';  // Import untuk Realtime Database
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLLpp4r7KMnS-CXoVsVF_ctcwGbYlKOaY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://jobin-51767-default-rtdb.asia-southeast1.firebasedatabase.app/",  // URL Realtime Database
  projectId: "jobin-51767",
  storageBucket: "",  // Kosongkan jika tidak menggunakan Firebase Storage
  messagingSenderId: "",  // Kosongkan jika tidak menggunakan FCM
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);  // Inisialisasi aplikasi Firebase

const database = getDatabase(app);
const auth = getAuth(app); 

export { auth,database };
