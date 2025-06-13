"use client";

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

import {  signInWithPopup } from "firebase/auth";
import { auth,    facebookProvider,    githubProvider, googleProvider } from "@/firebaseconfigurations/config";
import { Facebook, GithubIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";




const AdminLoginPage: React.FC = () => {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  // Form-based login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      login(data.token, data.role);
      Cookies.set("adminToken", data.token);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        router.push(data.role === "admin" ? "/Dashboard/adminDashboard" : "/Dashboard/userDashboard");
      }, 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };


  // -----google login in user --------

  //   const handleFirebaseGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);

  //     const user = result.user;

  //     console.log("User info:", user);

  //     // Add user info to localStorage / redirect as needed
  //     toast.success("Firebase Google login successful!");

  //     setTimeout(() => {
  //       router.push("/Dashboard/adminDashboard"); // ✅ Use Next.js router here
  //     }, 1500);

  //   } catch (error) {
  //     console.error("Firebase error:", error);
  //     toast.error("Firebase Google login failed!");
  //   }
  // };

  //  const handleFirebaseGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;

  //     toast.success("  Google login successful!");

  //     // Send to backend to get user role
  //     const { data } = await axios.post(
  //       "http://localhost:5000/api/auth/google-login",
  //       {
  //         email: user.email,
  //         name: user.displayName,
  //       }
  //     );

  //     const userRole = data.role;

  //     if (userRole === "admin") {
  //       router.push("/Dashboard/adminDashboard");
  //     } else {
  //       router.push("/Dashboard/userDashboard");
  //     }
  //   } catch (error) {
  //     console.error("Firebase error:", error);
  //     toast.error("Firebase Google login failed!");
  //   }
  // };

  //-----Github login
  
  
  

  const handleFirebaseGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    toast.success("Google login successful!");

    const { data } = await axios.post("http://localhost:5000/api/auth/google-login", {
      email: user.email,
      name: user.displayName,
    });

    // ✅ AuthContext को login function call गर्नुहोस्
    login(data.token, data.role);

    Cookies.set("adminToken", data.token);
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));

    setTimeout(() => {
      if (data.role === "admin") {
        router.push("/Dashboard/adminDashboard");
      } else {
        router.push("/Dashboard/userDashboard");
      }
    }, 1500);

  } catch (error) {
    console.error("Firebase error:", error);
    toast.error("Firebase Google login failed!");
  }
};



  
  // const handleFirebaseGithubLogin = async () => {
  // try {
  //   const result = await signInWithPopup(auth, googleProvider);
  //   const user = result.user;

  //   toast.success("Github login successful!");

  //   const { data } = await axios.post("http://localhost:5000/api/auth/github-login", {
  //     email: user.email,
  //     name: user.displayName,
  //   });

  //   // ✅ AuthContext को login function call गर्नुहोस्
  //   login(data.token, data.role);

  //   Cookies.set("adminToken", data.token);
  //   localStorage.setItem("adminToken", data.token);
  //   localStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));

  //   setTimeout(() => {
  //     if (data.role === "admin") {
  //       router.push("/Dashboard/adminDashboard");
  //     } else {
  //       router.push("/Dashboard/userDashboard");
  //     }
  //   }, 1500);

  // } catch (error) {
  //   console.error("Firebase error:", error);
  //   toast.error("Firebase Github login failed!");
  // }
  // };
 
  const handleFirebaseGithubLogin = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;

    toast.success("Github login successful!");

    const { data } = await axios.post("http://localhost:5000/api/auth/google-login", {
      email: user.email,
      name: user.displayName,
    });

    // ✅ AuthContext को login function call गर्नुहोस्
    login(data.token, data.role);

    Cookies.set("adminToken", data.token);
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));

    setTimeout(() => {
      if (data.role === "admin") {
        router.push("/Dashboard/adminDashboard");
      } else {
        router.push("/Dashboard/userDashboard");
      }
    }, 1500);

  } catch (error) {
    console.error("Firebase error:", error);
    toast.error(" Github login failed!");
  }
};



const handleFirebaseFacebookLogin = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    toast.success("Facebook login successful!");
 
  console.log("Facebook user:", user); // 👈 Add this line
  
    const email = user.email || `${user.uid}@facebook.com`;
    const name = user.displayName || "FacebookUser";

    const { data } = await axios.post("http://localhost:5000/api/auth/facebook-login", {
      email,
      name,
    });

    login(data.token, data.role);
    Cookies.set("adminToken", data.token);
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));

    setTimeout(() => {
      router.push(data.role === "admin" ? "/Dashboard/adminDashboard" : "/Dashboard/userDashboard");
    }, 1500);
  } catch (error) {
    console.error("Facebook login failed:", error);
    toast.error("Facebook login failed!");
  }
};





 
  const [showPassword, setShowPassword] = useState(false);
  //--------------------------





  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 px-3">
      <Toaster position="top-right" />
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-3">
          <Image
            src="/logo.jpg"
            alt="Krisha Logo"
            width={90}
            height={80}
            className="mb-3 border rounded"
          />
          <p className="text-muted">Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-icon"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#999',
                }}
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
              </span>
            </div>
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

          <div className="text-end mb-2">
            <Link href="/auth/forgot-password" className="text-danger text-decoration-none">
              Forgot Password?
            </Link>
          </div>

             <div className="d-flex gap-3 my-3 justify-content-center align-items-center flex-wrap">
                    <button
                      className="btn btn-outline-danger d-flex justify-content-center align-items-center"
                      onClick={handleFirebaseGoogleLogin}
                      type="button"
                    >
                      <FcGoogle size={24} />
                    </button>
          
                    <button
                      className="btn btn-outline-danger d-flex justify-content-center align-items-center"
                      onClick={handleFirebaseGithubLogin}
                      type="button"
                    >
                      <GithubIcon size={22} />
                    </button>

                    <button
                      className="btn btn-outline-danger d-flex justify-content-center align-items-center"
                      onClick={handleFirebaseFacebookLogin}
                      type="button"
                    >
                      <Facebook size={22} />
                    </button>
                  </div>

          <p className="text-center">
            <Link href="/" className="text-primary text-decoration-none">← Back to Home</Link>
          </p>
        </form>
      </div>
    </div>

  );
};

export default AdminLoginPage;
