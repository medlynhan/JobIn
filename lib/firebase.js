import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLLpp4r7KMnS-CXoVsVF_ctcwGbYlKOaY",
  authDomain: "jobin-51767.firebaseapp.com",
  databaseURL: "https://jobin-51767-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jobin-51767",
  storageBucket: "jobin-51767.firebasestorage.app",
  messagingSenderId: "839343385585",
  appId: "1:839343385585:web:36665b007e77a0cd8cb250",
  measurementId: "G-948947GSD4",
};

// ✅ Initialize Firebase app only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);

// ✅ Initialize Analytics only on the client (to avoid “window is not defined”)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
