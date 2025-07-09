import express from "express";
import { deleteCourseVideo, getCourseVideos, upload, uploadCourseVideo } from "../controllers/videoUploadController.js";
import {
  createTeacherCourse,
  deleteTeacherCourse,
  getAllTeacherCourses,
  getCoursesByTeacher,
  
  getStudentsByTeacherAndCourse,
  getTeacherCourseDetails,
  getTeacherCoursesWithEnrollments,
 
  getTotalStudentsByTeacher,
  
  publishTeacherCourse,
  
} from "../controllers/teacherCourseController.js";
import { protect } from "../middlewares/authMiddleware.js";
import checkEnrollmentBeforeUpload from "../middlewares/checkEnrollmentBeforeUpload.js";


const router = express.Router();

router.post("/", createTeacherCourse);
router.get("/", getAllTeacherCourses);
router.delete("/:id", deleteTeacherCourse);
router.get("/teacher/:teacherId", getCoursesByTeacher);


router.get("/students/:teacherId/:courseId", getStudentsByTeacherAndCourse);
router.get("/teacher/:teacherId/total-students", getTotalStudentsByTeacher);

router.get("/teacher/:teacherId/enrollments", getTeacherCoursesWithEnrollments);


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




// POST: Upload Video
router.post(
  "/upload/:teacherId/:courseId",
  protect, // optional
  upload.single("video"),
  uploadCourseVideo,
  checkEnrollmentBeforeUpload
);

router.get("/videos/:courseId", getCourseVideos);
router.delete("/videos/:videoId", protect, deleteCourseVideo);







export default router;
