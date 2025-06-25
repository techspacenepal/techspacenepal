

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AdminTeamPage() {
//   const [team, setTeam] = useState([]);
//   const [form, setForm] = useState({ name: "", role: "", bio: "", image: null });
//   const [editId, setEditId] = useState(null);
//   const formRef = useRef(null); // ref create gareko


//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/team");
//       setTeam(data);
//     } catch (error) {
//       toast.error("Failed to load team members");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     fd.append("name", form.name);
//     fd.append("role", form.role);
//     fd.append("bio", form.bio);
//     if (form.image) fd.append("image", form.image);

//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/team/${editId}`, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success("Team member updated");
//       } else {
//         await axios.post("http://localhost:5000/api/team", fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success("Team member added");
//       }

//       setForm({ name: "", role: "", bio: "", image: null });
//       setEditId(null);
//       fetchTeam();
//     } catch (err) {
//       toast.error("Failed to save team member");
//     }
//   };

//   const handleEdit = (member) => {
//     setForm({ name: member.name, role: member.role, bio: member.bio, image: null });
//     setEditId(member._id);

//     // Scroll form into view after state update
//     setTimeout(() => {
//       if (formRef.current) {
//         formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     }, 100);

//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this team member?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/team/${id}`);
//       toast.success("Deleted successfully");
//       fetchTeam();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="container py-5">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h2 className="mb-4">{editId ? "Edit Team Member" : "Add Team Member"}</h2>

//          <div ref={formRef}>
//       <form onSubmit={handleSubmit} className="mb-5">
//         <input name="name" onChange={handleChange} className="form-control mb-2" placeholder="Name" value={form.name} required />
//         <input name="role" onChange={handleChange} className="form-control mb-2" placeholder="Role" value={form.role} required />
//         <textarea name="bio" onChange={handleChange} className="form-control mb-2" placeholder="Bio" value={form.bio} required />
//         <input type="file" name="image" onChange={handleChange} className="form-control mb-2" />
//         <button className="btn btn-primary" type="submit">
//           {editId ? "Update" : "Add"}
//         </button>
//         {editId && (
//           <button type="button" className="btn btn-secondary ms-2" onClick={() => {
//             setForm({ name: "", role: "", bio: "", image: null });
//             setEditId(null);
//           }}>
//             Cancel
//           </button>
//         )}
//       </form>
//       </div>

//       <h3>Team List</h3>
//       <div className="row g-4">
//         {team.map((member) => (
//           <div className="col-md-4" key={member._id}>
//             <div className="card p-3 text-center">
//               <img
//                 src={`http://localhost:5000/uploads/${member.image}`}
//                 alt={member.name}
//                 className="rounded-circle mx-auto"
//                 width={100}
//                 height={100}
//                 style={{ objectFit: "cover" }}
//               />



//               <h5 className="mt-3">{member.name}</h5>
//               <p>{member.role}</p>
//               <small>{member.bio}</small>
//               <div className="mt-2">
//                 <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(member)}>Edit</button>
//                 <button className="btn btn-sm btn-danger" onClick={() => handleDelete(member._id)}>Delete</button>
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminTeamPage() {
  const router = useRouter();
  const [team, setTeam] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", bio: "", image: null });
  const [editId, setEditId] = useState(null);
  const [pageLoading, setLoading] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("adminToken");

    setTimeout(() => {
      if (!token) {
        toast.error("Please login to access this page");
        router.push("/auth/adminLogin");
      } else {
        fetchTeam();
        setLoading(false);
      }
    }, 1000);
  }, []);

  const fetchTeam = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/team");
      setTeam(data);
    } catch (error) {
      toast.error("Failed to load team members");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("bio", form.bio);
    if (form.image) fd.append("image", form.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/team/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Team member updated");
      } else {
        await axios.post("http://localhost:5000/api/team", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Team member added");
      }

      setForm({ name: "", role: "", bio: "", image: null });
      setEditId(null);
      fetchTeam();
    } catch (err) {
      toast.error("Failed to save team member");
    }
  };

  const handleEdit = (member) => {
    setForm({ name: member.name, role: member.role, bio: member.bio, image: null });
    setEditId(member._id);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this team member?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/team/${id}`);
      toast.success("Deleted successfully");
      fetchTeam();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (pageLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="multi-spinner"></div>
        <style jsx>{`
          .multi-spinner {
            width: 4rem;
            height: 4rem;
            border: 8px solid transparent;
            border-top: 8px solid red;
            border-right: 8px solid blue;
            border-bottom: 8px solid green;
            border-left: 8px solid orange;
            border-radius: 50%;
            animation: spin 1.2s linear infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="mb-4">{editId ? "Edit Team Member" : "Add Team Member"}</h2>

      <div ref={formRef}>
        <form onSubmit={handleSubmit} className="mb-5">
          <input
            name="name"
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Name"
            value={form.name}
            required
          />
          <input
            name="role"
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Role"
            value={form.role}
            required
          />
          <textarea
            name="bio"
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Bio"
            value={form.bio}
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="form-control mb-2"
          />
          <button className="btn btn-primary" type="submit">
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setForm({ name: "", role: "", bio: "", image: null });
                setEditId(null);
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <h3>Team List</h3>
      <div className="row g-4">
        {team.map((member) => (
          <div className="col-md-4" key={member._id}>
            <div className="card p-3 text-center">
              <img
                src={`http://localhost:5000/uploads/${member.image}`}
                alt={member.name}
                className="rounded-circle mx-auto"
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
              <h5 className="mt-3">{member.name}</h5>
              <p>{member.role}</p>
              <small>{member.bio}</small>
              <div className="mt-2">
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(member)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(member._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
