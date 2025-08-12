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




// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function UpcomingClassesAdmin() {
//   const [pageLoading, setPageLoading] = useState(true);
//   const [classes, setClasses] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     date: "",
//     time: "",
//     duration: "",
//   });
//   const [image, setImage] = useState(null);
//   const [editId, setEditId] = useState(null);

//   const formRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = Cookies.get("adminToken");

//     setTimeout(() => {
//       if (!token) {
//         router.push("/auth/adminLogin");
//       } else {
//         fetchClasses();
//         setPageLoading(false);
//       }
//     }, 800);
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
//     Object.entries(form).forEach(([key, value]) =>
//       formData.append(key, value)
//     );
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

//   // 🌀 Loading spinner while checking token
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
//                 <p className="mb-1 fw-semibold text-muted">
//                   UPCOMING CLASSES
//                 </p>
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


// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function UpcomingClassesAdmin() {
//   const [pageLoading, setPageLoading] = useState(true);
//   const [classes, setClasses] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     date: "",
//     startTime: "",
//     endTime: "",
//     duration: "",
//   });
//   const [image, setImage] = useState(null);
//   const [editId, setEditId] = useState(null);

//   const formRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = Cookies.get("adminToken");

//     setTimeout(() => {
//       if (!token) {
//         router.push("/auth/adminLogin");
//       } else {
//         fetchClasses();
//         setPageLoading(false);
//       }
//     }, 800);
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

//   const formatTime = (time) => {
//     if (!time) return "";
//     const [hourStr, minute] = time.split(":");
//     let hour = parseInt(hourStr);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     hour = hour % 12 || 12;
//     return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     const timeRange = `${formatTime(form.startTime)} - ${formatTime(form.endTime)}`;

//     formData.append("title", form.title);
//     formData.append("date", form.date);
//     formData.append("time", timeRange);
//     formData.append("duration", form.duration);
//     if (image) formData.append("image", image);

//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/classes/${editId}`, formData);
//         toast.success("Class updated successfully");
//         setEditId(null);
//       } else {
//         await axios.post("http://localhost:5000/api/classes", formData);
//         toast.success("Class added successfully");
//       }

//       setForm({
//         title: "",
//         date: "",
//         startTime: "",
//         endTime: "",
//         duration: "",
//       });
//       setImage(null);
//       fetchClasses();
//     } catch (err) {
//       toast.error("Failed to save class");
//     }
//   };

//   const handleEdit = (cls) => {
//     const [startTime, endTime] = cls.time.split(" - ").map((t) => {
//       const [time, ampm] = t.split(" ");
//       let [hour, minute] = time.split(":");
//       hour = parseInt(hour);
//       if (ampm === "PM" && hour !== 12) hour += 12;
//       if (ampm === "AM" && hour === 12) hour = 0;
//       return `${hour.toString().padStart(2, "0")}:${minute}`;
//     });

//     setForm({
//       title: cls.title,
//       date: cls.date,
//       startTime: startTime || "",
//       endTime: endTime || "",
//       duration: cls.duration,
//     });
//     setEditId(cls._id);
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
//             <div className="col-md-3 d-flex align-items-center gap-2">
//               <input
//                 type="time"
//                 name="startTime"
//                 value={form.startTime}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//               <span className="fw-semibold">to</span>
//               <input
//                 type="time"
//                 name="endTime"
//                 value={form.endTime}
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
//                 <p className="mb-1 fw-semibold text-muted">
//                   UPCOMING CLASSES
//                 </p>
//                 <div className="d-flex justify-content-between">
//                   <span>
//                     <i className="bi bi-calendar3"></i>{" "}
//                     {new Date(data.date).toLocaleDateString()}
//                   </span>
//                   <span>
//                     <i className="bi bi-clock"></i> {data.time}
//                   </span>
//                   <span>Class</span>
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










// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function UpcomingClassesAdmin() {
//   const [pageLoading, setPageLoading] = useState(true);
//   const [classes, setClasses] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     date: "",
//     startTime: "",
//     endTime: "",
//     duration: "",
//     image: null,
//   });
//   const [secondForm, setSecondForm] = useState({
//     secondDate: "",
//     secondStartTime: "",
//     secondEndTime: "",
//   });
//   const [editId, setEditId] = useState(null);
//   const [showEditForm, setShowEditForm] = useState(null);

//   const formRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = Cookies.get("adminToken");
//     setTimeout(() => {
//       if (!token) {
//         router.push("/auth/adminLogin");
//       } else {
//         fetchClasses();
//         setPageLoading(false);
//       }
//     }, 800);
//   }, []);

