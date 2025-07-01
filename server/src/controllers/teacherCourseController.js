// src/controllers/teacherCourseController.js
// import TeacherCourse from '../models/TeacherCourse.js';

// export const createTeacherCourse = async (req, res) => {
//   try {
//     console.log("🔥 Request body:", req.body);
//     console.log("🖼 File info:", req.file);

//     const { teacherId, name, description } = req.body;
//     const thumbnail = req.file ? req.file.filename : null;

//     if (!teacherId || !name || !description) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const newCourse = new TeacherCourse({
//       teacherId,
//       name,
//       description,
//       thumbnail,
//     });

//     await newCourse.save();

//     res.status(201).json({ message: 'Course created successfully', course: newCourse });
//   } catch (error) {
//     console.error('❌ Create course error:', error);
//     res.status(500).json({ message: 'Failed to create course' });
//   }
// };
// export const getAllTeacherCourses = async (req, res) => {
//   try {
//     const courses = await TeacherCourse.find().sort({ createdAt: -1 }); // सबै courses, नयाँ देखि पुरानो
//     res.status(200).json({ success: true, courses });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to fetch courses' });
//   }
// };


import mongoose from 'mongoose';

import TeacherCourse from '../models/TeacherCourse.js';
import EnrolledCourse from "../models/enrolledCourses.js";







export const createTeacherCourse = async (req, res) => {
  try {
    const { teacherId, name, description, courseId } = req.body;

    if (!teacherId || !name || !description || !courseId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newCourse = await TeacherCourse.create({
      teacherId,
      name,
      description,
      courseId,
    });

    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllTeacherCourses = async (req, res) => {
  try {
    const courses = await TeacherCourse.find()
      .populate('teacherId', 'username email') // 👈 Populate teacher info
      .populate('courseId'); // 👈 Populate course info
    res.status(200).json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};


export const deleteTeacherCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await TeacherCourse.findByIdAndDelete(id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete course' });
  }
};

// teacherId अनुसार courses ल्याउने function
export const getCoursesByTeacher = async (req, res) => {
  const { teacherId } = req.params;
  console.log("👉 Teacher ID:", teacherId); // ← this prints undefined now

  if (!teacherId) {
    return res.status(400).json({ success: false, message: "No teacherId provided in URL" });
  }

  try {
    const courses = await TeacherCourse.find({ teacherId })
      .populate("courseId")
      .exec();
    res.json(courses);
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};






// GET: Courses assigned to a teacher + enrolled student count per course
export const getTeacherCourseWithStudentCount = async (req, res) => {
  const { teacherId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    return res.status(400).json({ message: "Invalid teacherId" });
  }

  try {
    const result = await EnrolledCourse.aggregate([
      {
        $match: {
          teacherId: new mongoose.Types.ObjectId(teacherId),
        },
      },
      {
        $group: {
          _id: "$courseId",
          studentCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "courses", // 👈 MongoDB collection name (usually plural of your model)
          localField: "_id",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" },
      {
        $project: {
          courseId: "$_id",
          studentCount: 1,
          title: "$courseDetails.title",
          image: "$courseDetails.image",
          status: "$courseDetails.status",
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error fetching teacher course stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};