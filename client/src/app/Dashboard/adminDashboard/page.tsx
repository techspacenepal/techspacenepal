"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [userCount, setUserCount] = useState(0);    // <-- new state for user count
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);


  // Fetch contact and inquiry counts
useEffect(() => {
    const fetchData = async () => {
      try {
        const [inquiryRes, contactRes, userRes] = await Promise.all([
          axios.get("http://localhost:5000/api/inquiry"),
          axios.get("http://localhost:5000/api/contact"),
          axios.get("http://localhost:5000/api/auth/users"),  // <-- fetch users
        ]);

        const inquiries: Inquiry[] =
          inquiryRes.data.inquiries || inquiryRes.data;
        const contacts: Contact[] =
          contactRes.data.inquiries || contactRes.data;
        const users: UserType[] = userRes.data.users || userRes.data;  // <-- users data

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
        setUserCount(users.length);   // <-- set user count here
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

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h2 className="mb-4">Admin Panel</h2>
        <nav className="nav flex-column gap-2">
          <Link
            href="/auth/admin/dashboard"
            className="nav-link text-white d-flex align-items-center gap-2"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link
            href="/auth/admin/allUser"
            className="nav-link text-white d-flex align-items-center gap-2"
          >
            <User size={18} /> Users
          </Link>
          <Link
            href="/auth/admin/allContact"
            className="nav-link text-white d-flex align-items-center gap-2"
          >
            <Calendar size={18} /> Contacts
          </Link>
          <Link
            href="/auth/admin/allinquiry"
            className="nav-link text-white d-flex align-items-center gap-2"
          >
            <MessageSquare size={18} /> Inquiries
          </Link>
          <Link
            href="/auth/admin/services"
            className="nav-link text-white d-flex align-items-center gap-2"
          >
            <LayoutDashboard size={18} /> Services
          </Link>
          <Link
            href="/auth/adminLogout"
            className="nav-link text-danger d-flex align-items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 fw-bold">Dashboard</h1>
          <div className="d-flex gap-3">
            <Bell size={22} />
            <User size={22} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
        {[
          { title: "Total Users", value: userCount },  
          { title: "Contacts", value: contactCount },
          { title: "Inquiries", value: inquiryCount },
          { title: "Services", value: 12 }, // keep static for now
        ].map((stat, i) => (
          <div className="col-md-3" key={i}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="text-muted">{stat.title}</h6>
                <h4>{stat.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
        {/* Panels */}
        <div className="row g-4">
          {/* Inquiries Table */}
          {/* <div className="col-md-6">
            <div className="card shadow-sm">
            <div className="bg-white p-4 rounded-lg shadow mt-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Contacts</h3>
            <ul className="divide-y divide-gray-200">
              {recentContacts.map((con) => (
                <li key={con._id} className="py-1">
                  <p className="font-semibold">{con.name} - {con.course}</p>
                  <p className="text-sm text-gray-600 ">{new Date(con.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
              {recentContacts.length === 0 && (
                <li className="text-gray-500">No recent contacts found.</li>
              )}
            </ul>
          </div>
            </div>
          </div> */}

          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="bg-white p-4 rounded-lg shadow mt-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Recent Contacts
                </h3>
                <ul className="divide-y divide-gray-200">
                  {recentContacts
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .slice(0, 3)
                    .map((con) => (
                      <li key={con._id} className="py-1">
                        <p className="font-semibold">
                          {con.name} - {con.course}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(con.createdAt).toLocaleDateString()}
                        </p>
                      </li>
                    ))}
                  {recentContacts.length === 0 && (
                    <li className="text-gray-500">No recent contacts found.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Services Panel */}
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Manage Services</h5>
                <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                  <span>Web Development</span>
                  <div>
                    <button className="btn btn-outline-secondary btn-sm me-2">
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                  <span>SEO Optimization</span>
                  <div>
                    <button className="btn btn-outline-secondary btn-sm me-2">
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </div>
                <button className="btn btn-primary w-100 mt-3">
                  Add New Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
