// import express from "express";
// import Video from "../models/CourseVideo.js"; // Video model path अनुसार मिलाउनुहोस्

// const router = express.Router();

// router.get("/:courseId/:studentId", async (req, res) => {
//   const { courseId, studentId } = req.params;

//   if (!courseId || !studentId) {
//     return res.status(400).json({ error: "Missing IDs" });
//   }

//   try {
//     // तपाईँको logic अनुसार video खोज्नुहोस्
//     const videos = await Video.find({ courseId });

//     res.json(videos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// export default router;




import express from "express";
import { deleteCourseVideo, getCourseVideos, upload, uploadCourseVideo } from "../controllers/videoUploadController.js";


const router = express.Router();

router.post("/upload/:teacherId/:courseId", upload, uploadCourseVideo);
router.get("/videos/:courseId", getCourseVideos);
router.delete("/videos/:videoId", deleteCourseVideo);

export default router;
