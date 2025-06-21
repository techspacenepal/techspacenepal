// // import mongoose from "mongoose";

// // const enrolledCourseSchema = new mongoose.Schema({

// //   name: String,
// //   instructor: String,
// //   description: String,
// //   thumbnail: String,
// //   progress: {
// //     type: Number,
// //     default: 0
// //   },
// //   grade: {
// //     type: String,
// //     default: null
// //   },
// //   modules: [
// //     {
// //       id: String,
// //       title: String,
// //       content: String,
// //     }
// //   ]
// // });

// // export default mongoose.models.EnrolledCourse || mongoose.model("EnrolledCourse", enrolledCourseSchema);

// // import mongoose from "mongoose";

// // const { Schema, model, models } = mongoose;

// // const enrolledCourseSchema = new Schema(
// //   {
// //     studentId: {
// //       type: Schema.Types.ObjectId,
// //       ref: "Student",
// //       required: true,
// //     },
// //     // courseId: {
// //     //   type: Schema.Types.ObjectId,
// //     //   ref: "Course",
// //     //   required: true,
// //     // },
// //     // Course details (optional: if you want to embed course info here)
// //     name: String,
// //     instructor: String,
// //     description: String,
// //     thumbnail: String,
// //     progress: {
// //       type: Number,
// //       default: 0,
// //     },
// //     grade: {
// //       type: String,
// //       default: null,
// //     },
// //     modules: [
// //       {
// //         id: String,
// //         title: String,
// //         content: String,
// //       },
// //     ],
// //   },
// //   { timestamps: true }
// // );

// // export default models.EnrolledCourse || model("EnrolledCourse", enrolledCourseSchema);
// // models/EnrolledCourse.js

// import mongoose from "mongoose";

// const enrolledCourseSchema = new mongoose.Schema(
//   {
//     studentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Student",
//       required: true,
//     },
//     courseId: {
//       name: String,
//       instructor: String,
//       description: String,
//       thumbnail: String,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     instructor: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     thumbnail: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("EnrolledCourse", enrolledCourseSchema);




import mongoose from "mongoose";

const enrolledCourseSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

const EnrolledCourse = mongoose.model("EnrolledCourse", enrolledCourseSchema);
export default EnrolledCourse;
