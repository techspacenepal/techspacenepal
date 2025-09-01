"use client";

import { useState, useEffect, useRef, } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

interface Course {
  _id: string;
  title: string;
  category: string;
  duration: string;
  coursesdescription: string;
  description: string;
  courseoverview: string;
  syllabus: { title: string; content: string }[];
  faq: { title: string; content: string }[];
  image: string;
}

interface CourseForm {
  title: string;
  category: string;
  duration: string;
  coursesdescription: string;
  description: string;
  courseoverview: string;
  image: File | null;
}

export default function Courses() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [form, setForm] = useState<CourseForm>({
    title: "",
    category: "",
    duration: "",
    coursesdescription: "",
    description: "",
    courseoverview: "",
    image: null,
  });
  const [editId, setEditId] = useState<string | null>(null);

  const [syllabusInput, setSyllabusInput] = useState({ title: "", content: "" });
  const [faqInput, setFaqInput] = useState({ title: "", content: "" });
  const [syllabusList, setSyllabusList] = useState<{ title: string; content: string }[]>([]);
  const [faqList, setFaqList] = useState<{ title: string; content: string }[]>([]);
  const [syllabusEditIndex, setSyllabusEditIndex] = useState<number | null>(null);
  const [faqEditIndex, setFaqEditIndex] = useState<number | null>(null);


  const editorRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, html);
  };
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = form.courseoverview || "";
    }
  }, [form.courseoverview]);


  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = form.courseoverview || "";
    }
  }, [form.courseoverview]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/courses");
      setCourses(res.data);
    } catch {
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("adminToken");
    setTimeout(() => {
      if (!token) {
        toast.error("Please login to access this page");
        router.push("/auth/adminLogin");
      } else {
        fetchCourses();
      }
      setPageLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setFilteredCourses(
      selectedCategory === "All" ? courses : courses.filter((c) => c.category === selectedCategory)
    );
  }, [selectedCategory, courses]);

  const categories = ["All", ...new Set(courses.map((c) => c.category))];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: (e.target as HTMLInputElement).files?.[0] || null });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const updateCourseData = async (updatedSyllabus: any[], updatedFaq: any[]) => {
    if (!editId) return;
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("coursesdescription", form.coursesdescription);
      formData.append("duration", form.duration);
      formData.append("courseoverview", editorRef.current?.innerHTML || "");
      formData.append("syllabus", JSON.stringify(updatedSyllabus));
      formData.append("faq", JSON.stringify(updatedFaq));
      if (form.image) formData.append("image", form.image);

      await axios.put(`http://localhost:5000/api/courses/${editId}`, formData);
      toast.success("Updated after deletion");
      fetchCourses();
    } catch (error) {
      toast.error("Failed to update after deletion");
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("coursesdescription", form.coursesdescription);
    formData.append("duration", form.duration);
    formData.append("courseoverview", editorRef.current?.innerHTML || "");
    formData.append("syllabus", JSON.stringify(syllabusList));
    formData.append("faq", JSON.stringify(faqList));
    if (form.image) formData.append("image", form.image);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/courses/${editId}`, formData);
        toast.success("Course updated!");
      } else {
        await axios.post("http://localhost:5000/api/courses", formData);
        toast.success("Course added!");
      }
      setForm({
        title: "",
        category: "",
        duration: "",
        coursesdescription: "",
        description: "",
        courseoverview: "",
        image: null,
      });
      setEditId(null);
      setSyllabusList([]);
      setFaqList([]);
      setSyllabusInput({ title: "", content: "" });
      setFaqInput({ title: "", content: "" });

      fetchCourses();
    } catch {
      toast.error("Failed to submit course");
    }
  };

  const handleEdit = (course: Course) => {
    setForm({
      title: course.title,
      category: course.category,
      duration: course.duration,
      coursesdescription: course.coursesdescription,
      description: course.description,
      courseoverview: course.courseoverview || "",
      image: null,
    });
    setSyllabusList(course.syllabus || []);
    setFaqList(course.faq || []);
    setEditId(course._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`);
      toast.success("Course deleted!");
      fetchCourses();
    } catch {
      toast.error("Failed to delete course");
    }
  };



  if (pageLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
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
      <ToastContainer />

      <div className="container shadow rounded py-3 mb-5">
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSubmit} className="p-5">
              <h1 className="text-center text-success text-capitallize ">Courses Admin Panel</h1>
              {/* Title */}
              <div className="mb-2">
                <label className="form-label fw-bold">Title <span className="text-danger">*</span></label>
                <input name="title" type="text" placeholder="Enter course title" value={form.title} onChange={handleChange} className="form-control" required />
              </div>

              {/* Category */}
              <div className="mb-2">
                <label className="form-label fw-bold">Category <span className="text-danger">*</span></label>
                <input name="category" type="text" placeholder="Enter course category" value={form.category} onChange={handleChange} className="form-control" required />
              </div>

              {/* Duration */}
              <div className="mb-2">
                <label className="form-label fw-bold">Duration <span className="text-danger">*</span></label>
                <input name="duration" type="text" placeholder="e.g. 3 months" value={form.duration} onChange={handleChange} className="form-control" required />
              </div>

              {/* Courses Description */}
              <div className="mb-2">
                <label className="form-label fw-bold">Courses Description <span className="text-danger">*</span></label>
                <textarea name="coursesdescription" placeholder="Enter a brief course description" value={form.coursesdescription} onChange={handleChange} className="form-control" rows={3} required />
              </div>

              {/* Certificate Description */}
              <div className="mb-2">
                <label className="form-label fw-bold">Certificate Description <span className="text-danger">*</span></label>
                <textarea name="description" placeholder="Describe the certificate offered" value={form.description} onChange={handleChange} className="form-control fw-bold font-monospace" rows={3} required />
              </div>


              {/* Course Overview */}
              <div className="mb-2">
                <label className="form-label fw-bold">Course Overview</label>
                <div
                  ref={editorRef}
                  className="form-control"
                  contentEditable
                  onPaste={handlePaste}
                  style={{
                    minHeight: '250px',
                    overflowY: 'auto',
                  }}
                  suppressContentEditableWarning={true}
                ></div>
              </div>


              {/* Syllabus Form */}
              <div className="mb-3">
                <label className="form-label fw-bold">Add Syllabus <span className="text-danger">*</span></label>
                <input className="form-control mb-1" placeholder="Syllabus Title" value={syllabusInput.title} onChange={(e) => setSyllabusInput({ ...syllabusInput, title: e.target.value })} />
                <textarea className="form-control mb-1" placeholder="Syllabus Content" rows={2} value={syllabusInput.content} onChange={(e) => setSyllabusInput({ ...syllabusInput, content: e.target.value })} />
                <button type="button" className="btn btn-sm btn-success mb-2" onClick={() => {
                  if (syllabusInput.title && syllabusInput.content) {
                    if (syllabusEditIndex !== null) {
                      const updated = [...syllabusList];
                      updated[syllabusEditIndex] = syllabusInput;
                      setSyllabusList(updated);
                      setSyllabusEditIndex(null);
                    } else {
                      setSyllabusList([...syllabusList, syllabusInput]);
                    }
                    setSyllabusInput({ title: "", content: "" });
                  }
                }}>
                  {syllabusEditIndex !== null ? "Save Changes" : "Add Syllabus"}
                </button>
              </div>

              {/* FAQ Form */}
              <div className="mb-3">
                <label className="form-label fw-bold">Add FAQ <span className="text-danger">*</span></label>
                <input className="form-control mb-1" placeholder="FAQ Title" value={faqInput.title} onChange={(e) => setFaqInput({ ...faqInput, title: e.target.value })} />
                <textarea className="form-control mb-1" placeholder="FAQ Content" rows={2} value={faqInput.content} onChange={(e) => setFaqInput({ ...faqInput, content: e.target.value })} />
                <button type="button" className="btn btn-sm btn-success mb-2" onClick={() => {
                  if (faqInput.title && faqInput.content) {
                    if (faqEditIndex !== null) {
                      const updated = [...faqList];
                      updated[faqEditIndex] = faqInput;
                      setFaqList(updated);
                      setFaqEditIndex(null);
                    } else {
                      setFaqList([...faqList, faqInput]);
                    }
                    setFaqInput({ title: "", content: "" });
                  }
                }}>
                  {faqEditIndex !== null ? "Save Changes" : "Add FAQ"}
                </button>
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label fw-bold">Upload Image <span className="text-danger">*</span></label>
                <input name="image" type="file" onChange={handleChange} className="form-control" accept="image/*" />
                {form.image && (
                  <img src={URL.createObjectURL(form.image)} alt="Preview" className="img-fluid mt-2" style={{ maxWidth: "200px" }} />
                )}
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="d-flex flex-wrap gap-2 mt-3">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {editId ? "Update Course" : "Add Course"}
                </button>
                {editId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setEditId(null);
                      setForm({
                        title: "",
                        category: "",
                        duration: "",
                        description: "",
                        coursesdescription: "",
                        courseoverview: "",
                        image: null,
                      });
                      setSyllabusList([]);
                      setFaqList([]);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>


      {/* Category Filter */}
      <div className="mb-3 d-flex overflow-auto" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {categories.map((cat) => (
          <button key={cat} className={`btn btn-${selectedCategory === cat ? "primary" : "outline-primary"} me-2 mb-2`} onClick={() => setSelectedCategory(cat)} disabled={loading}>
            {cat}
          </button>
        ))}
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
              <div className="card">
                <img src={`http://localhost:5000${c.image}`} alt={c.title} className="card-img-top rounded-2 p-3" style={{ objectFit: "cover", height: "200px" }} />
                <div className="card-body">
                  <h5 className="card-title">{c.title}</h5>
                  <p className="card-text">{c.category} | {c.duration}</p>
                  <p className="text-muted">{c.coursesdescription?.substring(0, 100)}</p>
                  <p className="text-muted">{c.description?.substring(0, 100)}</p>
                  <div
                    className="text-muted"
                    style={{ maxHeight: "100px", overflowY: "auto" }}
                    dangerouslySetInnerHTML={{
                      __html: c.courseoverview || ""
                    }}
                  ></div>



                  <h6>Syllabus:</h6>
                  {(editId === c._id ? syllabusList : c.syllabus).map((item, index) => (
                    <div key={`syllabus-${index}`} className="border p-2 mb-1">
                      <strong>{item.title}</strong>
                      <p>{item.content}</p>
                      {editId === c._id && (
                        <>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => {
                              setSyllabusInput({ ...item });
                              setSyllabusEditIndex(index);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              const updated = [...syllabusList];
                              updated.splice(index, 1);
                              setSyllabusList(updated);
                              if (syllabusEditIndex === index) {
                                setSyllabusInput({ title: "", content: "" });
                                setSyllabusEditIndex(null);
                              }
                              updateCourseData(updated, faqList); // <-- update backend
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  ))}



                  <h6>FAQ:</h6>
                  {(editId === c._id ? faqList : c.faq).map((item, index) => (
                    <div key={`faq-${index}`} className="border p-2 mb-1">
                      <strong>{item.title}</strong>
                      <p>{item.content}</p>
                      {editId === c._id && (
                        <>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => {
                              setFaqInput({ ...item });
                              setFaqEditIndex(index);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              const updated = [...faqList];
                              updated.splice(index, 1);
                              setFaqList(updated);
                              if (faqEditIndex === index) {
                                setFaqInput({ title: "", content: "" });
                                setFaqEditIndex(null);
                              }
                              updateCourseData(syllabusList, updated); // <-- update backend
                            }}
                          >
                            Delete
                          </button>

                        </>
                      )}
                    </div>
                  ))}





                  <div className="mt-2">
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(c)} disabled={loading}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id)} disabled={loading}>Delete</button>
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







