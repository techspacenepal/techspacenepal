
import mongoose from "mongoose";

const studentNotificationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["student_notification"],
    default: "student_notification",
  },
  seenBy: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

const StudentNotification = mongoose.models.StudentNotification || mongoose.model("StudentNotification", studentNotificationSchema);

export default StudentNotification;

