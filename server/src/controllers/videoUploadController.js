// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import CourseVideo from "../models/CourseVideo.js";
// import TeacherCourse from "../models/TeacherCourse.js";

// // Ensure upload directory exists
// const VIDEO_UPLOAD_PATH = "uploads/videos";
// if (!fs.existsSync(VIDEO_UPLOAD_PATH)) {
//   fs.mkdirSync(VIDEO_UPLOAD_PATH, { recursive: true });
// }

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, VIDEO_UPLOAD_PATH);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `course-${req.params.courseId}-${Date.now()}${ext}`);
//   },
// });

// export const upload = multer({
//   storage,
//   limits: { fileSize: 500 * 1024 * 1024 }, // optional: limit to 500MB
// });


// export const uploadCourseVideo = async (req, res) => {
//   try {
//    const { teacherId, courseId } = req.params;
//     const { title, videoUrl } = req.body;

//       // यहाँ course publish स्थिति जाँच
//     const course = await TeacherCourse.findOne({ teacherId, courseId });

//     if (!course || course.status !== "published") {
//       return res.status(403).json({ message: "Course is not published. Cannot upload videos." });
//     }

//     let urlToSave = "";

//     if (req.file) {
//       urlToSave = `/uploads/videos/${req.file.filename}`; // local file
//     } else if (videoUrl) {
//       urlToSave = videoUrl; // YouTube URL
//     } else {
//       return res.status(400).json({ message: "No video or URL provided" });
//     }

//     const savedVideo = await CourseVideo.create({
//       teacherId,
//       courseId,
//       videoUrl: urlToSave,
//       title,
//     });

//     res.status(200).json({
//       message: "Video uploaded",
//       url: savedVideo.videoUrl,
//     });
//   } catch (err) {
//     console.error("Upload failed:", err);
//     res.status(500).json({ message: "Upload failed", error: err.message });
//   }
// };

// // NEW ✅ - filters by both courseId and teacherId
// export const getCourseVideos = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const { teacherId } = req.query;

//     if (!teacherId) {
//       return res.status(400).json({ message: "teacherId is required" });
//     }

//     const videos = await CourseVideo.find({ courseId, teacherId }).sort({ uploadedAt: -1 });
//     res.status(200).json(videos);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch videos", error: err.message });
//   }
// };


// // DELETE: Delete course video by ID
// export const deleteCourseVideo = async (req, res) => {
//   try {
//     const { videoId } = req.params;

//     const video = await CourseVideo.findById(videoId);
//     if (!video) {
//       return res.status(404).json({ message: "Video not found" });
//     }

//     // Delete file from server if it's a local video (not a YouTube URL)
//     if (!video.videoUrl.startsWith("http")) {
//       const localPath = `./public${video.videoUrl}`;
//       if (fs.existsSync(localPath)) {
//         fs.unlinkSync(localPath);
//       }
//     }

//     await CourseVideo.findByIdAndDelete(videoId);
//     res.status(200).json({ message: "Video deleted successfully" });
//   } catch (err) {
//     console.error("Delete failed:", err);
//     res.status(500).json({ message: "Failed to delete video", error: err.message });
//   }
// };





import multer from "multer";
import path from "path";
import fs from "fs";
import CourseVideo from "../models/CourseVideo.js";
import TeacherCourse from "../models/TeacherCourse.js";
import Assignment from "../models/Assignment.js";


// Folders
const VIDEO_UPLOAD_PATH = path.join(process.cwd(), "uploads/videos");
const ASSIGNMENT_UPLOAD_PATH = path.join(process.cwd(), "uploads/assignments");

[VIDEO_UPLOAD_PATH, ASSIGNMENT_UPLOAD_PATH].forEach((folder) => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
});




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "video") {
      cb(null, VIDEO_UPLOAD_PATH);
    } else if (file.fieldname === "assignment") {
      cb(null, ASSIGNMENT_UPLOAD_PATH);
    } else {
      cb(new Error("Invalid field name"), null);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const type = file.fieldname;
    cb(null, `${type}-${req.params.courseId}-${Date.now()}${ext}`);
  },
});

export const upload = multer({ storage }).fields([
  { name: "video", maxCount: 1 },
  { name: "assignment", maxCount: 1 },
]);





