"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu, X } from 'lucide-react';
import {
  LayoutDashboard,
  Calendar,
  User,
  MessageSquare,
  LogOut,
  Home,
  Info,
  Settings,
  BookOpen,
  Bell,
  Image as ImageIcon
} from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

interface NotificationItem {
  _id: string;
  name: string;
  course: string;
  type: "inquiry" | "contact";
  createdAt: string;
}

interface Service {
  _id: string;
  title: string;
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


const NotificationDropdown: React.FC<{ items: NotificationItem[] }> = ({
  items,
}) => {
  return (
    <div
      className="dropdown-menu dropdown-menu-end show p-2 shadow"
      style={{ minWidth: "300px" }}
    >
      <h6 className="dropdown-header">Notifications</h6>
      {items.length === 0 ? (
        <span className="dropdown-item text-muted">No new notifications</span>
      ) : (
        items.map((item) => (
          <div key={item._id} className="dropdown-item small">
            <strong>{item.name}</strong> sent a new {item.type}
            <br />
            <small className="text-muted">
              {new Date(item.createdAt).toLocaleString("en-GB")}
            </small>
          </div>
        ))
      )}
      <div className="dropdown-divider" />
      <div className="text-center">
        <Link
          href="/auth/admin/allContact"
          className="dropdown-item small text-primary"
        >
          View All Contacts
        </Link>
        <Link
          href="/auth/admin/allinquiry"
          className="dropdown-item small text-primary"
        >
          View All Inquiries
        </Link>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [inquiryCount, setInquiryCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userInitials, setUserInitials] = useState("");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  // const [services, setServices] = useState([]);
  const [serviceCount, setServiceCount] = useState(0);
  const [services, setServices] = useState<Service[]>([]);

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

  // Load user initials from localStorage on mount
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
        const [inquiryRes, contactRes, userRes, serviceRes] = await Promise.all(
          [
            axios.get("http://localhost:5000/api/inquiry"),
            axios.get("http://localhost:5000/api/contact"),
            axios.get("http://localhost:5000/api/auth/users"),
            axios.get("http://localhost:5000/api/services"), // 4th request
          ]
        );

        // ✅ These must be arrays — add fallback empty array to avoid TypeError
        const inquiries = Array.isArray(inquiryRes.data)
          ? inquiryRes.data
          : inquiryRes.data.inquiries || [];
        const contacts = Array.isArray(contactRes.data)
          ? contactRes.data
          : contactRes.data.contacts || [];
        const users = Array.isArray(userRes.data)
          ? userRes.data
          : userRes.data.users || [];

        const services = Array.isArray(serviceRes.data) ? serviceRes.data : [];
        setServiceCount(services.length);
        const sortedInquiries = inquiries.sort(
          (a: Inquiry, b: Inquiry) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const sortedContacts = contacts.sort(
          (a: Contact, b: Contact) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setInquiryCount(sortedInquiries.length);
        setContactCount(sortedContacts.length);
        setUserCount(users.length);

        setRecentInquiries(sortedInquiries.slice(0, 3));
        setRecentContacts(sortedContacts.slice(0, 3));

        // ✅ Count only unseen
        const unseenInquiries = sortedInquiries.filter((i: Inquiry) => !i.seen);
        const unseenContacts = sortedContacts.filter((c: Contact) => !c.seen);

        setUnreadCount(unseenInquiries.length + unseenContacts.length);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allNotifications = [
    ...recentContacts.map((item) => ({ ...item, type: "contact" as const })),
    ...recentInquiries.map((item) => ({
      ...item,
      name: item.name || "",
      type: "inquiry" as const,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const handleBellClick = async () => {
    const newShow = !showDropdown;
    setShowDropdown(newShow);

    if (newShow) {
      try {
        // Mark all as seen on backend
        await Promise.all([
          axios.put("http://localhost:5000/api/inquiry/mark-seen"),
          axios.put("http://localhost:5000/api/contact/mark-seen"),
        ]);
        setUnreadCount(0); // Reset unread count on frontend
      } catch (error) {
        console.error("Failed to mark notifications as seen", error);
      }
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data); // Assuming it's an array of services
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);





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
  const navItems = [
    { href: "/auth/Dashboard/adminDashboard", icon: "bi-speedometer2", text: "Dashboard" },
    { href: "/auth/admin/home", icon: "bi-house", text: "Home" },
    { href: "/auth/admin/about", icon: "bi-info-circle", text: "About" },
    { href: "/auth/admin/allUser", icon: "bi-person", text: "Users" },
    { href: "/auth/admin/allContact", icon: "bi-chat-square-text", text: "Contacts" },
    { href: "/auth/admin/allinquiry", icon: "bi-chat-square-text", text: "Inquiries" },
    { href: "/auth/admin/ManageServices", icon: "bi-gear", text: "Services" },
    { href: "/auth/admin/addblog", icon: "bi-book", text: "Blog" },
    { href: "/auth/admin/Gallery", icon: "bi-image", text: "Success Gallery" },
    { href: "/auth/admin/testimonial", icon: "bi-chat-square-text", text: "Testimonial" },
    { href: "/auth/admin/addTeacherCourses", icon: "bi-book", text: "Add Teacher Courses" },
    { href: "/auth/admin/teams", icon: "bi-person", text: "Teams" },
    { href: "/auth/admin/courses", icon: "bi-book", text: "Courses" },
    { href: "/auth/admin/addAnnouncement", icon: "bi-chat-square-text", text: "Add Announcements" },
    { href: "/auth/admin/enrolledCourses", icon: "bi-book", text: "Enrolled Courses" },
    { href: "/auth/admin/allstudents", icon: "bi-person", text: "All Students" },
    { href: "/auth/admin/UpcomingClasses", icon: "bi-calendar", text: "Upcoming Classes" },
    { href: "/auth/admin/footer", icon: "bi-speedometer2", text: "Footer" },
    { href: "/auth/adminRegister", icon: "bi-person", text: "Register" },
    // Conditional Login/Logout
    ...(isAuthenticated
      ? [{ action: logout, icon: "bi-box-arrow-right", text: "Logout", textClass: "text-danger fw-semibold" }]
      : [{ href: "/auth/adminLogin", icon: "bi-person", text: "Login", textClass: "text-success" }]
    )
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
            <div className="d-flex gap-2 gap-md-3 align-items-center position-relative">






              <button
                className="btn btn-link position-relative p-0 border-0"
                onClick={handleBellClick}
              >
                <Bell size={20} className="text-dark" />
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="position-absolute"
                  style={{
                    top: "120%",
                    right: "0",
                    left: "auto",
                    zIndex: 1050,
                    minWidth: "280px",
                    maxWidth: "90vw",
                  }}
                >
                  <NotificationDropdown items={allNotifications} />
                </div>
              )}

              {/* User avatar */}
              <div
                className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center"
                style={{
                  width: "30px",
                  height: "30px",
                  fontSize: "12px",
                }}
                title="Logged in user"
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
        <nav className="nav flex-column gap-2 py-3 border-top">
          {navItems.map((item, index) =>
            item.href ? (
              <Link
                key={index}
                href={item.href}
                className={`d-flex align-items-center gap-2 text-decoration-none ${item.textClass || ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                <span>{item.text}</span>
              </Link>
            ) : (
              <button
                key={index}
                onClick={() => { item.action?.(); setMenuOpen(false); }}
                className={`d-flex align-items-center gap-2 text-start p-0 border-0 bg-transparent ${item.textClass || ''}`}
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
        <div className="d-lg-flex d-none">
          <aside
            className="sidebar bg-dark text-white pt-0 d-flex flex-column"
            style={{
              overflowY: "auto",
              height: "100vh",
              padding: "1rem",
              transition: "width 0.3s ease",
            }}
          >



            {/* Navigation */}
            <nav className="nav flex-column gap-2 py-3">
              {[
                // All your existing navigation items
                { href: "/auth/Dashboard/adminDashboard", icon: <LayoutDashboard size={18} />, text: "Dashboard" },
                { href: "/auth/admin/home", icon: <Home size={18} />, text: "Home" },
                { href: "/auth/admin/about", icon: <Info size={18} />, text: "About" },
                { href: "/auth/admin/allUser", icon: <User size={18} />, text: "Users" },
                { href: "/auth/admin/allContact", icon: <MessageSquare size={18} />, text: "Contacts" },
                { href: "/auth/admin/allinquiry", icon: <MessageSquare size={18} />, text: "Inquiries" },
                { href: "/auth/admin/ManageServices", icon: <Settings size={18} />, text: "Services" },
                { href: "/auth/admin/addblog", icon: <BookOpen size={18} />, text: "Blog" },
                { href: "/auth/admin/Gallery", icon: <ImageIcon size={18} />, text: "Success Gallery" },
                { href: "/auth/admin/testimonial", icon: <MessageSquare size={18} />, text: "Testimonial" },
                { href: "/auth/admin/addTeacherCourses", icon: <BookOpen size={18} />, text: "Add Teacher Courses" },
                { href: "/auth/admin/teams", icon: <User size={18} />, text: "Teams" },
                { href: "/auth/admin/courses", icon: <BookOpen size={18} />, text: "Courses" },
                { href: "/auth/admin/addAnnouncement", icon: <MessageSquare size={18} />, text: "Add Announcements" },
                { href: "/auth/admin/enrolledCourses", icon: <BookOpen size={18} />, text: "Enrolled Courses" },
                { href: "/auth/admin/allstudents", icon: <User size={18} />, text: "All Students" },
                { href: "/auth/admin/UpcomingClasses", icon: <Calendar size={18} />, text: "Upcomming classes" },
                { href: "/auth/admin/footer", icon: <LayoutDashboard size={18} />, text: "Footer" },
                { href: "/auth/adminRegister", icon: <User size={18} />, text: "Register" },

                // Conditional login/logout item
                ...(isAuthenticated
                  ? [{
                    action: logout,
                    icon: <LogOut size={20} />,
                    text: "Logout",
                    className: `d-flex align-items-center gap-2 py-2 ${isSidebarExpanded ? "btn" : "bg-transparent border-0 text-danger"
                      }`,
                    style: { borderRadius: "4px", fontWeight: "500" }
                  }]
                  : [{
                    href: "/auth/adminLogin",
                    icon: <User size={20} />,
                    text: "Login",
                    className: `d-flex align-items-center gap-2 py-2 ${isSidebarExpanded ? "btn" : "bg-transparent border-0 text-success"
                      }`,
                    style: { borderRadius: "4px", fontWeight: "500" }
                  }]
                )
              ].map((item, index) => (
                item.href ? (
                  <Link
                    key={index}
                    href={item.href}
                    className={`nav-link text-white d-flex align-items-center gap-2 sidebar-link ${item.className || ''}`}
                    style={{ paddingLeft: 0, ...item.style }}
                  >
                    {item.icon}
                    <span className={`sidebar-text ${isSidebarExpanded ? "d-inline" : "d-none"} d-lg-inline`}>
                      {item.text}
                    </span>
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={item.action}
                    className={`btn  nav-link text-white d-flex align-items-center gap-2 sidebar-link ${item.className || ''}`}
                    style={{ paddingLeft: 0, ...item.style }}
                  >
                    {item.icon}
                    <span className={`sidebar-text ${isSidebarExpanded ? "d-inline" : "d-none"} d-lg-inline`}>
                      {item.text}
                    </span>
                  </button>
                )
              ))}
            </nav>

          </aside>
          {/* Mobile Toggle Button - Only visible below lg breakpoint */}
          <button
            className="btn btn-success d-lg-none mb-3 d-flex align-items-center justify-content-center"
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            style={{
              borderRadius: '4px',
              padding: '0.2rem',
              width: '40px',
              height: '40px'
            }}
          >
            {isSidebarExpanded ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-grow-1 py-3 py-md-4">
          <div
            className="container px-3 px-md-4"
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

            {/* Stats Cards - Responsive grid */}
            <div className="row g-2 g-md-3 mb-3 mb-md-4">
              {[
                {
                  title: "Total Users",
                  value: userCount,
                  link: "/auth/admin/allUser",
                },
                {
                  title: "Contacts",
                  value: contactCount,
                  link: "/auth/admin/allContact",
                },
                {
                  title: "Inquiries",
                  value: inquiryCount,
                  link: "/auth/admin/allinquiry",
                },
                {
                  title: "Services",
                  value: serviceCount,
                  link: "/auth/admin/allServices",
                },
              ].map((stat, i: number) => (
                <div className="col-6 col-sm-6 col-md-3" key={i}>
                  {stat.link ? (
                    <Link
                      href={stat.link}
                      className="text-decoration-none text-dark"
                    >
                      <div className="card shadow-sm h-100 hover-shadow">
                        <div className="card-body text-center p-2 p-md-3">
                          <h6 className="text-muted small mb-1 mb-md-2">{stat.title}</h6>
                          <h4 className="fw-bold mb-0">{stat.value}</h4>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="card shadow-sm h-100">
                      <div className="card-body text-center p-2 p-md-3">
                        <h6 className="text-muted small mb-1 mb-md-2">{stat.title}</h6>
                        <h4 className="fw-bold mb-0">{stat.value}</h4>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Panels - Responsive layout */}
            <div className="row g-2 g-md-4">
              {/* Recent Contacts */}
              <div className="col-12 col-lg-6">
                <div className="card shadow-sm h-100">
                  <div className="card-body p-3 p-md-4">
                    <h5 className="card-title mb-2 mb-md-3">Recent Contacts</h5>
                    <ul className="list-group list-group-flush">
                      {recentContacts
                        .sort(
                          (a: Contact, b: Contact) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                        )
                        .slice(0, 3)
                        .map((con) => (
                          <li key={con._id} className="list-group-item px-0 py-2">
                            <strong>{con.name}</strong> - {con.course}
                            <br />
                            <small className="text-muted">
                              {new Date(con.createdAt).toLocaleDateString()}
                            </small>
                          </li>
                        ))}
                      {recentContacts.length === 0 && (
                        <li className="list-group-item text-muted px-0 py-2">
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
                  <div className="card-body p-3 p-md-4">
                    <h5 className="card-title mb-2 mb-md-3">Manage Services</h5>

                    {services.map((service) => (
                      <div
                        key={service._id}
                        className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2"
                      >
                        <span>{service.title}</span>
                      </div>
                    ))}

                    {services.length === 0 && (
                      <p className="text-muted mb-0">No services found.</p>
                    )}
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
