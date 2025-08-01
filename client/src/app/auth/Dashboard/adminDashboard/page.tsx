// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   Bell,
//   User,
//   Calendar,
//   MessageSquare,
//   LayoutDashboard,
//   LogOut,
//   ClipboardList,
// } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/context/AuthContext";

// interface Inquiry {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   course: string;
//   message?: string;
//   createdAt: string;
//   seen?: boolean;
// }

// interface Contact {
//   _id: string;
//   name: string;
//   email: string;
//   mobile: string;
//   course: string;
//   message?: string;
//   createdAt: string;
//   seen?: boolean;
// }

// interface UserType {
//   _id: string;
//   username: string;
//   email: string;
//   role: string;
//   createdAt: string;
// }

// interface NotificationItem {
//   _id: string;
//   name: string;
//   course: string;
//   type: "inquiry" | "contact";
//   createdAt: string;
// }

// interface Service {
//   _id: string;
//   title: string;
// }

// const getInitials = (name: string) => {
//   const parts = name.trim().split(" ");
//   if (parts.length >= 2) {
//     return (parts[0][0] + parts[1][0]).toUpperCase();
//   } else if (parts.length === 1) {
//     return parts[0].slice(0, 2).toUpperCase();
//   }
//   return "";
// };

// const NotificationDropdown: React.FC<{ items: NotificationItem[] }> = ({
//   items,
// }) => {
//   return (
//     <div
//       className="dropdown-menu dropdown-menu-end show p-2 shadow"
//       style={{ minWidth: "300px" }}
//     >
//       <h6 className="dropdown-header">Notifications</h6>
//       {items.length === 0 ? (
//         <span className="dropdown-item text-muted">No new notifications</span>
//       ) : (
//         items.map((item) => (
//           <div key={item._id} className="dropdown-item small">
//             <strong>{item.name}</strong> sent a new {item.type}
//             <br />
//             <small className="text-muted">
//               {new Date(item.createdAt).toLocaleString("en-GB")}
//             </small>
//           </div>
//         ))
//       )}
//       <div className="dropdown-divider" />
//       <div className="text-center">
//         <Link
//           href="/auth/admin/allContact"
//           className="dropdown-item small text-primary"
//         >
//           View All Contacts
//         </Link>
//         <Link
//           href="/auth/admin/allinquiry"
//           className="dropdown-item small text-primary"
//         >
//           View All Inquiries
//         </Link>
//       </div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [inquiryCount, setInquiryCount] = useState(0);
//   const [contactCount, setContactCount] = useState(0);
//   const [userCount, setUserCount] = useState(0);
//   const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
//   const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [userInitials, setUserInitials] = useState("");
//   // const [services, setServices] = useState([]);
//   const [serviceCount, setServiceCount] = useState(0);
//   const [services, setServices] = useState<Service[]>([]);

//   const router = useRouter();

//   // login vayesi matra dashboard dekhine
//   const { isAuthenticated, logout } = useAuth();

//   useEffect(() => {
//     const token = Cookies.get("adminToken");
//     if (!token) {
//       router.push("/auth/adminLogin");
//     }
//   }, [router]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setShowDropdown(false);
//       }
//     };

//     if (showDropdown) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showDropdown]);

//   // Load user initials from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const user = JSON.parse(storedUser);
//         const fullName = user.username || user.name || "";
//         setUserInitials(getInitials(fullName));
//       } catch {
//         setUserInitials("");
//       }
//     }
//   }, []);

//   // Fetch contact and inquiry counts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [inquiryRes, contactRes, userRes, serviceRes] = await Promise.all(
//           [
//             axios.get("http://localhost:5000/api/inquiry"),
//             axios.get("http://localhost:5000/api/contact"),
//             axios.get("http://localhost:5000/api/auth/users"),
//             axios.get("http://localhost:5000/api/services"), // 4th request
//           ]
//         );

//         // ✅ These must be arrays — add fallback empty array to avoid TypeError
//         const inquiries = Array.isArray(inquiryRes.data)
//           ? inquiryRes.data
//           : inquiryRes.data.inquiries || [];
//         const contacts = Array.isArray(contactRes.data)
//           ? contactRes.data
//           : contactRes.data.contacts || [];
//         const users = Array.isArray(userRes.data)
//           ? userRes.data
//           : userRes.data.users || [];

