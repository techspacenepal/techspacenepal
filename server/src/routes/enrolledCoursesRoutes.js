import express from "express";
// import multer from "multer";
import {
  createEnrolledCourse,
  getAllEnrolledCourses,
  getCoursesByTeacherIdFromEnrollments,
  getEnrolledCoursesByStudent,
  getEnrolledCoursesByTeacher,
  getStudentCountByCourseAndTeacher,
  getStudentsByCourseId,
  getStudentsByTeacherWithProgress,
  markQuizPassed,
  markVideoWatched,
  publishEnrolledCourse,
  updateProgress,
  upload,
} from "../controllers/enrolledCoursesController.js";


import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/", getAllEnrolledCourses);
// router.get("/:id", getEnrolledCourseById);
// router.post("/", upload.single("thumbnail"), addEnrolledCourse);

router.post("/", upload.single("thumbnail"), createEnrolledCourse);
router.get("/:studentId", getEnrolledCoursesByStudent);
router.get("/course/:courseId", getStudentsByCourseId);

// router.get("/:courseId/students", getCourseStudentsByTeacher);
router.get("/course/:courseId/count", getStudentCountByCourseAndTeacher);

router.get("/students/teacher/:teacherId", getStudentsByTeacherWithProgress);

// router.get("/teacher/:teacherId", getCoursesByTeacherIdFromEnrollments);
router.get('/coursesByTeacher/:teacherId', getCoursesByTeacherIdFromEnrollments);

router.get("/teacher/:teacherId", getEnrolledCoursesByTeacher);

router.put("/:id/progress", protect, updateProgress);

router.put("/:id/video", protect, markVideoWatched);
router.put("/:id/quiz", protect, markQuizPassed);




// routes/enrolledCourseRoutes.js
router.put("/publish/:teacherId/:courseId", publishEnrolledCourse);



export default router;
