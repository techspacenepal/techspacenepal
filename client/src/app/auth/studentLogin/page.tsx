// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "@/app/context/AuthContext";

// import { signInWithPopup } from "firebase/auth";
// import {
//   auth,
//   facebookProvider,
//   githubProvider,
//   googleProvider,
// } from "@/firebaseconfigurations/config";
// import { Facebook, GithubIcon } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";

// const AdminLoginPage: React.FC = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { login } = useAuth();

//   //   const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   try {
//   //     const { data } = await axios.post("http://localhost:5000/api/students/login", {
//   //       email,
//   //       password,
//   //     });

//   //     if (!data.token) throw new Error("No token received");

//   //     login(data.token, data.role);
//   //     Cookies.set("studentToken", data.token);
//   //     localStorage.setItem("studentToken", data.token);
//   //     localStorage.setItem("user", JSON.stringify({ username: data.username, role: data.role }));

//   //     toast.success("Login successful! Redirecting...");

//   //     setTimeout(() => {
//   //       router.push(data.role === "student" ? "/studentdashboard" : "/studentdashboard");
//   //     }, 100);
//   //   } catch (error: any) {
//   //     toast.error(error.response?.data?.message || error.message || "Login failed!");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/students/login",
//         {
//           email,
//           password,
//         }
//       );

//       if (!data.token) throw new Error("No token received");

//       login(data.token, data.role);

//       Cookies.set("studentToken", data.token);
//       localStorage.setItem("studentToken", data.token);

//       // यहाँ studentId save गरौं (data.student मा ID आउँछ भनी मान्दै)
//       // backend बाट login response मा student info पनि आउनुपर्छ जस्तो छ
//       if (data.student && data.student._id) {
//         localStorage.setItem("studentId", data.student._id);
//       } else if (data._id) {
//         // कहिलेकाहीं data मा _id सिधै आउन सक्छ
        
//       } else {
//         console.warn("Student ID not found in login response");
//       }

//       localStorage.setItem(
//         "user",
//         JSON.stringify({ username: data.username, role: data.role })
//       );

//       toast.success("Login successful! Redirecting...");

//       setTimeout(() => {
//         router.push(
//           data.role === "student" ? "/studentdashboard" : "/studentdashboard"
//         );
//       }, 100);
//     } catch (error: any) {
//       toast.error(
//         error.response?.data?.message || error.message || "Login failed!"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   const handleFirebaseGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       toast.success("Google login successful!");

//       const { data } = await axios.post(
//         "http://localhost:5000/api/students/google-login",
//         {
//           email: user.email,
//           name: user.displayName,
//         }
//       );

//       if (!data.token) throw new Error("No token received");

//       login(data.token, data.role);
//       Cookies.set("studentToken", data.token);
//       localStorage.setItem("studentToken", data.token);

//       if (data.student && data.student._id) {
//         localStorage.setItem("studentId", data.student._id);
//       } else if (data._id) {
//         localStorage.setItem("studentId", data._id);
//       } else {
//         console.warn("Student ID not found in Google login response");
//       }

//       localStorage.setItem(
//         "user",
//         JSON.stringify({ username: data.username, role: data.role })
//       );

//       setTimeout(() => {
//         router.push(
//           data.role === "student" ? "/studentdashboard" : "/studentdashboard"
//         );
//       }, 100);
//     } catch (error) {
//       console.error("Firebase error:", error);
//       toast.error("Firebase Google login failed!");
//     }
//   };

//   const handleFirebaseGithubLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, githubProvider);
//       const user = result.user;

//       toast.success("Github login successful!");

//       const { data } = await axios.post(
//         "http://localhost:5000/api/students/github-login",
//         {
//           email: user.email,
//           name: user.displayName,
//         }
//       );

//       // ✅ AuthContext को login function call गर्नुहोस्
//       login(data.token, data.role);
//       Cookies.set("studentToken", data.token);
//       localStorage.setItem("studentToken", data.token);

//       localStorage.setItem(
//         "user",
//         JSON.stringify({ username: data.username, role: data.role })
//       );

//       setTimeout(() => {
//         if (data.role === "student") {
//           router.push("/studentdashboard");
//         } else {
//           router.push("/studentdashboard");
//         }
//       }, 100);
//     } catch (error) {
//       console.error("Firebase error:", error);
//       toast.error(" Github login failed!");
//     }
//   };

//   const handleFirebaseFacebookLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, facebookProvider);
//       const user = result.user;

//       toast.success("Facebook login successful!");

