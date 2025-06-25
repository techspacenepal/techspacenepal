// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function UpcomingClassesAdmin() {
//   const [classes, setClasses] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     date: "",
//     time: "",
//     duration: "",
//   });
//   const [image, setImage] = useState(null);
//   const [editId, setEditId] = useState(null);

//   const formRef = useRef(null); // ref create gareko

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const fetchClasses = () => {
//     axios
//       .get("http://localhost:5000/api/classes")
//       .then((res) => setClasses(res.data))
//       .catch((err) => toast.error("Failed to fetch classes!"));
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => formData.append(key, value));
//     if (image) formData.append("image", image);

//     try {
//       if (editId) {
//         await axios.put(
//           `http://localhost:5000/api/classes/${editId}`,
//           formData
//         );
//         toast.success("Class updated successfully");
//         setEditId(null);
//       } else {
//         await axios.post("http://localhost:5000/api/classes", formData);
//         toast.success("Class added successfully");
//       }
//       setForm({ title: "", date: "", time: "", duration: "" });
//       setImage(null);
//       fetchClasses();
//     } catch (err) {
//       toast.error("Failed to save class");
//     }
//   };

//   const handleEdit = (cls) => {
//     setForm({
//       title: cls.title,
//       date: cls.date,
//       time: cls.time,
//       duration: cls.duration,
//     });
//     setEditId(cls._id);
//     // Scroll form into view after state update
//     setTimeout(() => {
//       if (formRef.current) {
//         formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//       }
//     }, 100);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/classes/${id}`);
//         toast.success("Class deleted successfully");
//         fetchClasses();
//       } catch (err) {
//         toast.error("Failed to delete class");
//       }
//     }
//   };

//   return (
//     <div className="container py-4">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h4 className="mb-3">Upcoming Classes ({classes.length})</h4>
//       <div ref={formRef}>
//         <form
//           onSubmit={handleSubmit}
//           encType="multipart/form-data"
//           className="mb-5"
//         >
//           <div className="row g-2">
//             <div className="col-md-3">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Title"
//                 value={form.title}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//             </div>
//             <div className="col-md-2">
//               <input
//                 type="date"
//                 name="date"
//                 value={form.date}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//             </div>
//             <div className="col-md-2">
//               <input
//                 type="time"
//                 name="time"
//                 value={form.time}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//             </div>
//             <div className="col-md-2">
//               <input
//                 type="text"
//                 name="duration"
//                 placeholder="Duration"
//                 value={form.duration}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//             </div>
//             <div className="col-md-2">
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="form-control"
//               />
//             </div>
//             <div className="col-md-1">
//               <button type="submit" className="btn btn-primary w-100">
//                 {editId ? "Update" : "Add"}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>

//       <div className="row">
//         {classes.map((data) => (
//           <div className="col-12 col-sm-6 col-md-4 mb-4" key={data._id}>
//             <div className="card shadow-sm rounded overflow-hidden border border-light-subtle">
//               <div className="position-relative">
//                 <img
//                   src={`http://localhost:5000${
//                     data?.imageUrl || "/uploads/default.jpg"
//                   }`}
//                   alt={data?.title || "Class"}
//                   className="w-100"
//                   style={{ height: "180px", objectFit: "cover" }}
//                 />
//                 {data?.duration && (
//                   <span className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 small rounded-bottom-start">
//                     {data.duration}
//                   </span>
//                 )}
//               </div>
//               <div className="p-3">
//                 <h5 className="mb-1">{data.title}</h5>
//                 <p className="mb-1 fw-semibold text-muted">UPCOMING CLASSES</p>
//                 <div className="d-flex justify-content-between">
//                   <span>
//                     <i className="bi bi-calendar3"></i>{" "}
//                     {new Date(data.date).toLocaleDateString()}
//                   </span>
//                   <span>
//                     <i className="bi bi-clock"></i> {data.time}
//                   </span>
//                 </div>
//                 <div className="mt-2 d-flex justify-content-between">
//                   <button
//                     className="btn btn-sm btn-warning"
//                     onClick={() => handleEdit(data)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => handleDelete(data._id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpcomingClassesAdmin() {
  const [pageLoading, setPageLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
  });
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const formRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("adminToken");

    setTimeout(() => {
      if (!token) {
        router.push("/auth/adminLogin");
      } else {
        fetchClasses();
        setPageLoading(false);
      }
    }, 800);
  }, []);

  const fetchClasses = () => {
    axios
      .get("http://localhost:5000/api/classes")
      .then((res) => setClasses(res.data))
      .catch((err) => toast.error("Failed to fetch classes!"));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/classes/${editId}`,
          formData
        );
        toast.success("Class updated successfully");
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/classes", formData);
        toast.success("Class added successfully");
      }

      setForm({ title: "", date: "", time: "", duration: "" });
      setImage(null);
      fetchClasses();
    } catch (err) {
      toast.error("Failed to save class");
    }
  };

  const handleEdit = (cls) => {
    setForm({
      title: cls.title,
      date: cls.date,
      time: cls.time,
      duration: cls.duration,
    });
    setEditId(cls._id);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`http://localhost:5000/api/classes/${id}`);
        toast.success("Class deleted successfully");
        fetchClasses();
      } catch (err) {
        toast.error("Failed to delete class");
      }
    }
  };

  // 🌀 Loading spinner while checking token
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
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h4 className="mb-3">Upcoming Classes ({classes.length})</h4>

      <div ref={formRef}>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="mb-5"
        >
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={form.duration}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="file"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>
            <div className="col-md-1">
              <button type="submit" className="btn btn-primary w-100">
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="row">
        {classes.map((data) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={data._id}>
            <div className="card shadow-sm rounded overflow-hidden border border-light-subtle">
              <div className="position-relative">
                <img
                  src={`http://localhost:5000${
                    data?.imageUrl || "/uploads/default.jpg"
                  }`}
                  alt={data?.title || "Class"}
                  className="w-100"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                {data?.duration && (
                  <span className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 small rounded-bottom-start">
                    {data.duration}
                  </span>
                )}
              </div>
              <div className="p-3">
                <h5 className="mb-1">{data.title}</h5>
                <p className="mb-1 fw-semibold text-muted">
                  UPCOMING CLASSES
                </p>
                <div className="d-flex justify-content-between">
                  <span>
                    <i className="bi bi-calendar3"></i>{" "}
                    {new Date(data.date).toLocaleDateString()}
                  </span>
                  <span>
                    <i className="bi bi-clock"></i> {data.time}
                  </span>
                </div>
                <div className="mt-2 d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(data)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(data._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
