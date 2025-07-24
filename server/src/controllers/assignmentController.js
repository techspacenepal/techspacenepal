

import Assignment from "../models/Assignment.js";
import CourseVideo from "../models/CourseVideo.js";
import EnrolledCourse from '../models/enrolledCourses.js';
import Student from '../models/student.js';
import User from "../models/Auth.js";
import Course from "../models/Course.js";

// 🔹 Get Assignment by Video ID with submission check
export const getAssignmentByVideoId = async (req, res) => {
  const { videoId } = req.params;
  const { studentId } = req.query; 
  
  try {
    const video = await CourseVideo.findById(videoId);
    if (!video || !video.assignmentId) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const assignment = await Assignment.findById(video.assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Check if student already submitted
    const alreadySubmitted = assignment.submissions.some(
      (submission) => submission.studentId.toString() === studentId
    );

    const response = {
      ...assignment.toObject(),
      isSubmitted: alreadySubmitted,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignment" });
  }
};

export const submitAssignment = async (req, res) => {
  const { studentId, videoId, courseId, fileUrl: externalUrl } = req.body;

  try {
    const video = await CourseVideo.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // ✅ Step 1: Check if already submitted
    const alreadySubmitted = await Assignment.findOne({ studentId, videoId });
    if (alreadySubmitted) {
      return res
        .status(400)
        .json({ message: "You already submitted this assignment" });
    }

    // ✅ Step 2: Collect file URLs
    const fileUrlsToSave = [];

    if (req.file) {
      fileUrlsToSave.push(`/uploads/assignments/${req.file.filename}`);
    }

    if (externalUrl && externalUrl.trim() !== "") {
      fileUrlsToSave.push(externalUrl);
    }

    if (fileUrlsToSave.length === 0) {
      return res.status(400).json({ message: "No file or URL provided" });
    }

    // ✅ Step 3: Save to CourseVideo (for teacher view)
    video.submissions.push({
      studentId,
      fileUrl: fileUrlsToSave[0], // push first one only, or modify as needed
    });
    await video.save();

    // ✅ Step 4: Save to Assignment collection
    const newAssignment = new Assignment({
      studentId,
      courseId,
      videoId,
      fileUrls: fileUrlsToSave,
      submittedAt: new Date(),
      isSubmitted: true,
    });

    await newAssignment.save();

    res.status(200).json({ message: "Assignment submitted", assignment: newAssignment });
  } catch (error) {
    console.error("Assignment submit error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubmissionsByTeacherAndCourse = async (req, res) => {
  const { teacherId, courseId } = req.params;

  try {
    const videos = await CourseVideo.find({ teacherId, courseId });
    console.log("Videos found:", videos.length);

    const videoIds = videos.map((v) => v._id);
    console.log("Video IDs:", videoIds);

    const assignments = await Assignment.find({
      videoId: { $in: videoIds },
      isSubmitted: true,
    })
    .populate("studentId", "username  email")
    .populate({ path: "videoId", select: "title", model: "CourseVideo" });

    console.log("Assignments found:", assignments.length);

    const formatted = assignments.map((a) => ({
      studentName: a.studentId?.username|| "Unknown",
      studentEmail: a.studentId?.email || "Unknown",
      videoTitle: a.videoId?.title || "Unknown Video",
       fileUrls: a.fileUrls,
      submittedAt: a.submittedAt,
    }));

    res.status(200).json({ submissions: formatted });
  } catch (err) {
    console.error("Failed to fetch submissions:", err);
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};

export const getSubmissionsByVideoId = async (req, res) => {
  const { videoId } = req.params;

  try {
    const submissions = await Assignment.find({ videoId })
      .populate("studentId", "name email");

    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching submissions", error: err.message });
  }
};

export const getAllCourseAssignmentsForAdmin = async (req, res) => {
  try {
    const courses = await Course.find(); 
    const result = [];

    for (const course of courses) {
      const assignments = await Assignment.find({ courseId: course._id })
        .populate("studentId", "username email")
        .populate("videoId", "title");

      const formatted = assignments.map((a) => ({
        studentName:a.studentId?.username,
        studentEmail: a.studentId.email,
        videoTitle: a.videoId?.title || "N/A",
        submittedAt: a.submittedAt,
        fileUrls: a.fileUrls,
        courseId: course._id,
        courseTitle: course.title,
      }));

      result.push({
        courseId: course._id,
        courseTitle: course.title,
        submissions: formatted,
      });
    }

    res.status(200).json({ data: result });
  } catch (err) {
    console.error("Admin assignment fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
