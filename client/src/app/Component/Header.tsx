// "use client";
// import Link from "next/link";
// import axios from "axios";
// import React, { useEffect, useRef, useState, } from "react";

// import { useAuth } from "../context/AuthContext";
// import { usePathname } from "next/navigation";
// import Image from 'next/image';

// export default function TopNavbar() {
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     const fetchClasses = () => {
//       axios
//         .get("http://localhost:5000/api/classes")
//         .then((res) => setClasses(res.data))
//         .catch((err) => console.error("Failed to fetch classes", err));
//     };

//     fetchClasses(); // Initial load
//     const interval = setInterval(fetchClasses, 100);

//     return () => clearInterval(interval); // cleanup
//   }, []);

//   // login vayesi matra dashboard dekhine
//   const { isAuthenticated, user } = useAuth();
//   ///-------

//   // Side menu javascript
//   useEffect(() => {
//     import("bootstrap/dist/js/bootstrap.bundle.min.js");

//     const toggleBtn = document.querySelector(".navbar-toggler");
//     const navCollapse = document.getElementById("navbarSupportedContent");

//     const createBackdrop = () => {
//       if (!document.querySelector(".custom-backdrop")) {
//         const backdrop = document.createElement("div");
//         backdrop.className = "custom-backdrop";
//         backdrop.addEventListener("click", closeMenu);
//         document.body.appendChild(backdrop);
//       }
//     };

//     const removeBackdrop = () => {
//       const backdrop = document.querySelector(".custom-backdrop");
//       if (backdrop) backdrop.remove();
//     };

//     const closeMenu = () => {
//       navCollapse?.classList.remove("show");
//       document.body.classList.remove("right-menu-open");
//       removeBackdrop();
//     };

//     const handleToggle = () => {
//       setTimeout(() => {
//         if (navCollapse?.classList.contains("show")) {
//           navCollapse.classList.add("show");
//           document.body.classList.add("right-menu-open");
//           createBackdrop();
//         } else {
//           closeMenu();
//         }
//       }, 50);
//     };

//     toggleBtn?.addEventListener("click", handleToggle);
//     return () => {
//       toggleBtn?.removeEventListener("click", handleToggle);
//       removeBackdrop();
//     };
//   }, []);

//   // navbar sticky
//   const navRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const onScroll = () => {
//       if (!navRef.current) return;

//       if (window.scrollY > 300) {
//         navRef.current.classList.add("sticky");
//       } else {
//         navRef.current.classList.remove("sticky");
//       }
//     };

//     window.addEventListener("scroll", onScroll);
//     // initial check in case user refreshed page below or above 200
//     onScroll();

//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const pathname = usePathname();
//   const hideHeader = pathname === "/auth/adminLogin"; // ✅ create a flag
//   const hideFooter = pathname === "/auth/adminRegister/superAdmin";

//   if (hideHeader) return null; // ✅ Early return if path matches
//   if (hideFooter) return null;

//   return (
//     <>
//       <header>
//         <nav ref={navRef} className="navbar navbar-expand-lg bg-light py-2">
//           <div className="container">
//             <a className="navbar-brand fw-bold fs-4 text-primary" href="/">
//               <Image
//                 src="/Logo.png"
//                 alt="Logo"
//                 width={240}   // original image width (high res)
//                 height={120}  // original image height (high res)
//                 className="logoImg"
//                 priority       // preload for better performance
//               />
//             </a>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon" />
//             </button>

//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-uppercase fw-semibold px-3 py-2 rounded text-dark fs-6"
//                     style={{
//                       fontFamily: 'Poppins, sans-serif',
//                       letterSpacing: '0.5px',
//                       transition: 'all 0.3s ease',
//                     }}
//                     href="/"
//                   >
//                     Home
//                   </a>
//                 </li>

//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-uppercase fw-semibold px-3 py-2 rounded text-dark fs-6"
//                     style={{
//                       fontFamily: 'Poppins, sans-serif',
//                       letterSpacing: '0.5px',
//                       transition: 'all 0.3s ease',
//                     }}
//                     href="/gallery"
//                   >
//                     Success Gallery
//                   </a>
//                 </li>

//                 <li className="nav-item">
//                   <a
//                     className="nav-link text-uppercase fw-semibold px-3 py-2 rounded text-dark fs-6"
//                     style={{
//                       fontFamily: 'Poppins, sans-serif',
//                       letterSpacing: '0.5px',
//                       transition: 'all 0.3s ease',
//                     }}
//                     href="/UpcomingClassesUser"
//                   >
//                     Upcoming Classes ({classes.length})
//                   </a>
//                 </li>

//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link d-flex align-items-center gap-1 fw-semibold text-dark px-3 py-2 rounded text-uppercase fs-6"
//                     href="#"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                     style={{
//                       fontFamily: 'Poppins, sans-serif',
//                       letterSpacing: '0.5px',
//                       transition: 'all 0.3s ease',
//                     }}
//                   >
//                     All courses <i className="bi bi-chevron-down"></i>
//                   </a>
//                   <ul className="dropdown-menu">
//                     <li><a className="dropdown-item" href="#">Action</a></li>
//                     <li><a className="dropdown-item" href="#">Another action</a></li>
//                     <li><hr className="dropdown-divider" /></li>
//                     <li><a className="dropdown-item" href="#">Something else here</a></li>
//                   </ul>
//                 </li>

//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link d-flex align-items-center gap-1 fw-semibold text-dark px-3 py-2 rounded text-uppercase fs-6"
//                     href="#"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                     style={{
//                       fontFamily: 'Poppins, sans-serif',
//                       letterSpacing: '0.5px',
//                       transition: 'all 0.3s ease',
//                     }}
//                   >
//                     more <i className="bi bi-chevron-down"></i>
//                   </a>
//                   <ul className="dropdown-menu">
//                     <li><a className="dropdown-item" href="/testimonial">testimonial</a></li>
//                   </ul>
//                 </li>
//               </ul>

//               {/* Inquiry Button */}
//               <div className="d-none d-lg-block ms-3">
//                 <Link
//                   href="/inquiry"
//                   className="btn btn-primary px-3 py-2 fw-semibold"
//                   style={{
//                     color: "#fff",
//                     fontFamily: 'Poppins, sans-serif',
//                     textTransform: 'uppercase',
//                     letterSpacing: '0.5px',
//                   }}
//                 >
//                   Send Inquiry
//                 </Link>

//                 {isAuthenticated &&
//                   (user?.role === "admin" ||
//                     user?.role === "user" ||
//                     user?.role === "student") && (
//                     <Link
//                       href={
//                         user?.role === "admin"
//                           ? "/Dashboard/adminDashboard"
//                           : user?.role === "student"
//                             ? "/studentdashboard"
//                             : "/Dashboard/userDashboard"
//                       }
//                       className="btn btn-primary px-3 py-2"
//                     >
//                       Dashboard
//                     </Link>
//                   )}

//               </div>
//             </div>

//           </div>
//         </nav>
//       </header>

//     </>
//   );
// }

"use client";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function TopNavbar() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = () => {
      axios
        .get("http://localhost:5000/api/classes")
        .then((res) => setClasses(res.data))
        .catch((err) => console.error("Failed to fetch classes", err));
    };

    fetchClasses();
    const interval = setInterval(fetchClasses, 100);
    return () => clearInterval(interval);
  }, []);

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    const toggleBtn = document.querySelector(".navbar-toggler");
    const navCollapse = document.getElementById("navbarSupportedContent");

    const createBackdrop = () => {
      if (!document.querySelector(".custom-backdrop")) {
        const backdrop = document.createElement("div");
        backdrop.className = "custom-backdrop";
        backdrop.addEventListener("click", closeMenu);
        document.body.appendChild(backdrop);
      }
    };

    const removeBackdrop = () => {
      const backdrop = document.querySelector(".custom-backdrop");
      if (backdrop) backdrop.remove();
    };

    const closeMenu = () => {
      navCollapse?.classList.remove("show");
      document.body.classList.remove("right-menu-open");
      removeBackdrop();
    };

    const handleToggle = () => {
      setTimeout(() => {
        if (navCollapse?.classList.contains("show")) {
          navCollapse.classList.add("show");
          document.body.classList.add("right-menu-open");
          createBackdrop();
        } else {
          closeMenu();
        }
      }, 50);
    };

    toggleBtn?.addEventListener("click", handleToggle);
    return () => {
      toggleBtn?.removeEventListener("click", handleToggle);
      removeBackdrop();
    };
  }, []);

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;

      if (window.scrollY > 300) {
        navRef.current.classList.add("sticky");
      } else {
        navRef.current.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathname = usePathname();
  const hideHeader = pathname === "/auth/adminLogin";
  const hideFooter = pathname === "/auth/adminRegister/superAdmin";

  if (hideHeader || hideFooter) return null;

  return (
    <>
      <header>
        <nav
          ref={navRef}
          className="navbar navbar-expand-lg py-2"
          style={{
            backgroundColor: "#f0f6ff",
            borderBottom: "1px solid #dbe9ff",
          }}
        >
          <div className="container">
            <a
              className="navbar-brand fw-bold fs-4"
              href="/"
              style={{ color: "#0056b3" }}
            >
              <Image
                src="/LOGO.png"
                alt="Logo"
                width={240}
                height={120}
                style={{
                  width: "120px",
                  height: "60px",
                  objectFit: "contain",
                  // backgroundColor: "#ffffff",     // 🤍 match with navbar
                  padding: "2px", // optional spacing
                  borderRadius: "4px", // smooth corner (optional)
                }}
                priority
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link text-uppercase fw-semibold px-3 py-2 rounded"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      color: "#003366",
                    }}
                    href="/"
                  >
                    Home
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link d-flex align-items-center gap-1 fw-semibold px-3 py-2 rounded text-uppercase fs-6"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      color: "#003366",
                    }}
                  >
                    All courses <i className="bi bi-chevron-down"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link d-flex align-items-center gap-1 fw-semibold px-3 py-2 rounded text-uppercase fs-6"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      color: "#003366",
                    }}
                  >
                    Services <i className="bi bi-chevron-down"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-uppercase fw-semibold px-3 py-2 rounded"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      color: "#003366",
                    }}
                    href="/"
                  >
                    Blog
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link d-flex align-items-center gap-1 fw-semibold px-3 py-2 rounded text-uppercase fs-6"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      color: "#003366",
                    }}
                  >
                    more <i className="bi bi-chevron-down"></i>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/testimonial">
                        testimonial
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/UpcomingClassesUser">
                        {" "}
                        Upcoming Classes ({classes.length})
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/gallery">
                        {" "}
                        Success Gallery
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/ContactSection">
                        Contact
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>

              <div className="d-none d-lg-block ms-3">
                <Link
                  href="/inquiry"
                  className="btn btn-primary px-3 py-2 fw-semibold"
                  style={{
                    color: "#fff",
                    fontFamily: "Poppins, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Send Inquiry
                </Link>

                {/* {isAuthenticated &&
                  (user?.role === "admin" ||
                    user?.role === "user" ||
                    user?.role === "student") && (
                    <Link
                      href={
                        user?.role === "admin"
                          ? "/Dashboard/adminDashboard"
                          : user?.role === "student"
                            ? "/studentdashboard"
                            : "/Dashboard/userDashboard"
                      }
                      className="btn btn-outline-primary px-3 py-2 ms-2"
                    >
                      Dashboard
                    </Link>
                  )} */}

                {isAuthenticated &&
  (["admin", "user", "student", "teacher"].includes(user?.role)) && (
    <Link
      href={
        user?.role === "admin"
          ? "/Dashboard/adminDashboard"
          : user?.role === "student"
          ? "/studentdashboard"
          : user?.role === "teacher"
          ? "/teacherDashboard"
          : "/Dashboard/userDashboard"
      }
      className="btn btn-outline-primary px-3 py-2 ms-2"
    >
      Dashboard
    </Link>
  )}

              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
