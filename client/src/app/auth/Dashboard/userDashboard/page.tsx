"use client";
import { usePathname } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Bell,
  User,
  Calendar,
  MessageSquare,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
  createdAt: string;
  seen?: boolean;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  course: string;
  message?: string;
  createdAt: string;
  seen?: boolean;
}

interface UserType {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  } else if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return "";
};

const Dashboard = () => {
  const [inquiryCount, setInquiryCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userInitials, setUserInitials] = useState("");

  const router = useRouter();

  // login vayesi matra dashboard dekhine
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (!token) {
      router.push("/auth/adminLogin");
    }
  }, [router]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const fullName = user.username || user.name || "";
        setUserInitials(getInitials(fullName));
      } catch {
        setUserInitials("");
      }
    }
  }, []);

  // Fetch contact and inquiry counts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inquiryRes, contactRes, userRes] = await Promise.all([
          axios.get("http://localhost:5000/api/inquiry"),
          axios.get("http://localhost:5000/api/contact"),
          axios.get("http://localhost:5000/api/auth/users"),
        ]);

        const inquiries: Inquiry[] =
          inquiryRes.data.inquiries || inquiryRes.data;
        const contacts: Contact[] =
          contactRes.data.inquiries || contactRes.data;
        const users: UserType[] = userRes.data.users || userRes.data;

        const sortedInquiries = inquiries.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const sortedContacts = contacts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setInquiryCount(sortedInquiries.length);
        setContactCount(sortedContacts.length);
        setUserCount(users.length);
        setRecentInquiries(sortedInquiries.slice(0, 3));
        setRecentContacts(sortedContacts.slice(0, 3));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inquiryRes, contactRes, userRes] = await Promise.all([
          axios.get("http://localhost:5000/api/inquiry"),
          axios.get("http://localhost:5000/api/contact"),
          axios.get("http://localhost:5000/api/auth/users"),
        ]);

        const inquiries: Inquiry[] = Array.isArray(inquiryRes.data)
          ? inquiryRes.data
          : inquiryRes.data.inquiries || [];

        const contacts: Contact[] = Array.isArray(contactRes.data)
          ? contactRes.data
          : contactRes.data.contacts || [];

        const users: UserType[] = Array.isArray(userRes.data)
          ? userRes.data
          : userRes.data.users || [];

        const sortedInquiries = inquiries.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const sortedContacts = contacts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setInquiryCount(sortedInquiries.length);
        setContactCount(sortedContacts.length);
        setUserCount(users.length);
        setRecentInquiries(sortedInquiries.slice(0, 3));
        setRecentContacts(sortedContacts.slice(0, 3));

        const unseenInquiries = sortedInquiries.filter((i) => !i.seen);
        const unseenContacts = sortedContacts.filter((c) => !c.seen);
        setUnreadCount(unseenInquiries.length + unseenContacts.length);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBellClick = async () => {
    const newShow = !showDropdown;
    setShowDropdown(newShow);
    if (newShow) {
      try {
        await Promise.all([
          axios.put("http://localhost:5000/api/inquiry/mark-seen"),
          axios.put("http://localhost:5000/api/contact/mark-seen"),
        ]);
        setUnreadCount(0);
      } catch (error) {
        console.error("Failed to mark notifications as seen", error);
      }
    }
  };

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



  // Greeting function
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };


  // ✅ Single user state
  const [currentUser, setCurrentUser] = useState<{ name: string; image?: string }>({
    name: "",
    image: ""
  });
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = Cookies.get("adminToken");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        // 👇 Adjust this depending on your backend response
        const user = res.data.user || res.data;

        // ✅ Ensure correct name
        setCurrentUser({
          name: user.username || user.fullName || user.name || "Admin",
          image: user.image || ""
        });

        setUserInitials(getInitials(user.username || user.fullName || user.name || "Admin"));
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };

    loadUserData();
  }, []);



