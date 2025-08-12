import mongoose from "mongoose";

const enrolledCourseSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    instructor: { type: String, required: true },
    description: { type: String },
    enrolledDate: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    startDate: { type: Date, default: null },
    certificateUrl: { type: String, default: null },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    assignmentCompleted: { type: Boolean, default: false }, // Add this if missing
    grade: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("EnrolledCourse", enrolledCourseSchema);
