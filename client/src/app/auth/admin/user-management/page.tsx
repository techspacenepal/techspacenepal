// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// // 🔰 Common user interface
// interface User {
//   _id: string;
//   fullName: string;
//   username: string;
//   number: string;
//   email: string;
//   role: string;
//   isBlocked?: boolean;
//   createdAt?: string;
// }

// export default function UserManagementPage() {

//   const [users, setUsers] = useState<User[]>([]); // all users from /api/auth/users
//   const [students, setStudents] = useState<User[]>([]); // students from /api/students
//   const [loading, setLoading] = useState(true);
//   const [pageLoading, setPageLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState<"users" | "teachers" | "students">(
//     "users"
//   );
//   const router = useRouter();

//   // ✅ Fetch both users and students
//   useEffect(() => {
//     const token = Cookies.get("adminToken");
//     setTimeout(() => {
//       if (!token) {
//         toast.error("Please login to access this page");
//         router.push("/auth/adminLogin");
//       } else {
//         fetchUsers();
//         fetchStudents();
//       }
//       setPageLoading(false);
//     }, 1000);
//   }, []);

//   // ✅ Fetch users from /api/auth/users
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/auth/users");
//       const allUsers: User[] = res.data.users || res.data;
//       const sorted = allUsers.sort(
//         (a, b) =>
//           new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
//       );
//       setUsers(sorted);
//     } catch (err) {
//       toast.error("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch students from /api/students
//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/students");
//       // Some students might not have createdAt — add default value
//       const studentList: User[] = res.data.map((s: any) => ({
//         ...s,
//         createdAt: s.createdAt || new Date().toISOString(),
//       }));
//       setStudents(studentList);
//     } catch (err) {
//       toast.error("Failed to load students");
//     }
//   };

//   // ✅ Delete any user
//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       const token = Cookies.get("adminToken");
//       await axios.delete(`http://localhost:5000/api/auth/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUsers((prev) => prev.filter((user) => user._id !== id));
//       setStudents((prev) => prev.filter((user) => user._id !== id));
//       toast.success("User deleted");
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Delete failed");
//     }
//   };

//   const handleBlock = async (userId: string) => {
//   try {
//     await axios.put(`http://localhost:5000/api/auth/block/${userId}`, {}, {
//   headers: {
//     Authorization: `Bearer ${Cookies.get("adminToken")}`,
//   },
// });

//     toast.success("User status updated");
//     fetchUsers(); // Or reload the user list
//   } catch (err) {
//     toast.error("Failed to update user status");
//   }
// };

