// firebaseconfigurations/config.ts

import { initializeApp } from "firebase/app";
import {  FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB737apAqenke2EiH2jRc6DNHCmFINXhdM",
  authDomain: "fir-aunthentication-69cc9.firebaseapp.com",
  projectId: "fir-aunthentication-69cc9",
  storageBucket: "fir-aunthentication-69cc9.firebasestorage.app",
  messagingSenderId: "309631532216",
  appId: "1:309631532216:web:9cfec8cfeb3da73243c84d",
  measurementId: "G-C1W7YF4FYL"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
