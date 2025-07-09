import express from "express";
// import multer from "multer";
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
  markQuizPassed,
  markVideoWatched,
  publishEnrolledCourse,  
  updateProgress,  
  upload,
} from "../controllers/enrolledCoursesController.js";


import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/", getAllEnrolledCourses);

router.post("/", upload.single("thumbnail"), createEnrolledCourse);
router.get("/:studentId", getEnrolledCoursesByStudent);

router.get("/course/:courseId", getStudentsByCourseId);



router.get("/course/:courseId/count", getStudentCountByCourseAndTeacher);

router.get("/students/teacher/:teacherId", getStudentsByTeacherWithProgress);


router.get('/coursesByTeacher/:teacherId', getCoursesByTeacherIdFromEnrollments);

router.get("/teacher/:teacherId", getEnrolledCoursesByTeacher);



router.put("/:id/video", protect, markVideoWatched);
router.put("/:id/quiz", protect, markQuizPassed);




// routes/enrolledCourseRoutes.js
router.put("/publish/:teacherId/:courseId", publishEnrolledCourse);


router.get("/byCourseAndStudent/:courseId/:studentId", getEnrollmentByCourseAndStudent);
router.put("/updateProgress/:studentId/:courseId",  updateProgress);


// 🔢 Count enrolled students in a course
router.get('/count/:courseId', getEnrolledStudentCount);



export default router;
