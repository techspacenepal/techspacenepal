
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddTeacherCourseForm() {
  const router = useRouter();

  const [teacherId, setTeacherId] = useState('');
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    courseId: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 🧠 Fetch all courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch courses', err);
      }
    };
    fetchCourses();
  }, []);

  // 📌 Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit course
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = {
        teacherId: teacherId.trim(),
        name: formData.name,
        description: formData.description,
        courseId: formData.courseId,
      };

      const res = await axios.post('http://localhost:5000/api/teacherCourses', data, {
        withCredentials: true,
      });

      if (
        (res.status === 200 || res.status === 201) &&
        res.data.message === 'Course created successfully'
      ) {
        setMessage('✅ Course added successfully!');
        setFormData({ name: '', description: '', courseId: '' });
        setTeacherId('');
      } else {
        setMessage(`❌ Unexpected server response: ${res.data.message || res.status}`);
      }
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || '❌ Failed to add course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h4 className="mb-3 text-center">Add Teacher Course</h4>

        {message && (
          <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Teacher ID</label>
            <input
              type="text"
              className="form-control"
              name="teacherId"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              required
              placeholder="Enter teacher ID"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Teacher Course Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter teacher course name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Course Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Enter course description"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Course</label>
            <select
              className="form-select"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Course --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title} ({course._id})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Adding...' : 'Add Teacher Course'}
          </button>
        </form>
      </div>
    </div>
  );
}





