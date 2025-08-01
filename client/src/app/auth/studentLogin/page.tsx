
"use client";

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "@/firebaseconfigurations/config";
import { Facebook, GithubIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const StudentLoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Form Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const deviceInfo = navigator.userAgent;  // <-- get userAgent

      const res = await axios.post(
        "http://localhost:5000/api/students/login",
         { email, password, deviceInfo }, 
        { withCredentials: true }
      );

      const token = res.data.token;
      if (!token) throw new Error("No token received");

      Cookies.set("studentToken", token, {
        expires: 30,
        path: "/",
        sameSite: "lax",
        secure: false,
      });

      localStorage.setItem("studentToken", token);
      localStorage.setItem("studentId", res.data?.student?._id || res.data?._id);
      localStorage.setItem(
        "user",
        JSON.stringify({ username: res.data.username, role: res.data.role })
      );

      // login(token, res.data.role);
   login(token, {
  _id: res.data.student?._id || res.data._id,
  username: res.data.username,
  role: res.data.role,
});

      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/studentdashboard");
      }, 300);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed!");
      toast.error(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  // Handle Social Login
//   const handleSocialLogin = async (
//     provider: any,
//     endpoint: string,
//     fallbackName = "Student"
//   ) => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       const email = user.email || `${user.uid}@facebook.com`;
//       const name = user.displayName || fallbackName;

//       const { data } = await axios.post(
//         `http://localhost:5000/api/students/${endpoint}`,
//         { email, name }
//       );

//       Cookies.set("studentToken", data.token, {
//         expires: 30,
//         path: "/",
//         sameSite: "lax",
//         secure: false,
//       });

//       localStorage.setItem("studentToken", data.token);
//       localStorage.setItem("studentId", data?.student?._id || data?._id);
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ username: data.username, role: data.role })
//       );

//       // login(data.token, data.role);
//       login(data.token, {
//   username: data.username,
//   role: data.role,
// });

//       toast.success(`${endpoint.split("-")[0]} login successful!`);

//       setTimeout(() => router.push("/studentdashboard"), 100);
//     } catch (error) {
//       console.error(`${endpoint} login failed`, error);
//       toast.error(`${endpoint} login failed!`);
//     }
//   };
const handleSocialLogin = async (
  provider: any,
  endpoint: string,
  fallbackName = "Student"
) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const uid = user.uid; // ✅ Firebase UID (important for Facebook login)

    // Handle missing email gracefully (especially for Facebook)
    const email = user.email || user.providerData?.[0]?.email || `${uid}@facebook.com`;
    const sourceMap: { [key: string]: string } = {
      "google-login": "Google",
      "github-login": "Github",
      "facebook-login": "Facebook",
    };

    const source = sourceMap[endpoint] || "Social";

    const deviceInfo = `${navigator.userAgent} | Source: ${source}`;

    const { data } = await axios.post(
      `http://localhost:5000/api/students/${endpoint}`,
      {
        email,
        name,
        uid, 
        deviceInfo,
      }
    );

    // Store token and user data
    Cookies.set("studentToken", data.token, {
      expires: 30,
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    localStorage.setItem("studentToken", data.token);
    localStorage.setItem("studentId", data?.student?._id || data?._id);
    localStorage.setItem(
      "user",
      JSON.stringify({ username: data.username, role: data.role })
    );

   login(data.token, {
  _id: data.student?._id || data._id,
  username: data.username,
  role: data.role,
});


    toast.success(`${endpoint.split("-")[0]} login successful!`);
    setTimeout(() => router.push("/studentdashboard"), 100);
  } catch (error) {
    console.error(`${endpoint} login failed`, error);
    toast.error(`${endpoint} login failed!`);
  }
};





  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 px-3">
      <Toaster position="top-right" />
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-3">
          <Image src="/logo.png" alt="Logo" width={90} height={80} className="mb-2 border rounded" />
          <h5 className="fw-bold">Student Login</h5>
          <p className="text-muted">Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
              </span>
            </div>
          </div>

          {error && <div className="text-danger mb-3">{error}</div>}

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

          <div className="text-end mb-2">
            <Link href="/auth/studentForgotPassword" className="text-danger text-decoration-none">
              Forgot Password?
            </Link>
          </div>

          <div className="d-flex gap-3 my-3 justify-content-center align-items-center flex-wrap">
            <button
              className="btn btn-outline-danger"
              onClick={() => handleSocialLogin(googleProvider, "google-login")}
              type="button"
            >
              <FcGoogle size={24} />
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleSocialLogin(githubProvider, "github-login")}
              type="button"
            >
              <GithubIcon size={22} />
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleSocialLogin(facebookProvider, "facebook-login", "FacebookUser")}
              type="button"
            >
              <Facebook size={22} />
            </button>
          </div>

          <p className="text-center">
            <Link href="/" className="text-primary text-decoration-none">
              ← Back to Home
            </Link>
          </p>

          <p className="text-center">
            <Link href="/auth/studentRegister" className="text-primary text-decoration-none">
              Register Now →
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default StudentLoginPage;
