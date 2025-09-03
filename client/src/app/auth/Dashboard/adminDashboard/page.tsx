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


  // Add this state for user info
  const [currentUser, setCurrentUser] = useState({
    name: "",
    image: ""
  });

  // Add this useEffect to load user data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = Cookies.get("adminToken");
        if (token) {
          const response = await axios.get("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCurrentUser({
            name: response.data.username || response.data.name || "Admin",
            image: response.data.image || ""
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    loadUserData();
  }, []);


  return (
    <>
      <div className="d-flex min-vh-100 bg-light">
        {/* Sidebar */}
        <div className="d-flex">
          <aside
            className="sidebar bg-dark text-white pt-0 d-flex flex-column"
            style={{
              overflowY: "auto",
              height: "100vh",
              padding: "1rem",
              transition: "width 0.3s ease",
            }}
          >
            {/* Fixed Profile Section at Top */}
            <div className=""
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                backgroundColor: 'inherit',
              }}
            >
              <div className="d-flex align-items-center mb-3 gap-2 mt-3">
                <div className="d-flex align-items-center" >
                  {currentUser.image ? (
                    <img
                      src={currentUser.image}
                      alt="User Profile"
                      className="rounded-circle"
                      style={{
                        width: "clamp(30px, 3vw, 40px)",
                        height: "clamp(30px, 3vw, 40px)",
                        objectFit: "cover",
                        minWidth: "30px"
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-white text-primary d-flex justify-content-center align-items-center fw-bold"
                      style={{
                        width: "clamp(30px, 3vw, 40px)",
                        height: "clamp(30px, 3vw, 40px)",
                        minWidth: "30px",
                        fontSize: "clamp(12px, 1.5vw, 14px)"
                      }}
                    >
                      {currentUser.name ? getInitials(currentUser.name) : "AD"}
                    </div>
                  )}
                </div>
                <div
                  className={`${isSidebarExpanded ? "d-block" : "d-none"
                    } d-lg-block`}
                >
                  <h2
                    className="sidebar-title mb-0"
                    style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                  >
                    Admin Panel
                  </h2>
                  <small
                    className="text-white-50"
                    style={{ fontSize: "clamp(0.7rem, 1vw, 0.85rem)" }}
                  >
                    {currentUser.name}
                  </small>
                </div>

              </div>
            </div>



            {/* Navigation */}
            <nav className="nav flex-column gap-2">
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
            {/* Header - Responsive adjustments */}
            <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4 flex-wrap gap-2">
              <h1 className="h4 h3-md fw-bold mb-0">Dashboard</h1>
              <div className="d-flex gap-2 gap-md-3 align-items-center position-relative">
                <button
                  className="btn btn-link position-relative p-0 border-0"
                  onClick={handleBellClick}
                >
                  <Bell size={20} size-md={22} className="text-dark" />
                  {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown - Responsive positioning */}
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="position-absolute px-50"
                    style={{
                      top: "120%",
                      right: "0",
                      left: "auto",
                      zIndex: 1050,
                      minWidth: "280px",
                      maxWidth: "90vw"
                    }}
                  >
                    <NotificationDropdown items={allNotifications} />
                  </div>
                )}

                {/* User avatar - Responsive size */}
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
