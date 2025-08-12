"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Student {
  _id: string;
  username: string;
}

interface Course {
  _id: string;
  title: string;
}

export default function CertificateForm() {
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");
  //   const [students, setStudents] = useState([]);
  //   const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [certLink, setCertLink] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  // Fetch students and courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/certificates/students"),
          axios.get("http://localhost:5000/api/certificates/courses"),
        ]);
        setStudents(studentsRes.data.students);
        setCourses(coursesRes.data.courses);
      } catch (err) {
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const student = students.find((s: any) => s._id === studentId);
      const course = courses.find((c: any) => c._id === courseId);

      const res = await axios.post(
        "http://localhost:5000/api/certificates/generate",
        {
          studentName: student?.username,
          courseTitle: course?.title,
          description,
        }
      );

      if (res.data?.success) {
        toast.success("Certificate generated!");
        setCertLink(`http://localhost:5000${res.data.link}`);
      } else {
        toast.error("Generation failed");
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h4 className="card-title text-center fw-bold mb-3">
                Generate Certificate
              </h4>
              <form onSubmit={handleSubmit} className="vstack gap-3">
                <div>
                  <label className="form-label">Select Student</label>
                  <select
                    className="form-select"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  >
                    <option value="">-- Select Student --</option>
                    {students.map((student: any) => (
                      <option key={student._id} value={student._id}>
                        {student.username}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Select Course</label>
                  <select
                    className="form-select"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    required
                  >
                    <option value="">-- Select Course --</option>
                    {courses.map((course: any) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Certificate Description</label>
                  <textarea
                    className="form-control rounded-3"
                    placeholder="Enter message to show on certificate"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Certificate"}
                </button>
              </form>

              {certLink && (
                <div className="mt-4 text-center">
                  <a
                    href={certLink}
                    target="_blank"
                    className="btn btn-outline-success"
                  >
                    View Certificate PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
