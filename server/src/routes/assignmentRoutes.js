// // routes/assignmentRoutes.js
// import express from "express";
// import upload from "../middlewares/upload.js";

// import { submitAssignment } from "../controllers/assignmentController.js";
// import { protect } from "../middlewares/studentMiddleware.js";

// const router = express.Router();

// router.post(
//   "/submit",
//   protect,
//   upload.single("file"),
//   submitAssignment
// );

// export default router;



import express from "express";
import multer from "multer";
import Assignment from "../models/Assignment.js";

import { getAllCourseAssignmentsForAdmin, getAssignmentByVideoId, getSubmissionsByTeacherAndCourse, getSubmissionsByVideoId, submitAssignment } from "../controllers/assignmentController.js";


const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/assignments/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.get("/video/:videoId", getAssignmentByVideoId);

router.post('/submit', upload.single('file'), submitAssignment);
// router.get("/teacher/:teacherId/students", getStudentsWithAssignmentCount);


// router.post("/submit", upload.single("file"), async (req, res) => {
//   const { studentId, videoId, courseId } = req.body;
//   try {
//     const video = await CourseVideo.findById(videoId);
//     if (!video) return res.status(404).json({ message: "Video not found" });

//     const already = video.submissions.some(s => s.studentId.toString() === studentId);
//     if (already) return res.status(400).json({ message: "Already submitted." });

//     const fileUrl = `/uploads/assignments/${req.file.filename}`;
//     video.submissions.push({ studentId, fileUrl });
//     await video.save();

//     await Assignment.create({ studentId, videoId, courseId, fileUrl });

//     res.status(200).json({ message: "Submitted", video });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


router.get("/submissions/:teacherId/:courseId", getSubmissionsByTeacherAndCourse);

router.get("/assignments/submissions/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    // videoId अनुसार सबै assignment submissions खोज
    // studentId बाट student को name लिनुहोस् (populate)
    const submissions = await Assignment.find({ videoId, isSubmitted: true })
      .populate("studentId", "name email");

    const result = submissions.map((sub) => ({
      studentId: sub.studentId._id,
      studentName: sub.studentId.name,
      fileUrl: sub.fileUrl,
      submittedAt: sub.submittedAt,
    }));

    res.json({ videoId, submissions: result });
  } catch (err) {
    res.status(500).json({ message: "Submission data ल्याउन सकिएन।" });
  }
});

router.get('/api/assignments/:videoId/submissions', getSubmissionsByVideoId);

// 📁 routes/assignmentRoutes.js
router.get("/submissions/all", getAllCourseAssignmentsForAdmin);



export default router;