//   // ✅ Filtered lists
//   const filteredUsers = users.filter((user) =>
//     [user.username, user.email, user.role]
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   const filteredTeachers = users.filter(
//     (user) =>
//       user.role === "teacher" &&
//       [user.username, user.email]
//         .join(" ")
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//   );

//   const filteredStudents = students.filter((user) =>
//     [user.username, user.email, user.role]
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   // 🌀 Full page loading spinner
//   if (pageLoading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}
//       >
//         <div className="multi-spinner"></div>
//         <style jsx>{`
//           .multi-spinner {
//             width: 4rem;
//             height: 4rem;
//             border: 8px solid transparent;
//             border-top: 8px solid red;
//             border-right: 8px solid blue;
//             border-bottom: 8px solid green;
//             border-left: 8px solid orange;
//             border-radius: 50%;
//             animation: spin 1.2s linear infinite;
//           }

//           @keyframes spin {
//             0% {
//               transform: rotate(0deg);
//             }
//             100% {
//               transform: rotate(360deg);
//             }
//           }
//         `}</style>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-5">
//       <Toaster />

//       {/* 🔁 Tabs */}
//       <div className="mb-4">
//         <button
//           className={`btn me-2 ${
//             activeTab === "users" ? "btn-primary" : "btn-outline-primary"
//           }`}
//           onClick={() => setActiveTab("users")}
//         >
//           All Users
//         </button>
//         <button
//           className={`btn me-2 ${
//             activeTab === "teachers" ? "btn-success" : "btn-outline-success"
//           }`}
//           onClick={() => setActiveTab("teachers")}
//         >
//           Teachers
//         </button>
//         <button
//           className={`btn ${
//             activeTab === "students" ? "btn-warning" : "btn-outline-warning"
//           }`}
//           onClick={() => setActiveTab("students")}
//         >
//           Students
//         </button>
//       </div>

//       {/* 🔍 Search */}
//       <div className="input-group mb-4">
//         <span className="input-group-text bg-white">
//           <i className="bi bi-search" />
//         </span>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by username, email, role..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* 🔽 Tabs Content */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           {activeTab === "users" && (
//             <div>
//               <h4 className="text-primary mb-3">All Users</h4>
//               {filteredUsers.length === 0 ? (
//                 <p>No users found.</p>
//               ) : (
//                 <UserTable
//                   data={filteredUsers}
//                   handleDelete={handleDelete}
//                   showId={false}
//                   handleBlock={handleBlock}
//                 />
//               )}
//             </div>
//           )}

//           {activeTab === "teachers" && (
//             <div>
//               <h4 className="text-success mb-3">Teachers</h4>
//               {filteredTeachers.length === 0 ? (
//                 <p>No teachers found.</p>
//               ) : (
//                 <UserTable
//                   data={filteredTeachers}
//                   handleDelete={handleDelete}
//                   showId={true}
//                     handleBlock={handleBlock}
//                 />
//               )}
//             </div>
//           )}

//           {activeTab === "students" && (
//             <div>
//               <h4 className="text-warning mb-3">Students</h4>
//               {filteredStudents.length === 0 ? (
//                 <p>No students found.</p>
//               ) : (
//                 <UserTable
//                   data={filteredStudents}
//                   handleDelete={handleDelete}
//                   showId={true}
//                   hideActions={true}
//                   handleBlock={handleBlock}
//                 />
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// function UserTable({
//   data,
//   handleDelete,
//   handleBlock,
//   showId,
//   hideActions = false,
// }: {
//   data: User[];
//   handleDelete: (id: string) => void;
//   handleBlock: (id: string) => void;
//   showId: boolean;
//   hideActions?: boolean;
// }) {

//   return (
//     <div className="table-responsive bg-white rounded shadow-sm">
//       <table className="table table-bordered table-hover align-middle mb-0">
//         <thead className="table-dark text-center">
//           <tr>
//             <th>#</th>
//             {showId && <th>ID</th>}
//             <th>Full Name</th>
//             <th>Username</th>
//             <th>Number</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Date</th>
//             {!hideActions && <th>Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((user, idx) => (
//             <tr key={user._id} className="text-center">
//               <td>{idx + 1}</td>
//               {showId && <td>{user._id}</td>}
//               <td>{user.fullName}</td>
//               <td>{user.username}</td>
//                <td>{user.number}</td>
//               <td>{user.email}</td>
//               <td>{user.role}</td>
//               <td>{new Date(user.createdAt || "").toLocaleDateString()}</td>
//               {!hideActions && (
//                <td>
//   <button
//     onClick={() => handleDelete(user._id)}
//     className="btn btn-sm btn-danger"
//     disabled={user.role === "superadmin"}
//     title={user.role === "superadmin" ? "Cannot delete superadmin" : ""}
//   >
//     Delete
//   </button>
//    <button
//     onClick={() => handleBlock(user._id)}
//     className={`btn btn-sm ${user.isBlocked ? "btn-success" : "btn-warning"}`}
//     disabled={user.role === "superadmin"}
//   >
//     {user.isBlocked ? "Unblock" : "Block"}
//   </button>
// </td>

//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  fullName: string;
  username: string;
  number: string;
  email: string;
  role: string;
  isBlocked?: boolean;
  createdAt?: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "teachers" | "students">(
    "users"
  );
  const [loggedInUserRole, setLoggedInUserRole] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("adminToken");
    setTimeout(() => {
      if (!token) {
        toast.error("Please login to access this page");
        router.push("/auth/adminLogin");
      } else {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setLoggedInUserRole(parsedUser.role?.toLowerCase() || "");
          console.log("LOGGED IN ROLE:", parsedUser.role);
        }
        fetchUsers();
        fetchStudents();
      }
      setPageLoading(false);
    }, 1000);
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      const allUsers: User[] = res.data.users || res.data;
      const sorted = allUsers.sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
      setUsers(sorted);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      const studentList: User[] = res.data.map((s: any) => ({
        ...s,
        createdAt: s.createdAt || new Date().toISOString(),
        isBlocked: s.isBlocked || false,
      }));
      setStudents(studentList);
    } catch (err) {
      toast.error("Failed to load students");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = Cookies.get("adminToken");
      await axios.delete(`http://localhost:5000/api/auth/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((user) => user._id !== id));
      setStudents((prev) => prev.filter((user) => user._id !== id));
      toast.success("User deleted");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleBlock = async (userId: string) => {
    try {
      const isStudent = students.some((s) => s._id === userId);
      const endpoint = isStudent
        ? `http://localhost:5000/api/students/block/${userId}`
        : `http://localhost:5000/api/auth/block/${userId}`;

      await axios.put(
        endpoint,
        {},
        { headers: { Authorization: `Bearer ${Cookies.get("adminToken")}` } }
      );

      toast.success("User status updated");

      if (isStudent) {
        setStudents((prev) =>
          prev.map((student) =>
            student._id === userId
              ? { ...student, isBlocked: !student.isBlocked }
              : student
          )
        );
      } else {
        fetchUsers();
      }
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };

  const filteredUsers = users.filter((user) =>
    [user.username, user.email, user.role, user.number]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const filteredTeachers = users.filter(
    (user) =>
      user.role.toLowerCase() === "teacher" &&
      [user.username, user.email, user.number]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter((user) =>
    [user.username, user.email, user.role, user.number]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh", paddingTop: "50px" }}
      >
        <img
          src="/logo.png"
          alt="Loading..."
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Toaster position="top-right" />
      <h3 className="fw-bold mb-4 text-center text-primary">User Management</h3>

      {/* Tabs */}
      <div className="mb-4 d-flex justify-content-center gap-3">
        <button
          className={`btn ${
            activeTab === "users" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("users")}
        >
          All Users
        </button>
        <button
          className={`btn ${
            activeTab === "teachers" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setActiveTab("teachers")}
        >
          Teachers
        </button>
        <button
          className={`btn ${
            activeTab === "students" ? "btn-warning" : "btn-outline-warning"
          }`}
          onClick={() => setActiveTab("students")}
        >
          Students
        </button>
      </div>

      {/* Search */}
      <div className="mb-4" style={{ maxWidth: 400, margin: "auto" }}>
        <div className="input-group rounded shadow-sm">
          <span className="input-group-text bg-white border-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Search username, email, number, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {activeTab === "users" && (
            <UserTable
              title="All Users"
              data={filteredUsers}
              handleDelete={handleDelete}
              handleBlock={handleBlock}
              showId={false}
              loggedInUserRole={loggedInUserRole}
            />
          )}
          {activeTab === "teachers" && (
            <UserTable
              title="Teachers"
              data={filteredTeachers}
              handleDelete={handleDelete}
              handleBlock={handleBlock}
              showId={true}
              loggedInUserRole={loggedInUserRole}
            />
          )}
          {activeTab === "students" && (
            <UserTable
              title="Students"
              data={filteredStudents}
              handleDelete={handleDelete}
              handleBlock={handleBlock}
              showId={true}
              onlyBlock={true}
              loggedInUserRole={loggedInUserRole}
            />
          )}
        </>
      )}
    </div>
  );
}