//         const services = Array.isArray(serviceRes.data) ? serviceRes.data : [];
//         setServiceCount(services.length);
//         const sortedInquiries = inquiries.sort(
//           (a: Inquiry, b: Inquiry) =>
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         );
//         const sortedContacts = contacts.sort(
//           (a: Contact, b: Contact) =>
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//         );

//         setInquiryCount(sortedInquiries.length);
//         setContactCount(sortedContacts.length);
//         setUserCount(users.length);

//         setRecentInquiries(sortedInquiries.slice(0, 3));
//         setRecentContacts(sortedContacts.slice(0, 3));

//         // ✅ Count only unseen
//         const unseenInquiries = sortedInquiries.filter((i: Inquiry) => !i.seen);
//         const unseenContacts = sortedContacts.filter((c: Contact) => !c.seen);

//         setUnreadCount(unseenInquiries.length + unseenContacts.length);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const allNotifications = [
//     ...recentContacts.map((item) => ({ ...item, type: "contact" as const })),
//     ...recentInquiries.map((item) => ({
//       ...item,
//       name: item.name || "",
//       type: "inquiry" as const,
//     })),
//   ]
//     .sort(
//       (a, b) =>
//         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//     )
//     .slice(0, 5);

//   const handleBellClick = async () => {
//     const newShow = !showDropdown;
//     setShowDropdown(newShow);

//     if (newShow) {
//       try {
//         // Mark all as seen on backend
//         await Promise.all([
//           axios.put("http://localhost:5000/api/inquiry/mark-seen"),
//           axios.put("http://localhost:5000/api/contact/mark-seen"),
//         ]);
//         setUnreadCount(0); // Reset unread count on frontend
//       } catch (error) {
//         console.error("Failed to mark notifications as seen", error);
//       }
//     }
//   };

