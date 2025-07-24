
// import express from "express";
// import { deleteCourseVideo, getCourseVideos, upload, uploadCourseVideo } from "../controllers/videoUploadController.js";
// import Video from "../models/CourseVideo.js";

// const router = express.Router();

// router.post("/upload/:teacherId/:courseId", upload, uploadCourseVideo);
// router.get("/videos/:courseId", getCourseVideos);
// router.delete("/videos/:videoId", deleteCourseVideo);


// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const video = await Video.findById(id);
//     if (!video) return res.status(404).json({ message: 'Video not found' });
//     res.json({ video });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// //✅ Get all videos
// router.get('/', async (req, res) => {
//   try {
//     const videos = await Video.find();
//     res.json({ videos });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ✅ Keep only this:
// router.get("/videos/:teacherId/:courseId", async (req, res) => {
//   const { teacherId, courseId } = req.params;

//   try {
//     const videos = await Video.find({ teacherId, courseId });
//     res.json({ videos });
//   } catch (err) {
//     console.error("Error fetching videos:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });



// export default router;







import express from "express";
import { deleteCourseVideo, getAllVideos, getCourseVideos,  getVideoById, updateCourseVideo, upload, uploadCourseVideo } from "../controllers/videoUploadController.js";
import Video from "../models/CourseVideo.js";


const router = express.Router();

router.post("/upload/:teacherId/:courseId", upload, uploadCourseVideo);

// ** Change `/videos/course/:courseId` to avoid clash **
router.get("/videos/course/:courseId", getCourseVideos);

// Get single video details
router.get("/videos/video/:id", getVideoById);

router.delete("/videos/:videoId", deleteCourseVideo);
router.put("/update/:id",upload, updateCourseVideo);

router.get("/:id", getVideoById);
router.get("/", getAllVideos);


// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const video = await Video.findById(id);
//     if (!video) return res.status(404).json({ message: "Video not found" });
//     res.json({ video });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Keep this route on top because it's more specific
router.get("/videos/:teacherId/:courseId", async (req, res) => {
  const { teacherId, courseId } = req.params;
  console.log("Fetching videos for teacher:", teacherId, "course:", courseId);
  try {
    const videos = await Video.find({ teacherId, courseId });
    console.log("Videos found:", videos.length);
    res.json({ videos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
 

// Get all videos — keep it at last or remove if not needed
// router.get("/", async (req, res) => {
//   try {
//     const videos = await Video.find();
//     res.json({ videos });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });


export default router;
