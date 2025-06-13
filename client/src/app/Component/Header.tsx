"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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

export default function TopNavbar() {

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
      <nav ref={navRef}
        className="navbar navbar-expand-lg bg-body-tertiary py-3 border-top border-bottom"
        style={{ transition: "all 0.3s ease" }}
      >
        {" "}
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo + Dropdown */}
          <div
            className="d-flex align-items-center gap-3 justify-content-between"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            <a className="navbar-brand" href="/">
              <img
                src="https://skilltrainingnepal.com/storage/site_setting/X2N5sIsm0gYGsIvcWbJq11I1Z5tNSBUjhCV6o4aq.png"
                alt="Logo"
                style={{ width: "60px", height: "auto" }}
              />
            </a>

            <div className="nav-item dropdown">
              <a
                className="nav-link d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "#212529",
                  userSelect: "none",
                }}
              >
                <i
                  className="bi bi-list me-1"
                  style={{
                    fontSize: "1.7rem",
                    color: "#212529",
                    textShadow: "0 0 1px #212529",
                  }}
                ></i>
                All Courses
              </a>

              <ul
                className="dropdown-menu"
                style={{ fontSize: "1rem", fontWeight: 500 }}
              >
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
            </div>
          </div>

          {/* Desktop Main Menu */}
          <ul
            className="navbar-nav mb-2 mb-lg-0 gap-3 d-none d-lg-flex flex-row align-items-center"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
            }}
          >
            <li className="nav-item">
              <a className="nav-link custom-hover active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="/gallery">
                Success
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="/testimonial">
                Testimonials
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#">
                Upcoming Classes
              </a>
            </li>
             <li className="nav-item">
              <a className="nav-link custom-hover" href="/teams">
                 Our Teams
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="#">
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-hover" href="/ContactSection">
                Contact
              </a>
            </li>
          </ul>
          <div className="d-none d-lg-flex align-items-center gap-3">
            <Link
              href="/inquiry"
              className="btn btn-primary px-3 py-2"
              style={{ color: "#fff", fontWeight: 600 }}
            >
              Send Inquiry
            </Link>

            {/* ✅ Dashboard only if user is authenticated and role is 'admin' */}
            {isAuthenticated && user?.role === "admin" && (
              <Link
                href="/Dashboard/adminDashboard"
                className="btn btn-primary px-3 py-2"
              >
                Dashboard
              </Link>
            )}
          </div>




          {/* Toggler Button (mobile) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              border: "none",
              borderRadius: 0,
              outline: "none",
              boxShadow: "none",
              fontWeight: "bold",
              fontSize: "1.3rem",
            }}
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Slide Menu (Mobile only) */}
          <div className="slide-menu d-lg-none" id="navbarSupportedContent">
            <div className="d-flex justify-content-end align-items-center py-2 border-top border-bottom">
              <button
                type="button"
                className="btn-close rounded-circle p-3 bg-white"
                style={{
                  marginRight: "0.5rem",
                  filter: "invert(1)",
                }}
                aria-label="Close"
                onClick={() => {
                  document
                    .getElementById("navbarSupportedContent")
                    ?.classList.remove("show");
                  document.body.classList.remove("right-menu-open");
                  const backdrop = document.querySelector(".custom-backdrop");
                  if (backdrop) backdrop.remove();
                }}
              ></button>
            </div>

            <ul className="navbar-nav mb-2 mb-lg-0 gap-3 p-4">
              <li className="nav-item">
                <a className="nav-link custom-hover active" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="#">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="/gallery">
                  Success Gallery
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="/testimonial">
                  Student Testimonials
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="#">
                  Upcoming Classes
                </a>
              </li>
               <li className="nav-item">
                <a className="nav-link custom-hover" href="/teams">
                   Our teams
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="#">
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-hover" href="/ContactSection">
                  Contact
                </a>
              </li>
            </ul>
            <div className="">
              <Link
                href="/inquiry"
                className="btn btn-primary px-3 py-2"
                style={{ color: "#fff", fontWeight: 600 }}
              >
                Send Inquiry
              </Link>
            </div>
          </div>

        </div>
      </nav>

    </header>
  );
}