'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Student {
  _id: string;
  fullName?: string | null;
  username?: string | null;
  email: string;
  courseId: string;
  courseTitle: string;
  assignmentCompleted: boolean;
  currentGrade?: string | null;
   assignmentSubmissionCount?: number; 
}

export default function GradesPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [grades, setGrades] = useState<{ [studentId: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const teacherId =
    typeof window !== 'undefined' ? localStorage.getItem('teacherId') : null;

  useEffect(() => {
    const fetchStudents = async () => {
      if (!teacherId) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/enrolledCourses/students-with-assignments/${teacherId}`
        );
        setStudents(res.data);

        const initialGrades: { [studentId: string]: string } = {};
        res.data.forEach((student: Student) => {
          if (student.currentGrade) {
            initialGrades[student._id] = student.currentGrade;
          }
        });
        setGrades(initialGrades);
      } catch (err) {
        toast.error('Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [teacherId]);

  const handleGradeChange = (studentId: string, grade: string) => {
    setGrades((prev) => ({ ...prev, [studentId]: grade }));
  };

  const handleSubmitGrade = async (
    studentId: string,
    courseId: string,
    grade: string
  ) => {
    try {
      const token = Cookies.get('teacherToken');
      await axios.put(
        `http://localhost:5000/api/enrolledCourses/submit-grade/${studentId}/${courseId}`,
        { grade },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Grade submitted successfully');
    } catch (error) {
      toast.error('Grade submission failed');
    }
  };

  const groupedByCourse: { [courseTitle: string]: Student[] } = {};
  students.forEach((student) => {
    if (!groupedByCourse[student.courseTitle]) {
      groupedByCourse[student.courseTitle] = [];
    }
    groupedByCourse[student.courseTitle].push(student);
  });

  return (
    <div className="container py-4">
      <ToastContainer />
      <h2 className="mb-4 fw-bold text-center "> Grade Management System</h2>

      {loading ? (
        <p className="text-center">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-center">No students have completed assignments yet.</p>
      ) : (
        Object.entries(groupedByCourse).map(([courseTitle, courseStudents]) => (
          <div key={courseTitle} className="mb-5">
            <h4 className="text-primary mb-3">Course: {courseTitle}</h4>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                {/* <thead className="table-light">
                  <tr>
                    <th>S.N.</th>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Assignment</th>
                    <th className="text-center">Grade</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead> */}


                <thead className="table-light">
  <tr>
    <th>S.N.</th>
    <th>Student</th>
    <th>Email</th>
    <th>Assignment</th>
    <th className="text-center"> Submitted</th> 
    <th className="text-center">Grade</th>
    <th className="text-center">Action</th>
  </tr>
</thead>



                {/* <tbody>
                  {courseStudents.map((student, index) => {
                    const displayName =
                      student.fullName?.trim() ||
                      student.username?.trim() ||
                      'Unnamed';

                    return (
                      <tr key={student._id}>
                        <td>{index + 1}</td>
                        <td>{displayName}</td>
                        <td>{student.email}</td>
                        <td>
                          {student.assignmentCompleted ? (
                            <span className="badge bg-success">Completed</span>
                          ) : (
                            <span className="badge bg-danger">Not Completed</span>
                          )}
                        </td>
                        <td className="text-center">
                          {student.assignmentCompleted ? (
                            <div className="btn-group" role="group">
                              {['A+', 'A', 'B+', 'B', ].map((grade) => (
                                <button
                                  key={grade}
                                  type="button"
                                  className={`btn btn-sm btn-outline-primary ${
                                    grades[student._id] === grade ? 'active' : ''
                                  }`}
                                  onClick={() =>
                                    handleGradeChange(student._id, grade)
                                  }
                                >
                                  {grade}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted">N/A</span>
                          )}
                        </td>
                        <td className="text-center">
                          {student.assignmentCompleted ? (
                            <button
                              className="btn btn-sm btn-primary"
                              disabled={!grades[student._id]}
                              onClick={() =>
                                handleSubmitGrade(
                                  student._id,
                                  student.courseId,
                                  grades[student._id]
                                )
                              }
                            >
                              Submit
                            </button>
                          ) : (
                            <span className="text-muted">N/A</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody> */}


                <tbody>
  {courseStudents.map((student, index) => {
    const displayName =
      student.fullName?.trim() ||
      student.username?.trim() ||
      'Unnamed';

    return (
      <tr key={student._id}>
        <td>{index + 1}</td>
        <td>{displayName}</td>
        <td>{student.email}</td>
        <td>
          {student.assignmentCompleted ? (
            <span className="badge bg-success">Completed</span>
          ) : (
            <span className="badge bg-danger">Not Completed</span>
          )}
        </td>

        {/* नयाँ कॉलम: Submit गरेको assignments को संख्या */}
        <td className="text-center">
          {student.assignmentSubmissionCount ?? 0}
        </td>

        <td className="text-center">
          {student.assignmentCompleted ? (
            <div className="btn-group" role="group">
              {['A+', 'A', 'B+', 'B'].map((grade) => (
                <button
                  key={grade}
                  type="button"
                  className={`btn btn-sm btn-outline-primary ${
                    grades[student._id] === grade ? 'active' : ''
                  }`}
                  onClick={() =>
                    handleGradeChange(student._id, grade)
                  }
                >
                  {grade}
                </button>
              ))}
            </div>
          ) : (
            <span className="text-muted">N/A</span>
          )}
        </td>
        <td className="text-center">
          {student.assignmentCompleted ? (
            <button
              className="btn btn-sm btn-primary"
              disabled={!grades[student._id]}
              onClick={() =>
                handleSubmitGrade(
                  student._id,
                  student.courseId,
                  grades[student._id]
                )
              }
            >
              Submit
            </button>
          ) : (
            <span className="text-muted">N/A</span>
          )}
        </td>
      </tr>
    );
  })}
</tbody>

              </table>
            </div>

            
          </div>
        ))
      )}
    </div>
  );
}

