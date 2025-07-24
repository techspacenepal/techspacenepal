import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  // videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "CourseVideo", required: true }, 
 fileUrls: [{ type: String, required: true }],
  submittedAt: { type: Date, default: Date.now },
  isSubmitted: { type: Boolean, default: true }
});

export default mongoose.model("Assignment", assignmentSchema);