function UserTable({
  title,
  data,
  handleDelete,
  handleBlock,
  showId,
  onlyBlock = false,
  loggedInUserRole,
}: {
  title: string;
  data: User[];
  handleDelete: (id: string) => void;
  handleBlock: (id: string) => void;
  showId: boolean;
  onlyBlock?: boolean;
  loggedInUserRole: string;
}) {
  const router = useRouter();
  const canSeeActions =
    loggedInUserRole === "admin" || loggedInUserRole === "superadmin";

  return (
    <>
      <h4 className="mb-3 fw-bold text-capitalize">{title}</h4>
      {data.length === 0 ? (
        <p className="text-muted">No {title.toLowerCase()} found.</p>
      ) : (
        <div className="table-responsive bg-white rounded shadow-sm">
          <table className="table table-hover align-middle table-bordered mb-0">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                {showId && <th>ID</th>}
                <th>Full Name</th>
                <th>Username</th>
                <th>Number</th>
                <th>Email</th>
                <th>Role</th>
                <th>Date</th>
                {canSeeActions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((user, idx) => (
                <tr key={user._id} className="text-center">
                  <td>{idx + 1}</td>
                  {showId && <td>{user._id}</td>}
                  <td>{user.fullName}</td>
                  <td>{user.username}</td>
                  <td>{user.number}</td>
                  <td>{user.email}</td>
                  <td className="text-capitalize">{user.role}</td>
                  <td>{new Date(user.createdAt || "").toLocaleDateString()}</td>
                  {canSeeActions && (
                    <td>
                      {!onlyBlock && (
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-sm btn-outline-danger me-2"
                          disabled={user.role.toLowerCase() === "superadmin"}
                          title={
                            user.role.toLowerCase() === "superadmin"
                              ? "Cannot delete superadmin"
                              : ""
                          }
                        >
                          Delete
                        </button>
                      )}

                      <button
                        onClick={() => handleBlock(user._id)}
                        className={`btn btn-sm ${
                          user.isBlocked
                            ? "btn-outline-success"
                            : "btn-outline-warning"
                        } me-2`}
                        disabled={user.role.toLowerCase() === "superadmin"}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>

                      {user.role.toLowerCase() === "student" && (
                        <button
                          className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                          style={{ minWidth: "110px" }}
                          onClick={() =>
                            router.push(
                              `/auth/Dashboard/adminDashboard/students/${user._id}`
                            )
                          }
                        >
                          <i className="bi bi-person-lines-fill"></i>
                          View Profile
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
