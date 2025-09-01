"use client";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ContactInfo from "./ContactInfo";
import { FaSignInAlt } from "react-icons/fa";
interface Course {
  category: string;
  title: string;
}
const slugify = (text?: string | null) =>
  (text ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export default function TopNavbar() {

  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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





  const pathname = usePathname();
  const hideHeader =
  pathname === "/auth/adminLogin" ||
  pathname === "/auth/studentLogin";

const hideFooter =
  pathname === "/auth/adminRegister/superAdmin" ||
  pathname === "/auth/studentRegister";


  if (hideHeader || hideFooter) return null;

  return (
    <>

      <header>

        <nav
          ref={navRef}
          className="navbar navbar-expand-lg py-2 shadow-sm"
          style={{
            backgroundColor: "#f0f6ff",
            // borderBottom: "3px solid #dbe9ff",
          }}
        >
          <div className="container">

            <a className="navbar-brand" href="/">
              {logo ? (
                <Image
                  src={`http://localhost:5000/uploads/${logo.imageUrl}`}
                  alt="Logo"
                  width={150}
                  height={0}
                  unoptimized={true}
                  style={{ width: '120px', height: '60px', objectFit: 'contain' }}
                />

              ) : (
                <span>Loading logo...</span>
              )}
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{
              height: '100vh',

            }}>

              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  <a className="navbar-brand" href="/">
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
                  </a></h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
              </div>
              <div className="offcanvas-body align-items-lg-center ">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 mx-lg-auto align-items-lg-center">

                  <li className="nav-item d-lg-none">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                  </li>


                  <li
                    className="nav-item dropdown dropdown-container position-relative d-none d-lg-block"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => {
                      setShowDropdown(false);
                      setActiveCategory(null);
                    }}
                  >
                    <a
                      className="nav-link dropdown-toggle no-caret d-flex align-items-center gap-2"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      All Courses <i className="bi bi-chevron-down fs-6"></i>
                    </a>

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


                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/about-us">About Us</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="/services">Services</a>
                  </li>
                  <li className="nav-item d-lg-none">
                    <a className="nav-link active" aria-current="page" href="/courses">all Courses</a>
                  </li>

                  <li className="nav-item d-lg-none">
                    <a className="nav-link" aria-current="page" href="/success-gallery">Success Story</a>
                  </li>


                  <li className="nav-item d-lg-none">
                    <a className="nav-link active" aria-current="page" href="/our-team">Our team</a>
                  </li>

                  <li className="nav-item d-lg-none">
                    <a className="nav-link active" aria-current="page" href="/upcomming-classes">upcomming classes ({classes.length}) </a>
                  </li>

                  <li className="nav-item d-lg-none">
                    <a className="nav-link active" aria-current="page" href="/testimonial">testimonial</a>
                  </li>



                  <li className="nav-item">
                    <a className="nav-link" href="/blog">blog</a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="/contact">Contact Us</a>
                  </li>



                  <li className="d-block d-lg-none">
                    <div className="nav-link">
                      <ContactInfo />
                    </div>
                  </li>

                </ul>



                {/* <div className="d-none d-lg-block ms-3">
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

                    <Link className="btn btn-outline-primary fw-semibold px-3" href="/student-login">
                      Login
                    </Link>

                  {isAuthenticated &&
                    ["admin", "user", "student", "teacher"].includes(
                      user?.role ?? ""
                    ) && (
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
                        className="btn btn-outline-primary px-3 py-2 ms-2"
                      >
                        Dashboard
                      </Link>
                    )}
                </div> */}

                <div className="d-none d-lg-flex align-items-center gap-2 ms-3">
                  <Link
                    href="/inquiry"
                    className="btn btn-primary px-3 py-2 fw-semibold rounded-2"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Send Inquiry
                  </Link>



                  <Link
                    href="/auth/studentLogin"
                    className="btn btn-outline-primary px-3 py-2 fw-semibold rounded-2"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    <FaSignInAlt />
                  </Link>


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
                        className="btn btn-outline-primary px-3 py-2 fw-semibold rounded-2"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Dashboard
                      </Link>
                    )}
                </div>


              </div>
            </div>

          </div>
        </nav>

      </header>

    </>
  );
}