//       console.log("Facebook user:", user); // 👈 Add this line

//       const email = user.email || `${user.uid}@facebook.com`;
//       const name = user.displayName || "FacebookUser";

//       const { data } = await axios.post(
//         "http://localhost:5000/api/students/facebook-login",
//         {
//           email,
//           name,
//         }
//       );

//       login(data.token, data.role);
//       Cookies.set("studentToken", data.token);
//       localStorage.setItem("studentToken", data.token);

//       localStorage.setItem(
//         "user",
//         JSON.stringify({ username: data.username, role: data.role })
//       );

//       setTimeout(() => {
//         router.push(
//           data.role === "student" ? "/studentdashboard" : "/studentdashboard"
//         );
//       }, 100);
//     } catch (error) {
//       console.error("Facebook login failed:", error);
//       toast.error("Facebook login failed!");
//     }
//   };

//   const [showPassword, setShowPassword] = useState(false);


//   return (
//     <div className="container d-flex align-items-center justify-content-center min-vh-100 px-3">
//       <Toaster position="top-right" />
//       <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
//         <div className="text-center mb-3">
//           <Image
//             src="/logo.png"
//             alt=" Logo"
//             width={90}
//             height={80}
//             className="mb-3 border rounded"
//           />
//           <p className="text-muted">Please login to continue</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email address
//             </label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               placeholder="admin@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               autoComplete="email"
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <div className="position-relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="form-control"
//                 id="password"
//                 placeholder="********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoComplete="current-password"
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="password-toggle-icon"
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   right: "10px",
//                   transform: "translateY(-50%)",
//                   cursor: "pointer",
//                   color: "#999",
//                 }}
//               >
//                 <i
//                   className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
//                 />
//               </span>
//             </div>
//           </div>

//           <div className="d-grid mb-3">
//             <button type="submit" className="btn btn-danger" disabled={loading}>
//               {loading ? (
//                 <>
//                   <span
//                     className="spinner-border spinner-border-sm me-2"
//                     role="status"
//                     aria-hidden="true"
//                   ></span>
//                   Logging in...
//                 </>
//               ) : (
//                 "Login"
//               )}
//             </button>
//           </div>

//           <div className="text-end mb-2">
//             <Link
//               href="/auth/studentForgotPassword"
//               className="text-danger text-decoration-none"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <div className="d-flex gap-3 my-3 justify-content-center align-items-center flex-wrap">
//             <button
//               className="btn btn-outline-danger d-flex justify-content-center align-items-center"
//               onClick={handleFirebaseGoogleLogin}
//               type="button"
//             >
//               <FcGoogle size={24} />
//             </button>

//             <button
//               className="btn btn-outline-danger d-flex justify-content-center align-items-center"
//               onClick={handleFirebaseGithubLogin}
//               type="button"
//             >
//               <GithubIcon size={22} />
//             </button>

//             <button
//               className="btn btn-outline-danger d-flex justify-content-center align-items-center"
//               onClick={handleFirebaseFacebookLogin}
//               type="button"
//             >
//               <Facebook size={22} />
//             </button>
//           </div>

//           <p className="text-center">
//             <Link href="/" className="text-primary text-decoration-none">
//               ← Back to Home
//             </Link>
//           </p>

//           <p className="text-center">
//             <Link
//               href="/auth/studentRegister"
//               className="text-primary text-decoration-none"
//             >
//               ← Register
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLoginPage;






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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/login",
        { email, password },
        { withCredentials: true }
      );

      const token = res.data.token;
      if (!token) throw new Error("No token received");

      Cookies.set("studentToken", token, {
        expires: 1,
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

      login(token, res.data.role);
      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/studentdashboard");
      }, 300);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: any,
    endpoint: string,
    fallbackName = "User"
  ) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const email = user.email || `${user.uid}@provider.com`;
      const name = user.displayName || fallbackName;

      const { data } = await axios.post(
        `http://localhost:5000/api/students/${endpoint}`,
        { email, name }
      );

      Cookies.set("studentToken", data.token, {
        expires: 1,
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

      login(data.token, data.role);
      toast.success(`${endpoint.split("-")[0]} login successful!`);
      setTimeout(() => router.push("/studentdashboard"), 30);
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
          <Image
            src="/logo.png"
            alt="Logo"
            width={90}
            height={80}
            className="mb-3 border rounded"
          />
          <h5 className="fw-bold">Student Login</h5>
          <p className="text-muted">Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="student@example.com"
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
