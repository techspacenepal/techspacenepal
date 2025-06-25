"use client";

import React, { useEffect, useState } from "react";
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

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message?: string;
  createdAt: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  course: string;
  message?: string;
  createdAt: string;
}

interface UserType {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

const Dashboard = () => {
  const [inquiryCount, setInquiryCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (!token) {
      router.push("/auth/adminLogin");
    }
  }, [router]);

  // login vayesi matra dashboard dekhine
  const { isAuthenticated, logout } = useAuth();

  //   const logout = () => {
  //   Cookies.remove("adminToken"); // Token हटाउनुहोस्
  //   router.push("/auth/adminLogin"); // Login page मा redirect गर्नुहोस्
  // };
  ///-----

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

  // const handleLogout = () => {
  //   Cookies.remove("adminToken");
  //   router.push("/auth/adminLogin");
  // };

  return (
    <>
      <div className="d-flex min-vh-100 bg-light">
        {/* Sidebar */}
        <aside className="sidebar bg-dark text-white p-3">
          <h2 className="mb-4 sidebar-title">Admin Panel</h2>
          <nav className="nav flex-column gap-2">
            <Link
              href="/auth/admin/dashboard"
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
              href="/auth/admin/ManageServices"
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
               <Link
              href="/auth/admin/courses"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i className="bi bi-images" style={{ fontSize: "1rem" }}></i>
              <span className="sidebar-text">Courses</span>
            </Link>
                <Link
              href="/auth/admin/UpcomingClasses"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i className="bi bi-images" style={{ fontSize: "1rem" }}></i>
              <span className="sidebar-text">classes UP</span>
            </Link>

             <Link
              href="/auth/adminRegister/superAdmin"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i className="bi bi-person-fill me-2" style={{ fontSize: "1rem" }}></i>
              <span className="sidebar-text">Register</span>
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
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
              <h1 className="h3 fw-bold mb-2 mb-md-0">Dashboard</h1>
              <div className="d-flex gap-3">
                <Bell size={22} />
                <User size={22} />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-3 mb-4">
              {[
                { title: "Total Users", value: userCount,  link: "/auth/admin/allUser" },
                { title: "Contacts", value: contactCount, link: "/auth/admin/allContact"  },
                { title: "Inquiries", value: inquiryCount,link: "/auth/admin/allinquiry"  },
                { title: "Services", value: 12 , link: "/auth/admin/allServices" },
              ].map((stat, i) => (
                <div className="col-12 col-sm-6 col-md-3" key={i}>
    {stat.link ? (
      <Link href={stat.link} className="text-decoration-none text-dark">
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
                            new Date(b.createdAt) - new Date(a.createdAt)
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
