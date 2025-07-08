import multer from "multer";
import path from "path";
import fs from "fs";
import CourseVideo from "../models/CourseVideo.js";
import TeacherCourse from "../models/TeacherCourse.js";

// Ensure upload directory exists
const VIDEO_UPLOAD_PATH = "uploads/videos";
if (!fs.existsSync(VIDEO_UPLOAD_PATH)) {
  fs.mkdirSync(VIDEO_UPLOAD_PATH, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, VIDEO_UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `course-${req.params.courseId}-${Date.now()}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // optional: limit to 500MB
});


export const uploadCourseVideo = async (req, res) => {
  try {
   const { teacherId, courseId } = req.params;
    const { title, videoUrl } = req.body;

      // यहाँ course publish स्थिति जाँच
    const course = await TeacherCourse.findOne({ teacherId, courseId });

    if (!course || course.status !== "published") {
      return res.status(403).json({ message: "Course is not published. Cannot upload videos." });
    }

    let urlToSave = "";

    if (req.file) {
      urlToSave = `/uploads/videos/${req.file.filename}`; // local file
    } else if (videoUrl) {
      urlToSave = videoUrl; // YouTube URL
    } else {
      return res.status(400).json({ message: "No video or URL provided" });
    }

    const savedVideo = await CourseVideo.create({
      teacherId,
      courseId,
      videoUrl: urlToSave,
      title,
    });

    res.status(200).json({
      message: "Video uploaded",
      url: savedVideo.videoUrl,
    });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// NEW ✅ - filters by both courseId and teacherId
export const getCourseVideos = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { teacherId } = req.query;

    if (!teacherId) {
      return res.status(400).json({ message: "teacherId is required" });
    }

    const videos = await CourseVideo.find({ courseId, teacherId }).sort({ uploadedAt: -1 });
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos", error: err.message });
  }
};


// DELETE: Delete course video by ID
export const deleteCourseVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await CourseVideo.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Delete file from server if it's a local video (not a YouTube URL)
    if (!video.videoUrl.startsWith("http")) {
      const localPath = `./public${video.videoUrl}`;
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }
    }

    await CourseVideo.findByIdAndDelete(videoId);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ message: "Failed to delete video", error: err.message });
  }
};
