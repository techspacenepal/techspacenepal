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