//   const fetchClasses = () => {
//     axios
//       .get("http://localhost:5000/api/classes")
//       .then((res) => setClasses(res.data))
//       .catch(() => toast.error("Failed to fetch classes!"));
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSecondChange = (e) => {
//     setSecondForm({ ...secondForm, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setForm({ ...form, image: e.target.files[0] });
//   };

//   const formatTime = (time) => {
//     if (!time) return "";
//     const [hourStr, minute] = time.split(":");
//     let hour = parseInt(hourStr);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     hour = hour % 12 || 12;
//     return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
//   };

//   const handleEditClick = (cls) => {
//     const [startTime, endTime] = cls.time?.split(" - ").map(to24Hour) || ["", ""];
//     setForm({
//       title: cls.title,
//       date: cls.date,
//       startTime,
//       endTime,
//       duration: cls.duration,
//       image: null,
//     });
//     setSecondForm({
//       secondDate: "",
//       secondStartTime: "",
//       secondEndTime: "",
//     });
//     setEditId(cls._id);
//     setShowEditForm(cls._id);
//     setTimeout(() => {
//       formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }, 100);
//   };

//   const to24Hour = (t) => {
//     if (!t) return "";
//     const [time, ampm] = t.split(" ");
//     let [hour, minute] = time.split(":");
//     hour = parseInt(hour);
//     if (ampm === "PM" && hour !== 12) hour += 12;
//     if (ampm === "AM" && hour === 12) hour = 0;
//     return `${hour.toString().padStart(2, "0")}:${minute}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     const timeRange = `${formatTime(form.startTime)} - ${formatTime(form.endTime)}`;
//     formData.append("title", form.title);
//     formData.append("date", form.date);
//     formData.append("time", timeRange);
//     formData.append("duration", form.duration);
//     if (form.image) formData.append("image", form.image);

//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/classes/${editId}`, formData);
//         toast.success("Class updated");
//       } else {
//         await axios.post("http://localhost:5000/api/classes", formData);
//         toast.success("Class created");
//       }
//       fetchClasses();
//       setShowEditForm(null);
//       setEditId(null);
//       setForm({ title: "", date: "", startTime: "", endTime: "", duration: "", image: null });
//     } catch {
//       toast.error("Failed to save class");
//     }
//   };

//   const handleSecondSubmit = async (e) => {
//     e.preventDefault();
//     const secondTimeRange = `${formatTime(secondForm.secondStartTime)} - ${formatTime(secondForm.secondEndTime)}`;
//     try {
//       await axios.patch(`http://localhost:5000/api/classes/${editId}/second-time`, {
//         secondDate: secondForm.secondDate,
//         secondTime: secondTimeRange,
//       });
//       toast.success("Second time/date added");
//       fetchClasses();
//       setShowEditForm(null);
//     } catch {
//       toast.error("Failed to add second time/date");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/classes/${id}`);
//         toast.success("Class deleted");
//         fetchClasses();
//       } catch {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   if (pageLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container py-4">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h4 className="mb-3">Upcoming Classes ({classes.length})</h4>

//       {/* Create New Class Form */}
//       <form onSubmit={handleSubmit} encType="multipart/form-data" className="mb-5">
//         <div className="row g-2">
//           <div className="col-md-3">
//             <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="form-control" required />
//           </div>
//           <div className="col-md-2">
//             <input type="date" name="date" value={form.date} onChange={handleChange} className="form-control" required />
//           </div>
//           <div className="col-md-3 d-flex align-items-center gap-2">
//             <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className="form-control" required />
//             <span className="fw-semibold">to</span>
//             <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="form-control" required />
//           </div>
//           <div className="col-md-2">
//             <input type="text" name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} className="form-control" required />
//           </div>
//           <div className="col-md-2">
//             <input type="file" onChange={handleFileChange} className="form-control" />
//           </div>
//           <div className="col-md-1">
//             <button type="submit" className="btn btn-primary w-100">{editId ? "Update" : "Add"}</button>
//           </div>
//         </div>
//       </form>

//       <div className="row">
//         {classes.map((data) => {
//           const timeCount = data.secondDate && data.secondTime ? 2 : 1;
//           return (
//             <React.Fragment key={data._id}>
//               <div className="col-12 col-sm-6 col-md-4 mb-4">
//                 <div className="card shadow-sm rounded overflow-hidden border border-light-subtle">
//                   <img
//                     src={`http://localhost:5000${data.imageUrl || "/uploads/default.jpg"}`}
//                     alt={data.title}
//                     className="w-100"
//                     style={{ height: "180px", objectFit: "cover" }}
//                   />
//                   <div className="p-3">
//                     <h5 className="mb-1">{data.title}</h5>
//                     <p className="mb-1 fw-semibold text-muted">UPCOMING CLASSES</p>
//                     <div className="d-flex justify-content-between">
//                       <span>{new Date(data.date).toLocaleDateString()}</span>
//                       <span>{data.time}</span>
//                       <span>{timeCount}</span>
//                     </div>
//                     {data.secondDate && data.secondTime && (
//                       <div className="d-flex justify-content-between mt-1">
//                         <span>{new Date(data.secondDate).toLocaleDateString()}</span>
//                         <span>{data.secondTime}</span>
//                       </div>
//                     )}
//                     <div className="mt-2 d-flex justify-content-between">
//                       <button
//                         className="btn btn-sm btn-warning"
//                         onClick={() => handleEditClick(data)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => handleDelete(data._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                     {showEditForm === data._id && (
//                       <div className="mt-3">
                       

//                         <form onSubmit={handleSecondSubmit}>
//                           <input
//                             type="date"
//                             name="secondDate"
//                             value={secondForm.secondDate}
//                             onChange={handleSecondChange}
//                             className="form-control mb-2"
//                             required
//                           />
//                           <div className="d-flex gap-2 mb-2">
//                             <input
//                               type="time"
//                               name="secondStartTime"
//                               value={secondForm.secondStartTime}
//                               onChange={handleSecondChange}
//                               className="form-control"
//                               required
//                             />
//                             <input
//                               type="time"
//                               name="secondEndTime"
//                               value={secondForm.secondEndTime}
//                               onChange={handleSecondChange}
//                               className="form-control"
//                               required
//                             />
//                           </div>
//                           <button type="submit" className="btn btn-secondary w-100">
//                             Add Time & Date
//                           </button>
//                         </form>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </React.Fragment>
//           );
//         })}
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
    startTime: "",
    endTime: "",
    duration: "",
    image: null,
  });

  const [secondForm, setSecondForm] = useState({
    secondDate: "",
    secondStartTime: "",
    secondEndTime: "",
  });

  const [editId, setEditId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(null);

  const [editingSchedule, setEditingSchedule] = useState(null);
  const [editScheduleData, setEditScheduleData] = useState({
    secondDate: "",
    secondStartTime: "",
    secondEndTime: "",
  });

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
      .catch(() => toast.error("Failed to fetch classes!"));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSecondChange = (e) => {
    setSecondForm({ ...secondForm, [e.target.name]: e.target.value });
  };

  const handleEditScheduleChange = (e) => {
    setEditScheduleData({ ...editScheduleData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
  };

  const to24Hour = (t) => {
    if (!t) return "";
    const [time, ampm] = t.split(" ");
    let [hour, minute] = time.split(":");
    hour = parseInt(hour);
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  };

  // === UPDATED handleEditClick to toggle the edit & add time form only on clicked card ===
  const handleEditClick = (cls) => {
    if (showEditForm === cls._id) {
      // If clicking the same card's edit button, close the form
      setShowEditForm(null);
      setEditId(null);
    } else {
      // Open the edit & add time form for the clicked card
      const [startTime, endTime] = cls.time?.split(" - ").map(to24Hour) || ["", ""];
      setForm({
        title: cls.title,
        date: cls.date,
        startTime,
        endTime,
        duration: cls.duration,
        image: null,
      });
      setSecondForm({ secondDate: "", secondStartTime: "", secondEndTime: "" });
      setEditId(cls._id);
      setShowEditForm(cls._id);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const timeRange = `${formatTime(form.startTime)} - ${formatTime(form.endTime)}`;
    formData.append("title", form.title);
    formData.append("date", form.date);
    formData.append("time", timeRange);
    formData.append("duration", form.duration);
    if (form.image) formData.append("image", form.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/classes/${editId}`, formData);
        toast.success("Class updated");
      } else {
        await axios.post("http://localhost:5000/api/classes", formData);
        toast.success("Class created");
      }
      fetchClasses();
      setShowEditForm(null);
      setEditId(null);
      setForm({ title: "", date: "", startTime: "", endTime: "", duration: "", image: null });
    } catch {
      toast.error("Failed to save class");
    }
  };

  const handleSecondSubmit = async (e) => {
    e.preventDefault();
    const secondTimeRange = `${formatTime(secondForm.secondStartTime)} - ${formatTime(secondForm.secondEndTime)}`;
    try {
      await axios.patch(`http://localhost:5000/api/classes/${editId}/second-time`, {
        secondDate: secondForm.secondDate,
        secondTime: secondTimeRange,
      });
      toast.success("Second time/date added");
      fetchClasses();
      setSecondForm({ secondDate: "", secondStartTime: "", secondEndTime: "" });
    } catch {
      toast.error("Failed to add second time/date");
    }
  };

  const handleUpdateSchedule = async (clsId, scheduleIndex) => {
    const secondTimeRange = `${formatTime(editScheduleData.secondStartTime)} - ${formatTime(editScheduleData.secondEndTime)}`;
    try {
      await axios.patch(`http://localhost:5000/api/classes/${clsId}/second-time/${scheduleIndex}`, {
        secondDate: editScheduleData.secondDate,
        secondTime: secondTimeRange,
      });
      toast.success("Schedule updated");
      setEditingSchedule(null);
      fetchClasses();
    } catch {
      toast.error("Failed to update schedule");
    }
  };

  const handleDeleteSchedule = async (clsId, scheduleIndex) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/classes/${clsId}/second-time/${scheduleIndex}`);
      toast.success("Schedule deleted");
      fetchClasses();
    } catch {
      toast.error("Failed to delete schedule");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await axios.delete(`http://localhost:5000/api/classes/${id}`);
        toast.success("Class deleted");
        fetchClasses();
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  if (pageLoading) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h4 className="mb-3">Upcoming Classes ({classes.length})</h4>

      {/* Main class form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="mb-5" ref={formRef}>
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
            <input type="date" name="date" value={form.date} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-3 d-flex align-items-center gap-2">
            <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className="form-control" required />
            <span className="fw-semibold">to</span>
            <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-2">
            <input type="text" name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-2">
            <input type="file" onChange={handleFileChange} className="form-control" />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* Classes list */}
      <div className="row">
        {classes.map((data) => (
          <div key={data._id} className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card shadow-sm rounded overflow-hidden border border-light-subtle">
              <img
                src={`http://localhost:5000${data.imageUrl || "/uploads/default.jpg"}`}
                alt={data.title}
                className="w-100"
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="p-3">
                <h5 className="mb-1">{data.title}</h5>
                <p className="mb-1 fw-semibold text-muted">UPCOMING CLASSES</p>
                <div className="d-flex justify-content-between">
                  <span>{new Date(data.date).toLocaleDateString()}</span>
                  <span>{data.time}</span>
                  <span>{(data.secondSchedules?.length ?? 0) + 1}classes</span>
                </div>

                {/* Render all secondSchedules with edit/delete */}
                {data.secondSchedules?.map((schedule, index) => (
                  <div key={index} className="mt-2">
                    {editingSchedule === index ? (
                      <div>
                        <input
                          type="date"
                          name="secondDate"
                          value={editScheduleData.secondDate}
                          onChange={handleEditScheduleChange}
                          className="form-control mb-1"
                        />
                        <div className="d-flex gap-2 mb-1">
                          <input
                            type="time"
                            name="secondStartTime"
                            value={editScheduleData.secondStartTime}
                            onChange={handleEditScheduleChange}
                            className="form-control"
                          />
                          <input
                            type="time"
                            name="secondEndTime"
                            value={editScheduleData.secondEndTime}
                            onChange={handleEditScheduleChange}
                            className="form-control"
                          />
                        </div>
                        <button
                          className="btn btn-sm btn-success w-100 mb-1"
                          onClick={() => handleUpdateSchedule(data._id, index)}
                          type="button"
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-secondary w-100"
                          onClick={() => setEditingSchedule(null)}
                          type="button"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span>{new Date(schedule.secondDate).toLocaleDateString()}</span>
                          <span className="ms-2">{schedule.secondTime}</span>
                        </div>
                        <div>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => {
                              setEditingSchedule(index);
                              setEditScheduleData({
                                secondDate: schedule.secondDate,
                                secondStartTime: to24Hour(schedule.secondTime.split(" - ")[0]),
                                secondEndTime: to24Hour(schedule.secondTime.split(" - ")[1]),
                              });
                            }}
                            type="button"
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteSchedule(data._id, index)}
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Buttons to edit/delete main class */}
                <div className="mt-2 d-flex justify-content-between">
                  <button className="btn btn-sm btn-warning" onClick={() => handleEditClick(data)} type="button">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(data._id)} type="button">
                    Delete
                  </button>
                </div>

                {/* Form to add new second time/date schedule (only shows for edited card) */}
                {showEditForm === data._id && (
                  <div className="mt-3">
                    <form onSubmit={handleSecondSubmit}>
                      <input
                        type="date"
                        name="secondDate"
                        value={secondForm.secondDate}
                        onChange={handleSecondChange}
                        className="form-control mb-2"
                        required
                      />
                      <div className="d-flex gap-2 mb-2">
                        <input
                          type="time"
                          name="secondStartTime"
                          value={secondForm.secondStartTime}
                          onChange={handleSecondChange}
                          className="form-control"
                          required
                        />
                        <input
                          type="time"
                          name="secondEndTime"
                          value={secondForm.secondEndTime}
                          onChange={handleSecondChange}
                          className="form-control"
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-secondary w-100">
                        Add Time & Date
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}