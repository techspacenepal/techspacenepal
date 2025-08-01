"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Course {
  _id: string;
  title: string;
  coursesdescription: string;
}

export default function AddTeacherCourseForm() {
  const router = useRouter();

  const [teacherId, setTeacherId] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<
    { _id: string; fullName?: string; username: string }[]
  >([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    courseId: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🧠 Fetch all courses and teachers from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch courses", err);
      }
    };

    const fetchTeachers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/teacherCourses/list"
        );
        setTeachers(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch teachers", err);
      }
    };

    fetchCourses();
    fetchTeachers();
  }, []);

  // 📌 Handle course selection
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCourseId = e.target.value;
    const selectedCourse = courses.find((c) => c._id === selectedCourseId);

    setFormData((prev) => ({
      ...prev,
      courseId: selectedCourseId,
      description: selectedCourse?.coursesdescription || "",
    }));
  };

  // 📌 Handle textarea input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = {
        teacherId: teacherId.trim(),
        courseId: formData.courseId,
        description: formData.description,
      };

      const res = await axios.post(
        "http://localhost:5000/api/teacherCourses",
        data,
        { withCredentials: true }
      );

      if (
        (res.status === 200 || res.status === 201) &&
        res.data.message === "Course created successfully"
      ) {
        setMessage("✅ Course added successfully!");
        setFormData({ name: "", description: "", courseId: "" });
        setTeacherId("");
      } else {
        setMessage(
          `❌ Unexpected server response: ${res.data.message || res.status}`
        );
      }
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || "❌ Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h4 className="mb-3 text-center">Enrolled Teacher Course</h4>

        {message && (
          <div
            className={`alert ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Teacher Dropdown */}
          <div className="mb-3">
            <label className="form-label">Select Teacher</label>
            <select
              className="form-select"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              required
            >
              <option value="">-- Select a Teacher --</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.fullName || teacher.username}
                </option>
              ))}
            </select>
          </div>

          {/* Course Dropdown */}
          <div className="mb-3">
            <label className="form-label">Select Course</label>
            <select
              className="form-select"
              name="courseId"
              value={formData.courseId}
              onChange={handleCourseChange}
              required
            >
              <option value="">-- Select a Course --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Auto-filled + editable Description */}
          <div className="mb-3">
            <label className="form-label">Course Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
              placeholder="Enter course description"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Teacher Course"}
          </button>
        </form>
      </div>
    </div>
  );
}
