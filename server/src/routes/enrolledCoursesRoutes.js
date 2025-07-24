// import express from "express";
// // import multer from "multer";
// import {
//   createEnrolledCourse,
//   getAllEnrolledCourses,
//   getAllStudentsByTeacher,
//   getCoursesByTeacherIdFromEnrollments,
//   getEnrolledCoursesByStudent,
//   getEnrolledCoursesByTeacher,
//   getEnrolledStudentCount,
//   getEnrollmentByCourseAndStudent,
//   getStudentCountByCourseAndTeacher,
//   getStudentsByCourseId,
//   getStudentsByTeacherWithProgress,  
//   getStudentsWithAssignmentCount,  
//   markAssignmentComplete,
//   markQuizPassed,
//   markVideoWatched,
//   publishEnrolledCourse,  
//   submitGrade,  
//   updateProgress,  
//   upload,
// } from "../controllers/enrolledCoursesController.js";


// import { protect } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.get("/", getAllEnrolledCourses);
// router.post("/", upload.single("thumbnail"), createEnrolledCourse);
// router.get("/:studentId", getEnrolledCoursesByStudent);
// router.get("/course/:courseId", getStudentsByCourseId);
// router.get("/course/:courseId/count", getStudentCountByCourseAndTeacher);
// router.get("/students/teacher/:teacherId", getStudentsByTeacherWithProgress);
// router.get('/coursesByTeacher/:teacherId', getCoursesByTeacherIdFromEnrollments);
// router.get("/teacher/:teacherId", getEnrolledCoursesByTeacher);
// router.put("/:id/video", protect, markVideoWatched);
// router.put("/:id/quiz", protect, markQuizPassed);
// router.put("/publish/:teacherId/:courseId", publishEnrolledCourse);
// router.get("/byCourseAndStudent/:courseId/:studentId", getEnrollmentByCourseAndStudent);
// router.put("/updateProgress/:studentId/:courseId",  updateProgress);
// router.get('/count/:courseId', getEnrolledStudentCount);
// router.get('/students-with-assignments/:teacherId', getAllStudentsByTeacher);
// router.put("/mark-assignment-complete/:studentId/:courseId", markAssignmentComplete);
// router.put('/submit-grade/:studentId/:courseId', submitGrade);
// router.get('/students-with-assignments/:teacherId', getStudentsWithAssignmentCount);


// export default router;   // ----------------working code --------------



// checlking code 

import express from "express";
import {
  createEnrolledCourse,
  getAllEnrolledCourses,  
  getCoursesByTeacherIdFromEnrollments,
  getEnrolledCoursesByStudent,
  getEnrolledCoursesByTeacher,
  getEnrolledStudentCount,
  getEnrollmentByCourseAndStudent,
  getStudentCountByCourseAndTeacher,
  getStudentsByCourseId,
  getStudentsByTeacherWithProgress,
  getStudentsWithAssignmentCount,
  markAssignmentComplete,
  markQuizPassed,
  markVideoWatched,
  publishEnrolledCourse,
  submitGrade,
  updateProgress,
  upload,
} from "../controllers/enrolledCoursesController.js";

import { protect } from "../middlewares/authMiddleware.js";
import EnrolledCourse from '../models/enrolledCourses.js';
const router = express.Router();

// 🧾 Enrollment Routes
router.get("/", getAllEnrolledCourses);
router.post("/", upload.single("thumbnail"), createEnrolledCourse);
router.get("/:studentId", getEnrolledCoursesByStudent);
router.get("/course/:courseId", getStudentsByCourseId);
router.get("/course/:courseId/count", getStudentCountByCourseAndTeacher);
router.get("/count/:courseId", getEnrolledStudentCount);
router.get("/byCourseAndStudent/:courseId/:studentId", getEnrollmentByCourseAndStudent);

// 📽️ Progress Tracking
router.put("/:id/video", protect, markVideoWatched);
router.put("/:id/quiz", protect, markQuizPassed);
router.put("/updateProgress/:studentId/:courseId", updateProgress);

// ✅ Publish course
router.put("/publish/:teacherId/:courseId", publishEnrolledCourse);

// 👨‍🏫 Teacher-Specific
router.get("/teacher/:teacherId", getEnrolledCoursesByTeacher);
router.get("/coursesByTeacher/:teacherId", getCoursesByTeacherIdFromEnrollments);
router.get("/students/teacher/:teacherId", getStudentsByTeacherWithProgress);

// 📥 Assignments & Grades
router.get("/students-with-assignments/:teacherId", getStudentsWithAssignmentCount);
router.put("/mark-assignment-complete/:studentId/:courseId", markAssignmentComplete);
router.put("/submit-grade/:studentId/:courseId", submitGrade);





export default router;