const navItems = [
  { href: "/auth/Dashboard/userDashboard", icon: "bi-speedometer2", text: "Dashboard", textClass: "text-dark" },
  { href: "/auth/admin/allUser", icon: "bi-people", text: "Users", textClass: "text-dark" },
  { href: "/auth/admin/allContact", icon: "bi-calendar", text: "Contacts", textClass: "text-dark" },
  { href: "/auth/admin/allinquiry", icon: "bi-chat-square-text", text: "Inquiries", textClass: "text-dark" },
  { href: "/auth/admin/services", icon: "bi-briefcase", text: "Services", textClass: "text-dark" },
  { href: "/auth/admin/Gallery", icon: "bi-images", text: "Success Gallery", textClass: "text-dark" },
  { href: "/auth/admin/testimonial", icon: "bi-chat-quote", text: "Testimonial", textClass: "text-dark" },
  { href: "/auth/admin/teams", icon: "bi-people-fill", text: "Teams", textClass: "text-dark" },
  isAuthenticated
    ? { icon: "bi-box-arrow-right", text: "Logout", action: logout, textClass: "text-danger fw-bold" }
    : { href: "/auth/adminLogin", icon: "bi-box-arrow-in-right", text: "Login", textClass: "text-success fw-bold" },
];


  return (
    <>
      {/* Header */}
      <header
        className="w-100 sticky-top bg-light border-bottom px-3 py-2"
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between">
            {/* Left side: Toggle + Title + Logo */}
            <div className="d-flex align-items-center gap-3">
              {/* Toggle */}
              <button
                className="btn btn-primary p-2 rounded d-flex align-items-center justify-content-center shadow-sm"
                type="button"
                onClick={() => setMenuOpen(true)}
                style={{ width: "44px", height: "44px", minWidth: "44px" }}
              >
                <i className="bi bi-list fs-4 text-white"></i>
              </button>

              {/* Title */}
              <h1 className="h4 h3-md fw-bold mb-0 d-none d-lg-block">Dashboard</h1>

              {/* Logo */}
              <Link href="/" className="navbar-brand ms-2">
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
            </div>
            <div className="text-center text-lg-center d-none d-lg-flex flex-column align-items-lg-center">
              <h2 className="h5 fw-bold mb-1">
                {getGreeting()}, {currentUser?.name} 👋
              </h2>

              <p className="text-muted mb-0">
                Welcome to TechSpace Nepal Dashboard
              </p>
            </div>



            {/* Right side: Notifications + User */}
            <div className="d-flex gap-3 align-items-center position-relative">
              <button
                className="btn btn-link position-relative p-0 border-0"
                onClick={handleBellClick}
              >
                <Bell size={22} className="text-dark" />
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="dropdown-menu dropdown-menu-end show p-2 shadow"
                  style={{ minWidth: "280px", top: "110%", left: "-230px" }}
                >
                  <h6 className="dropdown-header">Notifications</h6>
                  {[...recentContacts, ...recentInquiries]
                    .slice(0, 5)
                    .map((item, i) => (
                      <div key={i} className="dropdown-item small">
                        <strong>{item.name}</strong> sent a message
                        <br />
                        <small className="text-muted">
                          {new Date(item.createdAt).toLocaleString("en-GB")}
                        </small>
                      </div>
                    ))}
                </div>
              )}
              <div
                className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center"
                style={{ width: 32, height: 32, fontSize: 14 }}
              >
                {userInitials}
              </div>
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

        {/* Navigation Links */}
        {/* Navigation Links */}
        <nav className="nav flex-column gap-2 py-3 border-top">
          {navItems.map((item, index) =>
            item.href ? (
              <Link
                key={index}
                href={item.href}
                className={`d-flex align-items-center gap-2 text-decoration-none ${item.textClass || ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                <span>{item.text}</span>
              </Link>
            ) : (
              <button
                key={index}
                onClick={() => {
                  item.action?.();
                  setMenuOpen(false);
                }}
                className={`d-flex align-items-center gap-2 text-start p-0 border-0 bg-transparent ${item.textClass || ""}`}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                <span>{item.text}</span>
              </button>
            )
          )}
        </nav>


      </div>

      <div className="d-flex min-vh-100 bg-light">
        {/* Sidebar */}
        <aside className="d-lg-block d-none sidebar bg-dark text-white p-3">
          <nav className="nav flex-column gap-2">
            <Link
              href="/auth/Dashboard/userDashboard"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <LayoutDashboard size={18} />
              <span className="sidebar-text">Dashboard</span>
            </Link>
            <Link
              href="/auth/admin/allUser"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <User size={18} />
              <span className="sidebar-text">Users</span>
            </Link>
            <Link
              href="/auth/admin/allContact"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <Calendar size={18} />
              <span className="sidebar-text">Contacts</span>
            </Link>
            <Link
              href="/auth/admin/allinquiry"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <MessageSquare size={18} />
              <span className="sidebar-text">Inquiries</span>
            </Link>
            <Link
              href="/auth/admin/services"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <LayoutDashboard size={18} />
              <span className="sidebar-text">Services</span>
            </Link>

            <Link
              href="/auth/admin/Gallery"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i className="bi bi-images" style={{ fontSize: "1rem" }}></i>
              <span className="sidebar-text">Success Gallery</span>
            </Link>
            <Link
              href="/auth/admin/testimonial"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i className="bi bi-images" style={{ fontSize: "1rem" }}></i>
              <span className="sidebar-text">Testimonial</span>
            </Link>
            <Link
              href="/auth/admin/teams"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i className="bi bi-images" style={{ fontSize: "1rem" }}></i>
              <span className="sidebar-text">Teams</span>
            </Link>

            {/* 🔒 Show logout if authenticated, otherwise show Login */}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="btn btn-danger d-flex align-items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <Link href="/auth/adminLogin" className="btn btn-success">
                Login
              </Link>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 py-4">
          <div
            className="container px-4"
            style={{ maxWidth: "1280px", margin: "0 auto" }}
          >
            <div className="mb-4 text-center text-lg-center d-lg-none flex-column align-items-lg-center">
              <h2 className="h5 fw-bold mb-1">
                {getGreeting()}, {currentUser?.name} 👋
              </h2>

              <p className="text-muted mb-0">
                Welcome to TechSpace Nepal Dashboard
              </p>
            </div>

            {/* Stats Cards */}
            <div className="row g-3 mb-4">
              {[
                {
                  title: "Total Users",
                  value: userCount,
                  link: "/auth/admin/userUsers",
                },
                {
                  title: "Contacts",
                  value: contactCount,
                  link: "/auth/admin/userContact",
                },
                {
                  title: "Inquiries",
                  value: inquiryCount,
                  link: "/auth/admin/userInquiry",
                },
                {
                  title: "Services",
                  value: 12,
                  link: "/auth/admin/userServices",
                },
              ].map((stat, i) => (
                <div className="col-12 col-sm-6 col-md-3" key={i}>
                  {stat.link ? (
                    <Link
                      href={stat.link}
                      className="text-decoration-none text-dark"
                    >
                      <div className="card shadow-sm h-100 hover-shadow">
                        <div className="card-body text-center">
                          <h6 className="text-muted small">{stat.title}</h6>
                          <h4 className="fw-bold mb-0">{stat.value}</h4>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="card shadow-sm h-100">
                      <div className="card-body text-center">
                        <h6 className="text-muted small">{stat.title}</h6>
                        <h4 className="fw-bold mb-0">{stat.value}</h4>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Panels */}
            <div className="row g-4">
              {/* Recent Contacts */}
              <div className="col-12 col-lg-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Recent Contacts</h5>
                    <ul className="list-group list-group-flush">
                      
                      {recentContacts
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )
                        .slice(0, 3)
                        .map((con) => (
                          <li key={con._id} className="list-group-item">
                            <strong>{con.name}</strong> - {con.course}
                            <br />
                            <small className="text-muted">
                              {new Date(con.createdAt).toLocaleDateString()}
                            </small>
                          </li>
                        ))}

                      {recentContacts.length === 0 && (
                        <li className="list-group-item text-muted">
                          No recent contacts found.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Services Panel */}
              <div className="col-12 col-lg-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-3">Manage Services</h5>

                    {["Web Development", "SEO Optimization"].map(
                      (service, i) => (
                        <div
                          key={i}
                          className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2"
                        >
                          <span>{service}</span>
                          <div>
                            <button className="btn btn-outline-secondary btn-sm me-2">
                              Edit
                            </button>
                            <button className="btn btn-danger btn-sm">
                              Delete
                            </button>
                          </div>
                        </div>
                      )
                    )}

                    <button className="btn btn-primary w-100 mt-3">
                      Add New Service
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
