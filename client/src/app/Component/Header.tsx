"use client";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useRef, useState, } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";

export default function TopNavbar() {


  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = () => {
      axios
        .get("http://localhost:5000/api/classes")
        .then((res) => setClasses(res.data))
        .catch((err) => console.error("Failed to fetch classes", err));
    };

    fetchClasses(); // Initial load
    const interval = setInterval(fetchClasses, 10000); // every 10 sec

    return () => clearInterval(interval); // cleanup
  }, []);

  // login vayesi matra dashboard dekhine
  const { isAuthenticated, user } = useAuth();
  ///-------

  // Side menu javascript
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

  // navbar sticky
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
    // initial check in case user refreshed page below or above 200
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathname = usePathname();
  const hideHeader = pathname === "/auth/adminLogin"; // ✅ create a flag
  const hideFooter = pathname === "/auth/adminRegister/superAdmin";

  if (hideHeader) return null; // ✅ Early return if path matches
  if (hideFooter) return null;



  return (
    <header>
      {/* Top Contact Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-auto d-flex align-items-center gap-3 flex-wrap">
              <div className="d-flex align-items-center gap-1">
                <FaPhoneAlt />
                <span>+977 01-5244419 / +977-9813906662</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <FaEnvelope />
                <span>info@skilltrainingnepal.com</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <FaWhatsapp />
                <span>+977-9813906662</span>
              </div>
            </div>
            <div className="col-auto d-flex align-items-center gap-2">
              <span className="fw-bold">FOLLOW US</span>
              <a href="#" className="text-white">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white">
                <FaTwitter />
              </a>
              <a href="#" className="text-white">
                <FaInstagram />
              </a>
              <a href="#" className="text-white">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        ref={navRef}
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ transition: "all 0.3s ease" }}
      >
        <div className="container">
          <a className="navbar-brand" href="/">Navbar</a>
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
            className="collapse navbar-collapse custom-mobile-menu"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/UpcomingClassesUser">
                  Upcoming Classes ({classes.length})
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/gallery">Success Gallery</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/testimonial">Testimonial</a>
              </li>

              <li className="nav-item dropdown dropdown-hover">
                <a className="nav-link dropdown-toggle" href="#" id="allCoursesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  All Courses
                </a>
                <ul className="dropdown-menu shadow" aria-labelledby="allCoursesDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Web Development
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Mobile Development
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                       UI/UX Design
                    </a>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>


    </header>
  );
}