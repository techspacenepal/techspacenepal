// models/TeacherCourse.js
import mongoose from 'mongoose';

const teacherCourseSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // ✅ add this
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const TeacherCourse = mongoose.model('TeacherCourse', teacherCourseSchema);
export default TeacherCourse;
