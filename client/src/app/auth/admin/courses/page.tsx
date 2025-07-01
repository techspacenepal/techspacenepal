// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function Courses() {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [form, setForm] = useState({
//     title: '',
//     category: '',
//     duration: '',
//     image: null,
//   });
//   const [editId, setEditId] = useState(null);

//   // Fetch all courses
//   const fetchCourses = async () => {
//     const res = await axios.get('http://localhost:5000/api/courses');
//     setCourses(res.data);
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (selectedCategory === 'All') setFilteredCourses(courses);
//     else setFilteredCourses(courses.filter(c => c.category === selectedCategory));
//   }, [selectedCategory, courses]);

//   const categories = ['All', ...new Set(courses.map(c => c.category))];

//   const handleChange = e => {
//     if (e.target.name === 'image') {
//       setForm({ ...form, image: e.target.files[0] });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', form.title);
//     formData.append('category', form.category);
//     formData.append('duration', form.duration);
//     if (form.image) formData.append('image', form.image);

//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/api/courses/${editId}`, formData);
//         toast.success('Course updated!');
//       } else {
//         await axios.post('http://localhost:5000/api/courses', formData);
//         toast.success('Course added!');
//       }
//       setForm({ title: '', category: '', duration: '', image: null });
//       setEditId(null);
//       fetchCourses();
//     } catch (err) {
//       toast.error('Failed to submit course');
//     }
//   };

//   const handleEdit = course => {
//     setForm({
//       title: course.title,
//       category: course.category,
//       duration: course.duration,
//       image: null,
//     });
//     setEditId(course._id);
//     window.scrollTo({ top: 0, behavior: 'smooth' });

//   };

//   const handleDelete = async id => {
//     if (!confirm('Are you sure you want to delete this course?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/courses/${id}`);
//       toast.success('Course deleted!');
//       fetchCourses();
//     } catch (err) {
//       toast.error('Failed to delete course');
//     }
//   };

//   return (
//     <div className="container my-4">
//       <ToastContainer />

//       {/* Add/Edit Form */}
//       <form onSubmit={handleSubmit} className="mb-5">
//         <input name="title" type="text" placeholder="Title" value={form.title} onChange={handleChange} className="form-control mb-2" required />
//         <input name="category" type="text" placeholder="Category" value={form.category} onChange={handleChange} className="form-control mb-2" required />
//         <input name="duration" type="text" placeholder="Duration" value={form.duration} onChange={handleChange} className="form-control mb-2" required />
//         <input name="image" type="file" onChange={handleChange} className="form-control mb-2" accept="image/*" />
//         {form.image && <img src={URL.createObjectURL(form.image)} alt="Preview" style={{ maxWidth: '200px', marginBottom: '10px' }} />}
//         <button type="submit" className="btn btn-primary">
//           {editId ? 'Update Course' : 'Add Course'}
//         </button>
//         {editId && (
//           <button type="button" className="btn btn-secondary ms-2" onClick={() => { setEditId(null); setForm({ title: '', category: '', duration: '', image: null }); }}>
//             Cancel
//           </button>
//         )}
//       </form>

//       {/* Category Filter */}
//       <div className="mb-3">
//         <div className="d-flex overflow-auto" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
//           <style>{`div::-webkit-scrollbar { display: none; }`}</style>
//           {categories.map(cat => (
//             <button key={cat} className={`btn btn-${selectedCategory === cat ? 'primary' : 'outline-primary'} me-2 mb-2`} onClick={() => setSelectedCategory(cat)}>
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Course Grid */}
//       <div className="row">
//         {filteredCourses.map(c => (
//           <div className="col-md-4 col-sm-6 mb-4" key={c._id}>
//             <div className="card h-100">
//               <img src={`http://localhost:5000${c.image}`} alt={c.title} className="card-img-top rounded-2 p-3" style={{ objectFit: 'cover', height: '200px' }} />
//               <div className="card-body">
//                 <h5 className="card-title">{c.title}</h5>
//                 <p className="card-text">{c.category} | {c.duration}</p>
//                 <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(c)}>Edit</button>
//                 <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id)}>Delete</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function Courses() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    duration: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false); // spinner during fetch
  const [pageLoading, setPageLoading] = useState(true); // full-page loading on mount

  // ✅ Fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch (err) {
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Token check + page loading
  useEffect(() => {
    const token = Cookies.get("adminToken");

    setTimeout(() => {
      if (!token) {
        toast.error("Please login to access this page");
        router.push("/auth/adminLogin");
      } else {
        fetchCourses(); // 🔁 FIXED THIS
      }
      setPageLoading(false);
    }, 1000);
  }, []);

  // ✅ Filter when selectedCategory or courses change
  useEffect(() => {
    if (selectedCategory === "All") setFilteredCourses(courses);
    else
      setFilteredCourses(
        courses.filter((c) => c.category === selectedCategory)
      );
  }, [selectedCategory, courses]);

  const categories = ["All", ...new Set(courses.map((c) => c.category))];

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("duration", form.duration);
    if (form.image) formData.append("image", form.image);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/courses/${editId}`,
          formData
        );
        toast.success("Course updated!");
      } else {
        await axios.post("http://localhost:5000/api/courses", formData);
        toast.success("Course added!");
      }
      setForm({ title: "", category: "", duration: "", image: null });
      setEditId(null);
      fetchCourses();
    } catch (err) {
      toast.error("Failed to submit course");
    }
  };

  const handleEdit = (course) => {
    setForm({
      title: course.title,
      category: course.category,
      duration: course.duration,
      image: null,
    });
    setEditId(course._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      toast.success("Course deleted!");
      fetchCourses();
    } catch (err) {
      toast.error("Failed to delete course");
    }
  };

  // 🌀 Full-page loader
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
    <div className="container my-4">
      <ToastContainer />

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="mb-5">
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          name="category"
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          name="duration"
          type="text"
          placeholder="Duration"
          value={form.duration}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          name="image"
          type="file"
          onChange={handleChange}
          className="form-control mb-2"
          accept="image/*"
        />
        {form.image && (
          <img
            src={URL.createObjectURL(form.image)}
            alt="Preview"
            style={{ maxWidth: "200px", marginBottom: "10px" }}
          />
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {editId ? "Update Course" : "Add Course"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditId(null);
              setForm({ title: "", category: "", duration: "", image: null });
            }}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Category Filter */}
      <div className="mb-3">
        <div
          className="d-flex overflow-auto"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-${
                selectedCategory === cat ? "primary" : "outline-primary"
              } me-2 mb-2`}
              onClick={() => setSelectedCategory(cat)}
              disabled={loading}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredCourses.length === 0 ? (
        <p className="text-muted">No courses found.</p>
      ) : (
        <div className="row">
          {filteredCourses.map((c) => (
            <div className="col-md-4 col-sm-6 mb-4" key={c._id}>
              <div className="card h-100">
                <img
                  src={`http://localhost:5000${c.image}`}
                  alt={c.title}
                  className="card-img-top rounded-2 p-3"
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{c.title}</h5>
                  <p className="card-text">
                    {c.category} | {c.duration}
                  </p>
                  <small className="text-muted">ID: {c._id}</small>
                  <div className="mt-2">
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(c)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(c._id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
