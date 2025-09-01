"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Testimonial {
  _id: string;
  name: string;
  course: string;
  message: string;
  image?: string;
}

interface NewTestimonial {
  name: string;
  course: string;
  message: string;
  image: File | null;
}

function TestimonialPage() {
  // const [testimonials, setTestimonials] = useState([]);
  // const [selected, setSelected] = useState(null);
  const [pageLoading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  // const formRef = useRef(null);
  const [newTestimonial, setNewTestimonial] = useState<NewTestimonial>({
    name: "",
    course: "",
    message: "",
    image: null,
  });

  useEffect(() => {
    const token = Cookies.get("adminToken");

    setTimeout(() => {
      if (!token) {
        toast.error("Please login to access testimonials");
        router.push("/auth/adminLogin");
      } else {
        fetchTestimonials();
        setLoading(false);
      }
    }, 800);
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/testimonials"
      );
      setTestimonials(data);
    } catch (error) {
      toast.error("Failed to load testimonials");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/testimonials/${id}`);
      toast.success("Testimonial deleted successfully");
      fetchTestimonials();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setSelected(testimonial);
    setNewTestimonial({
      name: testimonial.name,
      course: testimonial.course,
      message: testimonial.message,
      image: null,
    });
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newTestimonial.name);
    formData.append("course", newTestimonial.course);
    formData.append("message", newTestimonial.message);
    if (newTestimonial.image) formData.append("image", newTestimonial.image);

    try {
      if (selected) {
        await axios.put(
          `http://localhost:5000/api/testimonials/${selected._id}`,
          formData
        );
        toast.success("Testimonial updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/testimonials", formData);
        toast.success("Testimonial submitted successfully");
      }

      setSelected(null);
      setNewTestimonial({ name: "", course: "", message: "", image: null });
      fetchTestimonials();
    } catch (error) {
      toast.error("Submission failed, try again");
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
    <section className="bg-light py-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-primary">
          What Our Students Say
        </h2>
        <p className="text-center text-muted mb-5">
          Real stories from our learners across Nepal — boosting careers in IT.
        </p>

        <div ref={formRef}>
          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={newTestimonial.name}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course"
                  value={newTestimonial.course}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      course: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="col-md-4">
                {/* <input
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      image: e.target.files[0],
                    })
                  }
                /> */}

                <input
                  type="file"
                  className="form-control"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      image: e.target.files?.[0] ?? null,
                    })
                  }
                />
              </div>
              <div className="col-12">
                <textarea
                  className="form-control"
                  placeholder="Message"
                  rows={4}
                  value={newTestimonial.message}
                  onChange={(e) =>
                    setNewTestimonial({
                      ...newTestimonial,
                      message: e.target.value,
                    })
                  }
                  required
                ></textarea>
              </div>
              <div className="col-12 text-end">
                <button type="submit" className="btn btn-success">
                  {selected ? "Update" : "Submit"} Testimonial
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="row g-4 mt-5">
          {testimonials.map((testimonial: Testimonial) => (
            <div className="col-12 col-md-6 col-lg-4" key={testimonial._id}>
              <div className="card h-100 border-0 shadow-lg">
                <div className="card-body d-flex flex-column justify-content-between">
                  <p className="text-secondary fst-italic mb-4">
                    “{testimonial.message}”
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="card-footer bg-white border-0 d-flex align-items-center">
                  <img
                    src={
                      testimonial.image
                        ? `http://localhost:5000${testimonial.image}`
                        : "https://via.placeholder.com/55"
                    }
                    alt={testimonial.name}
                    className="rounded-circle me-3"
                    width="55"
                    height="55"
                  />
                  <div>
                    <h6 className="mb-0">{testimonial.name}</h6>
                    <small className="text-muted">{testimonial.course}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialPage;
