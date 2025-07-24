import mongoose from "mongoose";

const teacherUploadassignmentSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  assignmentUrl: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

export default mongoose.models.Video || mongoose.model("Video", teacherUploadassignmentSchema);