export const uploadCourseVideo = async (req, res) => {
  try {
    const { teacherId, courseId } = req.params;
    const { title, videoUrl, assignmentUrl } = req.body; // ✅

    const course = await TeacherCourse.findOne({ teacherId, courseId });
    if (!course || course.status !== "published") {
      return res.status(403).json({ message: "Course not published" });
    }

    const videoFile = req.files?.video?.[0];
    const assignmentFile = req.files?.assignment?.[0];

    const videoPath = videoFile
      ? `/uploads/videos/${videoFile.filename}`
      : videoUrl;

    const assignmentPath = assignmentFile
      ? `/uploads/assignments/${assignmentFile.filename}`
      : assignmentUrl || null; 

    const newVideo = await CourseVideo.create({
      teacherId,
      courseId,
      title,
      videoUrl: videoPath,
      assignmentUrl: assignmentPath,
    });

    res.status(201).json(newVideo);
  } catch (err) {
    console.error("Upload error:", err);
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
// export const deleteCourseVideo = async (req, res) => {
//   try {
//     const { videoId } = req.params;

//     const video = await CourseVideo.findById(videoId);
//     if (!video) {
//       return res.status(404).json({ message: "Video not found" });
//     }

//     // Delete file from server if it's a local video (not a YouTube URL)
//     if (!video.videoUrl.startsWith("http")) {
//       const localPath = `./public${video.videoUrl}`;
//       if (fs.existsSync(localPath)) {
//         fs.unlinkSync(localPath);
//       }
//     }

//     await CourseVideo.findByIdAndDelete(videoId);
//     res.status(200).json({ message: "Video deleted successfully" });
//   } catch (err) {
//     console.error("Delete failed:", err);
//     res.status(500).json({ message: "Failed to delete video", error: err.message });
//   }
// };


export const deleteCourseVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await CourseVideo.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Delete local video file
    if (video.videoUrl && !video.videoUrl.startsWith("http")) {
      const videoFilePath = path.join(process.cwd(), "public", video.videoUrl);
      if (fs.existsSync(videoFilePath) && fs.lstatSync(videoFilePath).isFile()) {
        fs.unlinkSync(videoFilePath);
      }
    }

    // Delete local assignment file
    if (video.assignmentUrl && !video.assignmentUrl.startsWith("http")) {
      const assignmentFilePath = path.join(process.cwd(), "public", video.assignmentUrl);
      if (fs.existsSync(assignmentFilePath) && fs.lstatSync(assignmentFilePath).isFile()) {
        fs.unlinkSync(assignmentFilePath);
      }
    }

    await CourseVideo.findByIdAndDelete(videoId);
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ message: "Failed to delete video", error: err.message });
  }
};


// export const updateCourseVideo = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // check if req.body exists
//     const { title, videoUrl, assignmentUrl } = req.body || {};

//     // multer files
//     const videoFile = req.files?.video?.[0];
//     const assignmentFile = req.files?.assignment?.[0];

//     if (!title) {
//       return res.status(400).json({ message: "Title is required" });
//     }

//     const updateData = { title };

//     if (videoFile) {
//       updateData.videoUrl = `/uploads/videos/${videoFile.filename}`;
//     } else if (videoUrl) {
//       updateData.videoUrl = videoUrl;
//     }

//     if (assignmentFile) {
//       updateData.assignmentUrl = `/uploads/assignments/${assignmentFile.filename}`;
//     } else if (assignmentUrl) {
//       updateData.assignmentUrl = assignmentUrl;
//     }

//     const updated = await CourseVideo.findByIdAndUpdate(id, updateData, { new: true });

//     if (!updated) return res.status(404).json({ message: "Video not found" });

//     res.json(updated);
//   } catch (err) {
//     console.error("Update failed:", err);
//     res.status(500).json({ message: "Update failed", error: err.message });
//   }
// };


export const updateCourseVideo = async (req, res) => {
  try {
    const { id } = req.params;

    // req.body fields (non-file)
    const title = req.body.title;
    const videoUrl = req.body.videoUrl;
    const assignmentUrl = req.body.assignmentUrl;

    const videoFile = req.files?.video?.[0];
    const assignmentFile = req.files?.assignment?.[0];

    const updatedFields = {
      title,
    };

    if (videoFile) {
      updatedFields.videoUrl = `/uploads/videos/${videoFile.filename}`;
    } else if (videoUrl) {
      updatedFields.videoUrl = videoUrl;
    }

    if (assignmentFile) {
      updatedFields.assignmentUrl = `/uploads/assignments/${assignmentFile.filename}`;
    } else if (assignmentUrl) {
      updatedFields.assignmentUrl = assignmentUrl;
    }

    const updatedVideo = await CourseVideo.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(updatedVideo);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};



export const getAssignmentByVideo = async (req, res) => {
  const { videoId, teacherId, courseId } = req.params;
  try {
    const video = await CourseVideo.findOne({ _id: videoId, teacherId, courseId });
    if (!video || !video.assignmentUrl) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json({ assignmentUrl: video.assignmentUrl });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};




// Get single video by ID
export const getVideoById = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await CourseVideo.findById(id).populate("submissions.studentId");
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json({ video });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// export const getAllVideos = async (req, res) => {
//   try {
//     const videos = await CourseVideo.find().populate("submissions.studentId");
//     res.json({ videos });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


// Example route: GET /api/videos
export const getAllVideos = async (req, res) => {
  const { courseId, teacherId } = req.query;

  const query = {};
  if (courseId) query.courseId = courseId;
  if (teacherId) query.teacherId = teacherId;

  // Show only those that have assignments
  query.assignmentUrl = { $ne: null };

  const videos = await CourseVideo.find(query);
  res.status(200).json({ videos });
};


