import express from "express";

import {
  createTeacherCourse,
  deleteTeacherCourse,
  getAllTeacherCourses,
  getCoursesByTeacher,
  getStudentsByTeacherAndCourse,
  getTeacherCourseDetails,
  getTeacherCoursesWithEnrollments,
  getTeacherCourseWithStudentCount,
  getTotalStudentsByTeacher,
  publishTeacherCourse,
} from "../controllers/teacherCourseController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createTeacherCourse);
router.get("/", getAllTeacherCourses);
router.delete("/:id", deleteTeacherCourse);
router.get("/teacher/:teacherId", getCoursesByTeacher);


router.get("/students/:teacherId/:courseId", getStudentsByTeacherAndCourse);
router.get("/teacher/:teacherId/total-students", getTotalStudentsByTeacher);
//router.get("/teacher/:teacherId/enrollments", getTeacherCourseWithStudentCount);
router.get("/teacher/:teacherId/enrollments", getTeacherCoursesWithEnrollments);
// router.put("/publish/:teacherId/:courseId", publishTeacherCourse);

// teacherCourseRoutes.js
router.put(
  "/publish/:teacherId/:courseId",
  protect,
  (req, res, next) => {
    console.log("🔥 Route match for PUT /publish/:teacherId/:courseId");
    next();
  },
  publishTeacherCourse
);

router.get("/details/:teacherId/:courseId", getTeacherCourseDetails);

//router.get("/:teacherId/:courseId", getTeacherCourseDetails);

export default router;
