import express from "express";
// import multer from "multer";
import {  createEnrolledCourse, getAllEnrolledCourses,  getEnrolledCoursesByStudent, upload } from "../controllers/enrolledCoursesController.js";

const router = express.Router();



router.get("/", getAllEnrolledCourses);
// router.get("/:id", getEnrolledCourseById);
// router.post("/", upload.single("thumbnail"), addEnrolledCourse);


router.post("/", upload.single("thumbnail"), createEnrolledCourse);
router.get('/:studentId', getEnrolledCoursesByStudent);




export default router;