//   const fetchServices = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/services");
//       setServices(res.data); // Assuming it's an array of services
//     } catch (err) {
//       console.error("Failed to fetch services:", err);
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   return (
//     <>
//       <div className="d-flex min-vh-100 bg-light">
//         {/* Sidebar */}
//         <aside className="sidebar bg-dark text-white p-3">
//           <h2 className="mb-4 sidebar-title">Admin Panel</h2>
//           <nav className="nav flex-column gap-2">
//             <Link
//               href="/auth/Dashboard/adminDashboard"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <LayoutDashboard size={18} />
//               <span className="sidebar-text">Dashboard</span>
//             </Link>

//             {/* <Link
//               href="/auth/admin/allUser"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <User size={18} />
//               <span className="sidebar-text">Users</span>
//             </Link>

//             <Link
//               href="/auth/admin/allContact"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <Calendar size={18} />
//               <span className="sidebar-text">Contacts</span>
//             </Link>

//             <Link
//               href="/auth/admin/allinquiry"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <MessageSquare size={18} />
//               <span className="sidebar-text">Inquiries</span>
//             </Link> */}

//               <Link
//               href="/auth/admin/studnetAssignment"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//                <ClipboardList size={18} />
//               <span className="sidebar-text">studnets Assignments</span>
//             </Link>

//             <Link
//               href="/auth/admin/ManageServices"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <LayoutDashboard size={18} />
//               <span className="sidebar-text">Services</span>
//             </Link>

//             <Link
//               href="/auth/admin/gallery"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <i className="bi bi-images" style={{ fontSize: "1rem" }}></i>
//               <span className="sidebar-text">Success Gallery</span>
//             </Link>
//             {/* <Link
//               href="/auth/admin/generatecertificate"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <i className="bi bi-images" style={{ fontSize: "1rem" }}></i>
//               <span className="sidebar-text">CertificateForm</span>
//             </Link> */}

//             <Link
//               href="/auth/admin/testimonial"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <i className="bi bi-chat-text" style={{ fontSize: "1rem" }}></i>
//               <span className="sidebar-text">Testimonial</span>
//             </Link>

//             <Link
//               href="/auth/admin/addTeacherCourses"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <i
//                 className="bi bi-journal-plus"
//                 style={{ fontSize: "1rem" }}
//               ></i>
//               <span className="sidebar-text">Add Teacher Courses</span>
//             </Link>

//             <Link
//               href="/auth/admin/teams"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <i className="bi bi-people" style={{ fontSize: "1rem" }}></i>
//               <span className="sidebar-text">Teams</span>
//             </Link>

//             <Link
//               href="/auth/admin/courses"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <i
//                 className="bi bi-journal-bookmark"
//                 style={{ fontSize: "1rem" }}
//               ></i>
//               <span className="sidebar-text">Courses</span>
//             </Link>

//             <Link
//               href="/auth/admin/addAnnouncement"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <i className="bi bi-megaphone" style={{ fontSize: "1rem" }}></i>
//               <span className="sidebar-text">Add Announcements</span>
//             </Link>

//             <Link
//               href="/auth/admin/enrolledCourses"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <i
//                 className="bi bi-journal-check"
//                 style={{ fontSize: "1rem" }}
//               ></i>
//               <span className="sidebar-text">Add Enrolled Courses</span>
//             </Link>

//             <Link
//               href="/auth/admin/allstudents"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <i
//                 className="bi bi-person-badge"
//                 style={{ fontSize: "1rem" }}
//               ></i>
//               <span className="sidebar-text">All Students</span>
//             </Link>

//             <Link
//               href="/auth/admin/UpcomingClasses"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <i
//                 className="bi bi-calendar-event"
//                 style={{ fontSize: "1rem" }}
//               ></i>
//               <span className="sidebar-text">Classes UP</span>
//             </Link>

//             <Link
//               href="/auth/adminRegister"
//               className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
//             >
//               <i
//                 className="bi bi-person-fill"
//                 style={{ fontSize: "1rem", marginRight: "0.5rem" }}
//               ></i>
//               <span className="sidebar-text">Register</span>
//             </Link>

//             {isAuthenticated ? (
//               <button
//                 onClick={logout}
//                 className="btn btn-danger d-flex align-items-center gap-2"
//               >
//                 <LogOut size={18} />
//                 Logout
//               </button>
//             ) : (
//               <Link href="/auth/adminLogin" className="btn btn-success">
//                 Login
//               </Link>
//             )}
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-grow-1 py-4">
//           <div
//             className="container px-4"
//             style={{ maxWidth: "1280px", margin: "0 auto" }}
//           >
//             {/* Header */}
//             <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//               <h1 className="h3 fw-bold mb-2 mb-md-0">Dashboard</h1>
//               <div className="d-flex gap-3 align-items-center position-relative">
//                 <button
//                   className="btn btn-link position-relative p-0 border-0"
//                   onClick={handleBellClick}
//                 >
//                   <Bell size={22} className="text-dark" />
//                   {unreadCount > 0 && (
//                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                       {unreadCount}
//                     </span>
//                   )}
//                 </button>

//                 {/* Notification Dropdown */}
//                 {showDropdown && (
//                   <div
//                     ref={dropdownRef}
//                     className="position-absolute px-50"
//                     style={{
//                       top: "120%",
//                       left: "-230px",
//                       zIndex: 1050,
//                     }}
//                   >
//                     <NotificationDropdown items={allNotifications} />
//                   </div>
//                 )}

//                 {/* Show user initials */}
//                 <div
//                   className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center"
//                   style={{ width: 32, height: 32, fontSize: 14 }}
//                   title="Logged in user"
//                 >
//                   {userInitials}
//                 </div>
//               </div>
//             </div>

//             {/* Stats Cards */}
//             <div className="row g-3 mb-4">
//               {[
//                 {
//                   title: "Total Users",
//                   value: userCount,
//                   link: "/auth/admin/allUser",
//                 },
//                 {
//                   title: "Contacts",
//                   value: contactCount,
//                   link: "/auth/admin/allContact",
//                 },
//                 {
//                   title: "Inquiries",
//                   value: inquiryCount,
//                   link: "/auth/admin/allinquiry",
//                 },
//                 {
//                   title: "Services",
//                   value: serviceCount,
//                   link: "/auth/admin/ManageServices",
//                 },
//               ].map((stat, i: number) => (
//                 <div className="col-12 col-sm-6 col-md-3" key={i}>
//                   {stat.link ? (
//                     <Link
//                       href={stat.link}
//                       className="text-decoration-none text-dark"
//                     >
//                       <div className="card shadow-sm h-100 hover-shadow">
//                         <div className="card-body text-center">
//                           <h6 className="text-muted small">{stat.title}</h6>
//                           <h4 className="fw-bold mb-0">{stat.value}</h4>
//                         </div>
//                       </div>
//                     </Link>
//                   ) : (
//                     <div className="card shadow-sm h-100">
//                       <div className="card-body text-center">
//                         <h6 className="text-muted small">{stat.title}</h6>
//                         <h4 className="fw-bold mb-0">{stat.value}</h4>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Panels */}
//             <div className="row g-4">
//               {/* Recent Contacts */}
//               <div className="col-12 col-lg-6">
//                 <div className="card shadow-sm h-100">
//                   <div className="card-body">
//                     <h5 className="card-title mb-3">Recent Contacts</h5>
//                     <ul className="list-group list-group-flush">
//                       {[
//                         {
//                           title: "Total Users",
//                           value: userCount,
//                           link: "/auth/admin/allUser",
//                         },
//                         {
//                           title: "Contacts",
//                           value: contactCount,
//                           link: "/auth/admin/allContact",
//                         },
//                         {
//                           title: "Inquiries",
//                           value: inquiryCount,
//                           link: "/auth/admin/allinquiry",
//                         },
//                         {
//                           title: "Services",
//                           value: serviceCount,
//                           link: "/auth/admin/allServices",
//                         },
//                       ].map((stat, i: number) => (
//                         <div className="col-12 col-sm-6 col-md-3" key={i}></div>
//                       ))}

//                       {recentContacts
//                         .sort(
//                           (a: Contact, b: Contact) =>
//                             new Date(b.createdAt).getTime() -
//                             new Date(a.createdAt).getTime()
//                         )
//                         .slice(0, 3)
//                         .map((con) => (
//                           <li key={con._id} className="list-group-item">
//                             <strong>{con.name}</strong> - {con.course}
//                             <br />
//                             <small className="text-muted">
//                               {new Date(con.createdAt).toLocaleDateString()}
//                             </small>
//                           </li>
//                         ))}
//                       {recentContacts.length === 0 && (
//                         <li className="list-group-item text-muted">
//                           No recent contacts found.
//                         </li>
//                       )}
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* Services Panel */}
//               <div className="col-12 col-lg-6">
//                 <div className="card shadow-sm h-100">
//                   <div className="card-body">
//                     <h5 className="card-title mb-3">Manage Services</h5>

