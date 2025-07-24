// import express from "express";
// import multer from "multer";
// import { getVideoById, uploadVideo } from "../controllers/teacherUploadassignmentController.js";
// import { getAssignmentByVideoId } from "../controllers/assignmentController.js";


// const router = express.Router();

// // File Upload Config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const type = file.fieldname === "video" ? "videos" : "assignments";
//     const uploadPath = `./uploads/${type}`;
//     fs.mkdirSync(uploadPath, { recursive: true });
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const name = `${Date.now()}-${file.fieldname}${ext}`;
//     cb(null, name);
//   },
// });

// const upload = multer({ storage });

// // Upload video + assignment
// router.post(
//   "/upload/:teacherId/:courseId",
//   upload.fields([
//     { name: "video", maxCount: 1 },
//     { name: "assignment", maxCount: 1 },
//   ]),
//   uploadVideo
// );

// // Fetch single video
// router.get("/:videoId", getVideoById);
// router.get('/video/:videoId', getAssignmentByVideoId);



// export default router;
