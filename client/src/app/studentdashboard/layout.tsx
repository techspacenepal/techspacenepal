"use client";

import { useEffect, useState, type ReactNode } from "react";
import { DashboardNav } from "@/app/Component/dashboard-nav";
import { UserNav } from "@/app/Component/student-nav";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [logo, setLogo] = useState<{ imageUrl: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fetch logo
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/logo")
      .then((res) => setLogo(res.data))
      .catch(() => console.error("Failed to load logo"));
  }, []);

  // Auto-close sidebar on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Header */}
      <header
        className="w-100 sticky-top bg-light border-bottom d-flex align-items-center justify-content-between px-3 py-3"
      >
        {/* Toggle */}
        <button
          className="btn btn-primary p-2 rounded d-flex align-items-center justify-content-center shadow-sm me-3"
          type="button"
          onClick={() => setMenuOpen(true)}
          style={{ width: "44px", height: "44px", minWidth: "44px" }}
        >
          <i className="bi bi-list fs-4 text-white"></i>
        </button>

        {/* Logo */}
        <Link href="/" className="navbar-brand ">
          {logo && (
            <Image
              src={`http://localhost:5000/uploads/${logo.imageUrl}`}
              alt="Logo"
              width={150}
              height={0}
              unoptimized={true}
              style={{ width: '120px', height: '60px', objectFit: 'contain' }}
            />
          )}
        </Link>

        {/* Right */}
        <div className="ms-auto d-flex align-items-center gap-3">
          <UserNav />
        </div>
      </header>

      {/* Overlay (click to close) */}
      {menuOpen && (
        <div
          className="fixed-top bg-dark bg-opacity-50"
          style={{ zIndex: 1039 }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* GitHub-like Sidebar */}
      <div
        className={`fixed-top bg-light border-end h-100 p-3`}
        style={{
          width: "260px",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 1040,
        }}
      >
        {/* Sidebar Header with Close Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Menu</h5>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setMenuOpen(false)}
            aria-label="Close"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Sidebar Links */}
        {[
          { href: "/studentdashboard", label: "Dashboard", icon: "bi-speedometer2" },
          { href: "/studentdashboard/profile", label: "Profile", icon: "bi-person" },
          { href: "/studentdashboard/courses", label: "Courses", icon: "bi-journal-bookmark" },
          { href: "/studentdashboard/gradebook", label: "Gradebook", icon: "bi-journal-check" },
          { href: "/studentdashboard/announcements", label: "Announcements", icon: "bi-megaphone" },
          { href: "/studentdashboard/todoList", label: "To Do List", icon: "bi-list-check" },
          { href: "/studentdashboard", label: "Settings", icon: "bi-gear" },
          {
            href: "/studentdashboard",
            label: "Logout",
            icon: "bi-box-arrow-right",
            textClass: "text-danger fw-semibold",
          },
        ].map(({ href, label, icon, textClass }) => (
          <Link
            key={href + label}
            href={href}
            className={`d-block mb-3 text-decoration-none ${textClass || ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <i className={`bi ${icon} me-2`}></i> {label}
          </Link>
        ))}
      </div>

      {/* Body */}
      <div className="d-flex min-vh-100">
        {/* Sidebar (desktop) */}
        <nav
          id="sidebarMenu"
          className="d-none d-md-flex flex-column flex-shrink-0 p-3 bg-light border-end"
          style={{ width: "280px" }}
        >
          <DashboardNav />
          <div className="mt-auto pt-3 border-top">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              disabled
              title="Settings (Coming soon)"
            >
              <i className="bi bi-gear me-2"></i> Settings
            </button>
          </div>
        </nav>

        {/* Main */}
        <div className="flex-grow-1 d-flex flex-column">
          <main className="flex-grow-1 overflow-auto p-4">{children}</main>
        </div>
      </div>
    </>
  );
}