//                     {services.map((service) => (
//                       <div
//                         key={service._id}
//                         className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2"
//                       >
//                         <span>{service.title}</span>
//                       </div>
//                     ))}

//                     {services.length === 0 && (
//                       <p className="text-muted">No services found.</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* <h4>Certificate Background</h4>
//               <a
//                 href="http://localhost:5000/api/certificates/template"
//                 download
//                 className="btn btn-outline-primary"
//               >
//                 📄 Download Certificate Template
//               </a> */}

//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bell, LayoutDashboard, LogOut, ClipboardList } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import NotificationDropdown from "@/app/Component/adminNotification";

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

interface StudentNotification {
  _id: string;
  name?: string;
  studentName?: string;
  message: string;
  course: string;
  createdAt: string;
  seenBy?: string[];
  type?: string;
}

interface Service {
  _id: string;
  title: string;
}

interface NotificationItem {
  _id: string;
  name?: string;
  studentName?: string;
  title?: string;
  message?: string;
  createdAt: string;
  type: "student_notification";
  seenBy?: string[];
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
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userInitials, setUserInitials] = useState("");
  const [serviceCount, setServiceCount] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [studentNotifications, setStudentNotifications] = useState<
    StudentNotification[]
  >([]);
  const [studentUnreadCount, setStudentUnreadCount] = useState(0);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [role, setRole] = useState<string | null>(null);

  const router = useRouter();

  const { isAuthenticated, logout } = useAuth();
  const { user } = useAuth();

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

  // Fetch student notifications only for Bell icon and dropdown

  useEffect(() => {
    if (
      user?.role === "admin" ||
      user?.role === "superadmin" ||
      user?.role === "user"
    ) {
      const fetchNotifications = async () => {
        const token =
          localStorage.getItem("adminToken") ||
          localStorage.getItem("superadminToken") ||
          localStorage.getItem("userToken");

        if (!token) {
          console.warn("No token found");
          return;
        }

        try {
          const res = await axios.get(
            "http://localhost:5000/api/student/notifications/student/notifications",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNotifications(res.data);
        } catch (err) {
          console.error("Error fetching notifications:", err);
          setError("Failed to fetch notifications");
        } finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    }
  }, [user]);

  useEffect(() => {
    const currentRole = user?.role; // जहाँबाट role पाउँछौ

    if (notifications.length > 0 && currentRole) {
      const unreadCount = notifications.filter(
        (n) => !n.seenBy || !n.seenBy.includes(currentRole)
      ).length;
      setStudentUnreadCount(unreadCount);
    }
  }, [notifications, user?.role]);

  // Fetch inquiry, contact, user, and services data for cards and lists only
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [inquiryRes, contactRes, userRes, serviceRes] = await Promise.all(
          [
            axios.get("http://localhost:5000/api/inquiry"),
            axios.get("http://localhost:5000/api/contact"),
            axios.get("http://localhost:5000/api/auth/users"),
            axios.get("http://localhost:5000/api/services"),
          ]
        );

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
        setServices(services);

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
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const handleBellClick = async () => {
  //   const newShow = !showDropdown;
  //   setShowDropdown(newShow);

  //   if (newShow) {
  //     try {
  //       const token =
  // Cookies.get("adminToken") ||
  // Cookies.get("superadminToken") ||
  // Cookies.get("userToken");// यहाँ token लिएर आउनुहोस्
  //       if (!token) {
  //         console.error("No admin token found");
  //         return;
  //       }

  //       // Mark student notifications as seen only
  //       await axios.put(
  //         "http://localhost:5000/api/student/notifications/student/mark-seen",
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       setStudentUnreadCount(0);
  //     } catch (error) {
  //       console.error("Failed to mark student notifications as seen", error);
  //     }
  //   }
  // };

  // dashboard page.jsx or wherever you handle bell
  const handleBellClick = async () => {
    const newShow = !showDropdown;
    setShowDropdown(newShow);

    if (newShow) {
      try {
        const token =
          Cookies.get("adminToken") ||
          Cookies.get("superadminToken") ||
          Cookies.get("userToken");

        if (!token) return;

        // ✅ 1. Mark as seen
        await axios.put(
          "http://localhost:5000/api/student/notifications/student/mark-seen",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // ✅ 2. Refetch updated notifications from backend
        const res = await axios.get(
          "http://localhost:5000/api/student/notifications/student/notifications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // ✅ 3. Update the state
        setStudentNotifications(res.data); // ⚠️ This must update the prop passed to <NotificationDropdown />
        setStudentUnreadCount(0);
      } catch (err) {
        console.error("Failed to mark as seen and refetch:", err);
      }
    }
  };

  return (
    <>
      <div className="d-flex min-vh-100 bg-light">
        {/* Sidebar */}
        <aside className="sidebar bg-dark text-white p-3">
          <h2 className="mb-4 sidebar-title">Admin Panel</h2>
          <nav className="nav flex-column gap-2">
            <Link
              href="/auth/Dashboard/adminDashboard"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <LayoutDashboard size={18} />
              <span className="sidebar-text">Dashboard</span>
            </Link>

            <Link
              href="/auth/admin/studnetAssignment"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <ClipboardList size={18} />
              <span className="sidebar-text">studnets Assignments</span>
            </Link>

            <Link
              href="/auth/admin/ManageServices"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <LayoutDashboard size={18} />
              <span className="sidebar-text">Services</span>
            </Link>

            <Link
              href="/auth/admin/gallery"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i className="bi bi-images" style={{ fontSize: "1rem" }}></i>
              <span className="sidebar-text">Success Gallery</span>
            </Link>

            <Link
              href="/auth/admin/testimonial"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i className="bi bi-chat-text" style={{ fontSize: "1rem" }}></i>
              <span className="sidebar-text">Testimonial</span>
            </Link>

            <Link
              href="/auth/admin/addTeacherCourses"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i
                className="bi bi-journal-plus"
                style={{ fontSize: "1rem" }}
              ></i>
              <span className="sidebar-text">Enrolled Teacher Courses</span>
            </Link>

            <Link
              href="/auth/admin/teams"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i className="bi bi-people" style={{ fontSize: "1rem" }}></i>
              <span className="sidebar-text">Teams</span>
            </Link>

            <Link
              href="/auth/admin/courses"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i
                className="bi bi-journal-bookmark"
                style={{ fontSize: "1rem" }}
              ></i>
              <span className="sidebar-text">Courses</span>
            </Link>

            <Link
              href="/auth/admin/addAnnouncement"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i className="bi bi-megaphone" style={{ fontSize: "1rem" }}></i>
              <span className="sidebar-text">Add Announcements</span>
            </Link>

            <Link
              href="/auth/admin/enrolled-students"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i
                className="bi bi-journal-check"
                style={{ fontSize: "1rem" }}
              ></i>
              <span className="sidebar-text">Enrolled Students </span>
            </Link>

            <Link
              href="/auth/admin/students-management"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i
                className="bi bi-person-badge"
                style={{ fontSize: "1rem" }}
              ></i>
              <span className="sidebar-text">Students Management</span>
            </Link>

            <Link
              href="/auth/admin/UpcomingClasses"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i
                className="bi bi-calendar-event"
                style={{ fontSize: "1rem" }}
              ></i>
              <span className="sidebar-text">Classes UP</span>
            </Link>

            <Link
              href="/auth/adminRegister"
              className="nav-link text-white d-flex align-items-center gap-2 sidebar-link"
            >
              <i
                className="bi bi-person-fill"
                style={{ fontSize: "1rem", marginRight: "0.5rem" }}
              ></i>
              <span className="sidebar-text">Register</span>
            </Link>

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
              <div className="d-flex gap-3 align-items-center position-relative">
                {(user?.role === "admin" ||
                  user?.role === "superadmin" ||
                  user?.role === "user") && (
                  <button
                    className="btn btn-link position-relative p-0 border-0"
                    onClick={handleBellClick}
                  >
                    <Bell size={22} className="text-dark" />
                    {studentUnreadCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {studentUnreadCount}
                      </span>
                    )}
                  </button>
                )}

                {/* Notification Dropdown - only student notifications */}
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="position-absolute"
                    style={{ top: "120%", left: "-230px", zIndex: 1050 }}
                  >
                    <NotificationDropdown
                      notifications={notifications
                        ?.filter((n) => n?.type === "student_notification")
                        .map((n) => ({
                          _id: n._id,
                          name: n.name || n.studentName || "Unknown",
                          title: n.title, // ✅ make sure this is mapped!
                          message: n.message,
                          createdAt: n.createdAt,
                          type: "student_notification",
                          seenBy: n.seenBy,
                        }))}
                    />
                  </div>
                )}

                {/* User Initials */}
                <div
                  className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center"
                  style={{ width: 32, height: 32, fontSize: 14 }}
                  title="Logged in user"
                >
                  {userInitials}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-3 mb-4">
              {[
                {
                  title: "Total Users",
                  value: userCount,
                  link: "/auth/admin/user-management",
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
                  link: "/auth/admin/ManageServices",
                },
              ].map((stat, i: number) => (
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
                      {recentContacts.length > 0 ? (
                        recentContacts
                          .sort(
                            (a: Contact, b: Contact) =>
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
                          ))
                      ) : (
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

                    {services.length > 0 ? (
                      services.map((service) => (
                        <div
                          key={service._id}
                          className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2"
                        >
                          <span>{service.title}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No services found.</p>
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
