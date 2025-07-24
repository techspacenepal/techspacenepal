// import Video from "../models/teacherUploadassignment";
// import CourseVideo from "../models/CourseVideo";
// import path from "path";
// import fs from "fs";

// // POST: Upload Video
// // export const uploadVideo = async (req, res) => {
// //   try {
// //     const { teacherId, courseId } = req.params;
// //     const { videoUrl, title } = req.body;

// //     let finalVideoUrl = "";
// //     let finalAssignmentUrl = "";

// //     // If video is uploaded
// //     if (req.files?.video) {
// //       finalVideoUrl = "/uploads/videos/" + req.files.video[0].filename;
// //     } else if (videoUrl) {
// //       finalVideoUrl = videoUrl; // External YouTube/etc.
// //     }

// //     // Assignment file (optional)
// //     if (req.files?.assignment) {
// //       finalAssignmentUrl = "/uploads/assignments/" + req.files.assignment[0].filename;
// //     }

// //     const newVideo = new Video({
// //       title,
// //       videoUrl: finalVideoUrl,
// //       assignmentUrl: finalAssignmentUrl,
// //       teacherId,
// //       courseId,
// //     });

// //     await newVideo.save();
// //     res.status(201).json(newVideo);
// //   } catch (error) {
// //     console.error("Upload error:", error);
// //     res.status(500).json({ message: "Upload failed" });
// //   }
// // };



// export const uploadVideo = async (req, res) => {
//   try {
//     const { teacherId, courseId } = req.params;
//     const { videoUrl, title, questions } = req.body;

//     let finalVideoUrl = "";
//     let finalAssignmentUrl = "";

//     // Video file upload or URL
//     if (req.files?.video) {
//       finalVideoUrl = "/uploads/videos/" + req.files.video[0].filename;
//     } else if (videoUrl) {
//       finalVideoUrl = videoUrl;
//     }

//     // Assignment file upload (optional)
//     if (req.files?.assignment) {
//       finalAssignmentUrl = "/uploads/assignments/" + req.files.assignment[0].filename;
//     }

//     // Create the CourseVideo document
//     const newCourseVideo = new CourseVideo({
//       teacherId,
//       courseId,
//       title,
//       videoUrl: finalVideoUrl,
//       assignmentUrl: finalAssignmentUrl, // file URL
//     });

//     // If assignment questions provided, create AssignmentQuestion doc and save its id
//     if (questions) {
//       const parsedQuestions = JSON.parse(questions);
//       const newAssignment = await AssignmentQuestion.create({
//         videoId: newCourseVideo._id,
//         questions: parsedQuestions,
//       });
//       newCourseVideo.assignmentId = newAssignment._id;
//     }

//     await newCourseVideo.save();

//     res.status(201).json(newCourseVideo);
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ message: "Upload failed" });
//   }
// };





// // GET: Fetch Single Video by ID
// export const getVideoById = async (req, res) => {
//   try {
//       console.log("Fetching video with ID:", req.params.videoId);
//     const video = await CourseVideo.findById(req.params.videoId);
//     if (!video) return res.status(404).json({ message: "Video not found" });
//     res.json(video);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
