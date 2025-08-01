"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";

const AdminLoginPage: React.FC = () => {
  const router = useRouter();
    const pathname = usePathname();
  const { login } = useAuth(); 

  // 🔐 Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  // useEffect(() => {
  //   const token = Cookies.get("adminToken") || Cookies.get("teacherToken");

  //   if (token) {
  //     const user = JSON.parse(localStorage.getItem("user") || "{}");

  //     if (user.role === "admin" || user.role === "superadmin")  {
  //       router.push("/auth/Dashboard/adminDashboard");
  //     } else if (user.role === "teacher") {
  //       router.push("/auth/Dashboard/teacherDashboard");
  //     }
  //   }
  // }, []);

  

useEffect(() => {
    const token = Cookies.get("adminToken") || Cookies.get("teacherToken");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userRole = user?.role;

      // Prevent redirect loop if already on correct page
      if (
        (userRole === "admin" || userRole === "superadmin") &&
        (pathname as string) !== "/auth/Dashboard/adminDashboard"
      ) {
        router.push("/auth/Dashboard/adminDashboard");
      } else if (
        userRole === "teacher" &&
        (pathname as string) !== "/auth/Dashboard/teacherDashboard"
      ) {
        router.push("/auth/Dashboard/teacherDashboard");
      } else if (
      userRole === "user" &&
      pathname !== "/auth/Dashboard/userDashboard"
    ) {
      router.push("/auth/Dashboard/userDashboard");
    }
    }
  }, [pathname, router]);




// useEffect(() => {
//   const token = Cookies.get("adminToken") || Cookies.get("teacherToken");
//   const user = localStorage.getItem("user");

//   if (token && user) {
//     const { role } = JSON.parse(user);

//     if (role === "admin" || role === "superadmin") {
//       router.replace("/auth/Dashboard/adminDashboard");
//     } else if (role === "teacher") {
//       router.replace("/auth/Dashboard/teacherDashboard");
//     }
//   } else {
//     Cookies.remove("adminToken");
//     Cookies.remove("teacherToken");
//   }
// }, []);




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      console.log("Login response data:", data);
          login(data.token, {
  _id: data._id || data.userId, 
  username: data.username,
  role: data.role,
});
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          email: data.email,
          role: data.role,
        })
      );

      if (data.role === "admin") {
        Cookies.set("adminToken", data.token, {
          expires: 30,
          secure: true,
          sameSite: "strict",
        });

        localStorage.setItem("adminToken", data.token);
        console.log(
          "Admin token saved:",
          Cookies.get("adminToken"),
          localStorage.getItem("adminToken")
        );
      } else if (data.role === "teacher") {
        Cookies.set("teacherToken", data.token, {
          expires: 30,
          secure: true,
          sameSite: "strict",
        });

        localStorage.setItem("teacherToken", data.token);
        localStorage.setItem("teacherId", data.userId);
        console.log(
          "Teacher token saved:",
          Cookies.get("teacherToken"),
          localStorage.getItem("teacherToken")
        );
      }

      toast.success("Login successful!");

      setTimeout(() => {
        if (data.role === "admin") {
          router.push("/auth/Dashboard/adminDashboard");
        } else if (data.role === "teacher") {
          router.push("/auth/Dashboard/teacherDashboard");
        } else {
          router.push("/auth/Dashboard/userDashboard");
        }
      }, 10);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 px-3">
      <Toaster position="top-right" />

      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-3">
          <Image src="/logo.png" alt="Logo" width={90} height={80} />
          <p className="text-muted">Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
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
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                />
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-end mb-2">
            <Link
              href="/auth/forgot-password"
              className="text-danger text-decoration-none"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Back to Home */}
          <p className="text-center">
            <Link href="/" className="text-primary text-decoration-none">
              ← Back to Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;




// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "@/app/context/AuthContext";
// import { usePathname } from "next/navigation";

// const AdminLoginPage: React.FC = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { login } = useAuth(); // custom context hook

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // ✅ Utility: Set token in cookie and localStorage
//   const setToken = (role: string, token: string, userId?: string) => {
//     const tokenKey = `${role}Token`;
//     Cookies.set(tokenKey, token, { expires: 30, secure: true, sameSite: "strict" });
//     localStorage.setItem(tokenKey, token);
//     if (userId) localStorage.setItem("userId", userId); // for teacher
//   };

//   // ✅ Redirect if already logged in
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     const role = user?.role;

//     if (!role) return;

//     const redirectMap: Record<string, string> = {
//       admin: "/auth/Dashboard/adminDashboard",
//       superadmin: "/auth/Dashboard/adminDashboard",
//       teacher: "/auth/Dashboard/teacherDashboard",
//       user: "/auth/Dashboard/userDashboard",
//     };

//     const target = redirectMap[role];
//     if (target && pathname !== target) {
//       router.push(target);
//     }
//   }, [pathname, router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { data } = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       login(data.token, {
//   _id: data._id || data.userId, 
//   username: data.username,
//   role: data.role,
// });


//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           username: data.username,
//           email: data.email,
//           role: data.role,
//         })
//       );

//       // ✅ Save tokens based on role
//       setToken(data.role, data.token, data.userId);

//       toast.success("Login successful!");

//       // ✅ Redirect
//       setTimeout(() => {
//         if (data.role === "admin" || data.role === "superadmin") {
//           router.push("/auth/Dashboard/adminDashboard");
//         } else if (data.role === "teacher") {
//           router.push("/auth/Dashboard/teacherDashboard");
//         } else if (data.role === "user") {
//           router.push("/auth/Dashboard/userDashboard");
//         }
//       }, 10);
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Login failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container d-flex align-items-center justify-content-center min-vh-100 px-3">
//       <Toaster position="top-right" />
//       <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
//         <div className="text-center mb-3">
//           <Image src="/logo.png" alt="Logo" width={90} height={80} />
//           <p className="text-muted">Please login to continue</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* Email Input */}
//           <div className="mb-3">
//             <label className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="admin@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               autoComplete="email"
//             />
//           </div>

//           {/* Password Input */}
//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <div className="position-relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="form-control"
//                 placeholder="********"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoComplete="current-password"
//               />
//               <span
//                 onClick={() => setShowPassword(!showPassword)}
//                 style={{
//                   position: "absolute",
//                   top: "50%",
//                   right: "10px",
//                   transform: "translateY(-50%)",
//                   cursor: "pointer",
//                   color: "#999",
//                 }}
//               >
//                 <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
//               </span>
//             </div>
//           </div>

//           {/* Submit Button */}
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

//           {/* Forgot Password Link */}
//           <div className="text-end mb-2">
//             <Link
//               href="/auth/forgot-password"
//               className="text-danger text-decoration-none"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Back to Home */}
//           <p className="text-center">
//             <Link href="/" className="text-primary text-decoration-none">
//               ← Back to Home
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLoginPage;
