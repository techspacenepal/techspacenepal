import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", NotificationSchema);
