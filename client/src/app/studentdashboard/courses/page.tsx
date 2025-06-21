'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CourseCard } from '@/app/Component/course-card';
import { PageHeader } from '@/app/Component/page-header';

interface Course {
  _id: string;
  name: string;
  instructor: string;
  description: string;
  thumbnail?: string;
  progress?: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string>("");

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const token = Cookies.get("adminToken");

        // ✅ Step 1: Fetch student profile (to get ID)
        const { data: studentData } = await axios.get(
          "http://localhost:5000/api/students/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const id = studentData._id;
        setStudentId(id);

        // ✅ Step 2: Fetch enrolled courses for that student
        const { data: courseData } = await axios.get(
          `http://localhost:5000/api/enrolledCourses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(courseData);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentCourses();
  }, []);

  return (
    <div className="container py-4">
      <PageHeader
        title="My Courses"
        description="Access all your enrolled courses and track your learning progress."
      />

      {loading ? (
        <p>Loading...</p>
      ) : courses.length > 0 ? (
        <div className="row g-4">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted">
          <p>You are not enrolled in any courses yet.</p>
        </div>
      )}
    </div>
  );
}






// "use client";
// import React, { useState } from "react";
// import axios from "axios";

// export default function AddCoursePage() {
//   const [formData, setFormData] = useState({ name: "", instructor: "", description: "" });
//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

//   const handleChange = (e: any) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) setThumbnailFile(file);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("instructor", formData.instructor);
//     data.append("description", formData.description);
//     if (thumbnailFile) data.append("thumbnail", thumbnailFile);

//     const res = await axios.post("http://localhost:5000/api/enrolledCourses", data);
//     alert("Course added");
//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4">
//       <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" /><br />
//       <input name="instructor" value={formData.instructor} onChange={handleChange} placeholder="Instructor" /><br />
//       <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" /><br />
//       <input type="file" accept="image/*" onChange={handleFileChange} /><br />
//       <button type="submit">Add Course</button>
//     </form>
//   );
// }
