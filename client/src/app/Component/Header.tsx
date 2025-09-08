"use client";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { FaSearch } from "react-icons/fa";
import SearchCourses from "./SearchCourses";
import { FaUser } from 'react-icons/fa';

interface Course {
  category: string;
  title: string;
}
const slugify = (text?: string | null) =>
  (text ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export default function Header() {

  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
   const pathname = usePathname();

  // Fetch courses on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Failed to fetch courses", err));
  }, []);

  // Generate categories from fetched courses
  const categories = Array.from(new Set(courses.map((c) => c.category)));

  const dynamicCategories = categories.map((cat) => ({
    key: cat,
    name: cat,
    sub: courses.filter((c) => c.category === cat).map((c) => c.title),
  }));


  // Show/hide dropdown for demonstration
  const [showDropdown, setShowDropdown] = useState(false);
  // Logo state here at top level
  const [logo, setLogo] = useState<{ imageUrl: string } | null>(null);
  const [classes, setClasses] = useState([]);

  // Fetch logo data on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/logo")
      .then(res => setLogo(res.data))
      .catch(() => console.error("Failed to load logo"));
  }, []);

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


  // Fetch logo on mount (also top level)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/logo")
      .then((res) => setLogo(res.data))
      .catch(() => console.error("Failed to load logo"));
  }, []);

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    const toggleBtn = document.querySelector(".navbar-toggler");
    const navCollapse = document.getElementById("navbarSupportedContent");
    // Declare logo state


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


 const [menuOpen, setMenuOpen] = useState(false);



  // Auto-close sidebar on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);





  // single declaration using let for reassign
  let hideHeader = false;
  let hideFooter = false;

  // conditionally set hideHeader / hideFooter
  if (
    pathname === "/auth/studentLogin" ||
    pathname === "/auth/studentRegister" ||
    pathname === "/auth/adminLogin" ||
    pathname === "/auth/studentForgotPassword" ||
    pathname === "/auth/studentResetPassword/[token]" ||
    pathname === "/studentdashboard" ||
    pathname === "/studentdashboard/profile" ||
    pathname === "/studentdashboard/courses" ||
    pathname === "/studentdashboard/gradebook" ||
    pathname === "/studentdashboard/announcements" ||
    pathname === "/studentdashboard/todoList" ||
    pathname === "/auth/Dashboard/teacherDashboard" ||
    pathname === "/auth/Dashboard/teacherDashboard/courses" ||
    pathname === "/auth/Dashboard/teacherDashboard/students" ||
    pathname === "/auth/Dashboard/teacherDashboard/grades" ||
    pathname === "/auth/Dashboard/teacherDashboard/teacherNotification" ||
    pathname === "/auth/Dashboard/teacherDashboard/todolist" ||
    pathname === "/auth/Dashboard/adminDashboard" ||
    pathname === "/auth/adminRegister" ||
    pathname === "/auth/Dashboard/userDashboard"
  ) {
    hideHeader = true;
  }

  if (pathname === "/auth/adminRegister/superAdmin") {
    hideFooter = true;
  }

  // later in render
  if (hideHeader || hideFooter) return null;



 

  return (
    <>


      <header>

        <nav
          ref={navRef}
          className="navbar navbar-expand-lg py-2 shadow-sm bg-light"

        >
          <div className="container align-items-center">

            <Link className="navbar-brand" href="/">
              {logo && (
                <Image
                  src={`http://localhost:5000/uploads/${logo.imageUrl}`}
                  alt="Logo"
                  width={150}
                  height={0}
                  unoptimized={true}
                  style={{ width: "120px", height: "60px", objectFit: "contain" }}
                />
              )}
            </Link>


            {/* Mobile Search Offcanvas */}
            {/* Mobile Search Icon */}
            <div className="d-lg-none ms-2">
              <button
                className="btn border-0 bg-transparent text-secondary"
                style={{ fontSize: "27px" }}
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSearch"
                aria-controls="offcanvasSearch"
              >
                <FaSearch />
              </button>
            </div>

            <div
              className="offcanvas offcanvas-end d-lg-none"
              tabIndex={-1}
              id="offcanvasSearch"
              aria-labelledby="offcanvasSearchLabel"
              style={{ height: '100vh', width: '100%' }}
            >
              <div className="offcanvas-header border-bottom">
                <h5 className="offcanvas-title" id="offcanvasSearchLabel">Search Courses</h5>
                <button
                  type="button"
                  className="btn-close bg-primary"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  style={{ border: "none", outline: "none", boxShadow: "none" }}
                />
              </div>
              <div className="offcanvas-body">
                <SearchCourses />
              </div>
            </div>






            {/* Sidebar responsive devices only */}
            <div
              className={`fixed-top bg-light border-end  h-100 p-3`}
              style={{
                width: "260px",
                transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.3s ease-in-out",
                zIndex: 1040,
              }}
            >
              {/* Sidebar Header with Close Button */}
              <div className="d-flex justify-content-between  align-items-center pb-3">
                <h5 className="mb-0">Menu</h5>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <nav className="nav flex-column gap-2 py-3 border-top">
                <Link
                  href="/"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-house me-2"></i>
                  <span>Home</span>
                </Link>

                <Link
                  href="/about-us"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-info-circle me-2"></i>
                  <span>About Us</span>
                </Link>


                <Link
                  href="/courses"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-journal-bookmark me-2"></i>
                  <span>All Courses</span>
                </Link>


                <Link
                  href="/our-services"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-gear me-2"></i>
                  <span>Services</span>
                </Link>

                <Link
                  href="/success-gallery"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-trophy me-2"></i>
                  <span>Success Story</span>
                </Link>

                <Link
                  href="/our-team"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-people me-2"></i>
                  <span>Our Team</span>
                </Link>

                <Link
                  href="/upcomming-classes"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-calendar-event me-2"></i>
                  <span>
                    Upcoming Classes <span className="text-danger">({classes.length})</span>
                  </span>
                </Link>

                <Link
                  href="/testimonial"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-chat-left-text me-2"></i>
                  <span>Testimonial</span>
                </Link>

                <Link
                  href="/blog"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  <span>Blog</span>
                </Link>

                <Link
                  href="/contact-us"
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-envelope me-2"></i>
                  <span>Contact Us</span>
                </Link>

                {/* Dashboard (Auth check) */}
                {isAuthenticated &&
                  ["admin", "user", "student", "teacher"].includes(user?.role ?? "") && (
                    <Link
                      href={
                        user?.role === "admin"
                          ? "/auth/Dashboard/adminDashboard"
                          : user?.role === "student"
                            ? "/studentdashboard"
                            : user?.role === "teacher"
                              ? "/auth/Dashboard/teacherDashboard"
                              : "/auth/Dashboard/userDashboard"
                      }
                      className="d-flex align-items-center gap-2 text-decoration-none"
                      onClick={() => setMenuOpen(false)}
                    >
                      <i className="bi bi-speedometer2 me-2"></i>
                      <span>Dashboard</span>
                    </Link>
                  )}

                {/* Buttons */}
                <Link
                  href="/inquiry"
                  className="d-inline-flex align-items-center justify-content-center gap-2 btn"
                  style={{
                    backgroundColor: "#0057d8",
                    color: "#ffffff",
                    fontWeight: 500,
                    padding: "12px 17px",
                    borderRadius: "8px",
                    height: "48px",
                    textDecoration: "none",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-arrow-right"></i>
                  <span>Send Inquiry</span>
                </Link>

                <Link
                  href="/auth/studentLogin"
                  className="d-inline-flex align-items-center justify-content-center gap-2 btn bg-success"
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    padding: "12px 17px",
                    borderRadius: "8px",
                    height: "48px",
                    textDecoration: "none",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="fa-regular fa-user fs-5"></i>
                </Link>
              </nav>




            </div>

            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{
              height: '100vh',
            }}>

              <div className="offcanvas-header border-bottom">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  <Link className="navbar-brand" href="/">
                    {logo ? (
                      <Image
                        src={`http://localhost:5000/uploads/${logo.imageUrl}`}
                        alt="Logo"
                        width={120}
                        height={60}
                        unoptimized={true}
                        style={{ width: '120px', height: '60px', objectFit: 'contain' }}
                      />

                    ) : (
                      <span>Loading logo...</span>
                    )}
                  </Link></h5>
                <button type="button" className="btn-close bg-primary" style={{ border: "none", outline: "none", boxShadow: "none" }}
                  data-bs-dismiss="offcanvas" aria-label="Close" />

              </div>
              <div className="offcanvas-body align-items-lg-center ">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 mx-lg-auto align-items-lg-center">

                  <li className="nav-item d-lg-none">
                    <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                  </li>


                  <li
                    className="nav-item dropdown dropdown-container position-relative d-none d-lg-block"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => {
                      setShowDropdown(false);
                      setActiveCategory(null);
                    }}
                  >
                    <Link
                      className="nav-link dropdown-toggle no-caret d-flex align-items-center gap-2"
                      href="/courses"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      All Courses <i className="bi bi-chevron-down fs-6"></i>
                    </Link>

                    <div className="dropdown-megamenu menu-visible cursor-pointer">
                      {showDropdown && (
                        <div className="dropdown-wrapper position-absolute d-flex pt-4">
                          <ul className="main-dropdown list-unstyled m-0 p-3">
                            {dynamicCategories.map((cat) => (
                              <li
                                key={cat.key}
                                className={`main-item px-3 py-2 ${activeCategory === cat.key ? "active" : ""
                                  }`}
                                onMouseEnter={() => {
                                  if (cat.sub.length > 0) setActiveCategory(cat.key);
                                  else setActiveCategory(null);
                                }}
                                onClick={() => {
                                  if (cat.sub.length > 0)
                                    setActiveCategory((prev) =>
                                      prev === cat.key ? null : cat.key
                                    );
                                  else setActiveCategory(null);
                                }}
                              >
                                <Link
                                  href={`/courses/${slugify(cat.key)}`}
                                  className="d-flex justify-content-between align-items-center fw-semibold text-uppercase text-decoration-none text-dark"
                                  style={{ fontSize: "13px" }}
                                  onClick={(e) => {
                                    if (cat.sub.length > 0) e.preventDefault();
                                  }}
                                >
                                  {cat.name}
                                  {cat.sub.length > 0 && <i className="bi bi-chevron-right"></i>}
                                </Link>
                              </li>
                            ))}

                          </ul>

                          {activeCategory && (
                            <ul className="sub-dropdown list-unstyled m-0 p-2">
                              {dynamicCategories
                                .find((cat) => cat.key === activeCategory)
                                ?.sub.map((courseTitle, i) => (
                                  <li key={i} className="px-3 py-2">
                                    <Link
                                      href={`/courses/${slugify(courseTitle)}`}
                                      className="text-dark fw-medium d-block text-decoration-none"
                                    >
                                      {courseTitle}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>
                      )}

                    </div>


                  </li>


                  <li className="nav-item d-lg-none">
                    <Link className="nav-link" aria-current="page" href="/about-us">About us</Link>
                  </li>




                  <li className="nav-item d-lg-none">
                    <Link className="nav-link" href="/our-services">Our Services</Link>
                  </li>
                  <li className="nav-item d-lg-none">
                    <Link className="nav-link active" aria-current="page" href="/courses">all Courses</Link>
                  </li>

                  <li className="nav-item d-lg-none">
                    <Link className="nav-link" aria-current="page" href="/success-gallery">Success Story</Link>
                  </li>


                  <li className="nav-item d-lg-none">
                    <Link className="nav-link active" aria-current="page" href="/our-team">Our team</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" href="/upcomming-classes">upcomming classes <span className="text-danger">({classes.length})</span></Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" href="/testimonial">testimonial</Link>
                  </li>



                  <li className="nav-item">
                    <Link className="nav-link" href="/blog">blog</Link>
                  </li>

                  <li className="nav-item d-lg-none">
                    <Link className="nav-link" href="/contact-us">Contact Us</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" href="">
                      {isAuthenticated &&
                        ["admin", "user", "student", "teacher"].includes(user?.role ?? "") && (
                          <Link
                            href={
                              user?.role === "admin"
                                ? "/auth/Dashboard/adminDashboard"
                                : user?.role === "student"
                                  ? "/studentdashboard"
                                  : user?.role === "teacher"
                                    ? "/auth/Dashboard/teacherDashboard"
                                    : "/auth/Dashboard/userDashboard"
                            }
                            className="text-decoration-none"
                          >
                            Dashboard
                          </Link>
                        )}
                    </Link>
                  </li>




                </ul>




                <div className="d-flex flex-column flex-lg-row align-items-start justify-content-start gap-3 ms-lg-3l align-items-lg-center">

                  <Link
                    href="/inquiry"
                    className="btn d-inline-flex align-items-center"
                    style={{
                      backgroundColor: '#0057d8',
                      color: '#ffffff',
                      fontWeight: '500',
                      padding: '12px 17px',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '16px',
                      textDecoration: 'none',
                      gap: '8px',
                      height: '48px',
                    }}
                  >
                    Send Inquiry
                    <i className="bi bi-arrow-right" style={{ fontSize: '18px' }}></i>

                  </Link>



                  <Link
                    className="btn d-inline-flex align-items-center bg-success"
                    href="/auth/studentLogin"
                    style={{
                      color: '#ffffff',
                      fontWeight: '700',
                      padding: '12px 17px',
                      borderRadius: '8px',
                      border: 'none',
                      textDecoration: 'none',
                      height: '48px',

                    }}
                  >
                    <i className="fa-regular fa-user fs-5"></i>
                  </Link>

                </div>


              </div>
            </div>
            {/* Toggle */}
            <button
              className="d-lg-none btn btn-primary p-2 rounded d-flex align-items-center justify-content-center shadow-sm"
              type="button"
              onClick={() => setMenuOpen(true)}
              style={{ width: "44px", height: "44px", minWidth: "44px" }}
            >
              <i className="bi bi-list fs-4 text-white"></i>
            </button>

          </div>
        </nav>

      </header>
      {/* Overlay (click to close) */}
      {menuOpen && (
        <div
          className="fixed-top bg-dark bg-opacity-50"
          style={{ zIndex: 1039 }}
          onClick={() => setMenuOpen(false)}
        />
      )}

    </>
  );
}