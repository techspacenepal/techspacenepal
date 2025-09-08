'use client';

import { useEffect, useState } from 'react';
import { MainNav } from '@/app/Component/main-nav';
import { UserNav } from '@/app/Component/teacher-nav';
import { instructor } from '@/lib/placeholder-data';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; // 👈 useAuth import

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [logo, setLogo] = useState<{ imageUrl: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth(); // 👈 from context

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

  // Logout handler
  const handleLogout = () => {
    logout(); // clear auth context
    router.push("/auth/adminLogin"); // redirect after logout
  };

  return (
    <>
      {/* Header */}
      <header className="border-bottom bg-white px-4 py-3 sticky-top shadow-sm "
        style={{ zIndex: 1 }} >
        <div className="container-fluid mx-auto">
          <div className='d-flex align-items-center justify-content-between'>
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

            <div className="ms-auto">
              <UserNav />
            </div>
          </div>
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
          { href: "/studentdashboard", label: "Dashboard", icon: "bi bi-speedometer2" },
          { href: "/auth/Dashboard/teacherDashboard/courses", label: "Courses", icon: "bi bi-book" },
          { href: "/auth/Dashboard/teacherDashboard/students", label: "Students", icon: "bi bi-people" },
          { href: "/auth/Dashboard/teacherDashboard/grades", label: "Grades", icon: "bi bi-journal-check" },
          { href: "/auth/Dashboard/teacherDashboard/teacherNotification", label: "Send Notification", icon: "bi bi-megaphone" },
          { href: "/auth/Dashboard/teacherDashboard/todolist", label: "To Do List", icon: "bi bi-list-check" },
          { href: "/studentdashboard", label: "Settings", icon: "bi-gear" },
          { label: "Logout", icon: "bi bi-box-arrow-right", textClass: "text-danger fw-semibold", action: handleLogout },
        ].map(({ href, label, icon, textClass, action }) =>
          href ? (
            <Link
              key={href + label}
              href={href}
              className={`d-block mb-3 text-decoration-none ${textClass || ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <i className={`${icon} me-2`}></i> {label}
            </Link>
          ) : (
            <button
              key={label}
              onClick={() => { action?.(); setMenuOpen(false); }}
              className={`btn d-block mb-3 text-start bg-transparent border-0 p-0 ${textClass || ""}`}
            >
              <i className={`${icon} me-2`}></i> {label}
            </button>
          )
        )}
      </div>

      <div className="d-flex min-vh-100">
        {/* Sidebar */}
        <aside
          className={`bg-light border-end d-flex flex-column justify-content-between p-3 ${collapsed ? 'collapsed-sidebar' : ''
            } d-none d-lg-flex`}
          style={{ width: collapsed ? '70px' : '250px', transition: 'width 0.3s' }}
        >
          <div>
            <MainNav collapsed={collapsed} />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow-1 d-flex flex-column">
          <main className="p-4 flex-grow-1 bg-light">{children}</main>
        </div>
      </div>
    </>
  );
}
