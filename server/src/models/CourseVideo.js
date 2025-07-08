// models/CourseVideo.js
import mongoose from "mongoose";

const courseVideoSchema = new mongoose.Schema({
    
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
     title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const CourseVideo = mongoose.model("CourseVideo", courseVideoSchema);
export default CourseVideo;
