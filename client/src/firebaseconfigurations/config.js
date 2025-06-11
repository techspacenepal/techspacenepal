// firebaseconfigurations/config.ts

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLu9UnNl_58R2xirZSrdiy0rPFs1qxMz0",
  authDomain: "fir-authentication-ef83f.firebaseapp.com",
  projectId: "fir-authentication-ef83f",
  storageBucket: "fir-authentication-ef83f.firebasestorage.app",
  messagingSenderId: "668675062129",
  appId: "1:668675062129:web:e8f3b027aab97368fc9ed0",
  measurementId: "G-4T9PRNYB5G"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
