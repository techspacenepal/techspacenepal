// firebaseconfigurations/config.ts

import { initializeApp } from "firebase/app";
import {  FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUljBZOhvOQuXRzdQPiiR-4gKUeQMVpJE",
  authDomain: "teachspacenepal.firebaseapp.com",
  projectId: "teachspacenepal",
  storageBucket: "teachspacenepal.firebasestorage.app",
  messagingSenderId: "681324801531",
  appId: "1:681324801531:web:2b22133ab04e6060e6af5e",
  measurementId: "G-VQ1RQ2YQRC"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
