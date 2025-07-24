// models/CourseVideo.js
import mongoose from "mongoose";

const courseVideoSchema = new mongoose.Schema({
    
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: {
    type: String,
    required: true,
  },
     videoUrl: {
  type: String,
  required: false, 
  default: null,
},
  // videoUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
    assignmentUrl: { type: String, default: null },
     assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    default: null,
  },
  submissions: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      submittedAt: {
        type: Date,
        default: Date.now,
      },
      fileUrl: String, 
    },
  ],
});

const CourseVideo = mongoose.model("CourseVideo", courseVideoSchema);
export default CourseVideo;
