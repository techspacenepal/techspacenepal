import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  category: String,
  duration: String,
  coursesdescription: String,
  description: String,
  courseoverview: String,
  image: String,
  syllabus: [
    {
      title: String,
      content: String,
    },
  ],
  faq: [
    {
      title: String,
      content: String,
    },
  ],
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
