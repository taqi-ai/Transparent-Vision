// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBgEuLxiYMhWRKT4xGRlzBptropZOoYROw",
  authDomain: "transparentvisionwait.firebaseapp.com",
  databaseURL: "https://transparentvisionwait-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "transparentvisionwait",
  storageBucket: "transparentvisionwait.firebasestorage.app",
  messagingSenderId: "712412008619",
  appId: "1:712412008619:web:dade40e67df30fa33627ee",
  measurementId: "G-5S9SCC8QD2"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export database (Realtime DB)
export const db = getDatabase(app);
