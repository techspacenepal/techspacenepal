import mongoose from 'mongoose';
import TeacherCourse from '../models/TeacherCourse.js';
import EnrolledCourse from "../models/enrolledCourses.js";
import Course from "../models/Course.js";
import CourseVideo from "../models/CourseVideo.js"; 

// 🔸 शिक्षकद्वारा course सिर्जना गर्ने
export const createTeacherCourse = async (req, res) => {
  try {
    const { teacherId, name, description, courseId } = req.body;

    // सबै आवश्यक field check गर्ने
    if (!teacherId || !name || !description || !courseId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // नयाँ teacher course बनाउने
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

// 🔸 सबै शिक्षकको course हरु ल्याउने (populate गरेर)
export const getAllTeacherCourses = async (req, res) => {
  try {
    const courses = await TeacherCourse.find()
      .populate('teacherId', 'username email') // शिक्षकको नाम र इमेल
      .populate('courseId'); // कोर्सको पूर्ण विवरण

    res.status(200).json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};

// 🔸 शिक्षकको course delete गर्ने
export const deleteTeacherCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the course
    await TeacherCourse.findByIdAndDelete(id);

    // Also delete enrolledCourses related to this course
    await EnrolledCourse.deleteMany({ courseId: id });

    res.status(200).json({ message: 'Course and enrollments deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete course' });
  }
};


// 🔸 कुनै शिक्षकले बनाएका सबै course हरु ल्याउने
export const getCoursesByTeacher = async (req, res) => {
  const { teacherId } = req.params;
  console.log("👉 Teacher ID:", teacherId); // debugging

  if (!teacherId) {
    return res.status(400).json({ success: false, message: "No teacherId provided in URL" });
  }

  try {
    const courses = await TeacherCourse.find({ teacherId })
      .populate("courseId") // course को full जानकारी
      .exec();

    res.json(courses);
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🔸 शिक्षकको हरेक course मा कति विद्यार्थी enrolled छन् भन्ने संख्या ल्याउने
export const getTeacherCourseWithStudentCount = async (req, res) => {
  const { teacherId } = req.params;

  // ObjectId valid छ कि छैन भन्ने जाँच
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
          _id: "$courseId", // course अनुसार grouping
          studentCount: { $sum: 1 }, // विद्यार्थी संख्या
        },
      },
      {
        $lookup: {
          from: "courses", // MongoDB collection name
          localField: "_id",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" }, // array हटाएर object बनाउने
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


// GET students by teacherId and courseId
export const getStudentsByTeacherAndCourse = async (req, res) => {
  const { teacherId, courseId } = req.params;

  try {
    const enrollments = await EnrolledCourse.find({ teacherId, courseId })
      .populate("studentId", "username email");

    const students = enrollments.map(e => ({
      studentId: e.studentId._id,
      name: e.studentId.username,
      email: e.studentId.email,
      enrolledDate: e.createdAt,
    }));

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};





// Total unique students per teacher
export const getTotalStudentsByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const enrolled = await EnrolledCourse.find({ teacherId }).populate("studentId");

    // ✅ Use Set to count unique students only
    const uniqueStudentIds = new Set(enrolled.map(e => e.studentId.toString()));
    
    res.json({ totalStudents: uniqueStudentIds.size });
  } catch (error) {
    console.error("❌ Error getting total students by teacher:", error);
    res.status(500).json({ message: "Server Error" });
  }
};







export const publishTeacherCourse = async (req, res) => {
  const { teacherId, courseId } = req.params;

  // 👉 Debugging logs
  console.log("📥 Publish Route Hit!");
  console.log("🔍 teacherId:", teacherId);
  console.log("🔍 courseId:", courseId);
  console.log("🧪 teacherId typeof:", typeof teacherId);
  console.log("🧪 courseId typeof:", typeof courseId);

  try {
    const record = await TeacherCourse.findOne({
      teacherId: new mongoose.Types.ObjectId(teacherId),
      courseId: new mongoose.Types.ObjectId(courseId),
    });

    console.log("🔎 Found record:", record);

    if (!record) {
      return res.status(404).json({ message: "❌ Teacher-course not found." });
    }

    record.status = "published";
    await record.save();

    console.log("✅ Course status updated to 'published'");
    res.json({ message: "✅ Course published for teacher.", course: record });
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




export const getTeacherCourseDetails = async (req, res) => {
  const { teacherId, courseId } = req.params;

  try {
    const course = await TeacherCourse.findOne({ teacherId, courseId }).populate("courseId");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
    title: course.courseId?.title || "Untitled",
      description: course.description,
      status: course.status,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};





// ✅ Controller Function: Get teacher courses with student count
// export const getTeacherCoursesWithEnrollments = async (req, res) => {
//   try {
//     const { teacherId } = req.params;

//     const enrollments = await TeacherCourse.find({ teacherId })
//       .populate("courseId")
//       .populate("students") // optional
//       .lean();

//     const result = enrollments.map((course) => ({
//       courseId: course.courseId._id,
//       title: course.courseId.title,
//       image: course.courseId.image,
//       studentCount: course.students?.length || 0,
//       status: course.status, // ✅ यहींबाट सही status जान्छ
//       students: course.students, // optional if needed
//     }));

//     res.json(result);
//   } catch (err) {
//     console.error("❌ Error fetching enrollments:", err);
//     res.status(500).json({ message: "Failed to load enrollments" });
//   }
// };





export const getTeacherCoursesWithEnrollments = async (req, res) => {
  const { teacherId } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(teacherId)) {
    return res.status(400).json({ message: "Invalid teacherId" });
  }

  try {
    // Step 1: Get all teacherCourse records
    const teacherCourses = await TeacherCourse.find({ teacherId })
      .populate("courseId")
      .lean();

    // Step 2: Get student counts from EnrolledCourse
    const counts = await EnrolledCourse.aggregate([
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
    ]);

    // Convert count array to a lookup map for easy access
    const countMap = {};
    counts.forEach((c) => {
      countMap[c._id.toString()] = c.studentCount;
    });

    // Step 3: Merge teacherCourse data with student counts
    const result = teacherCourses.map((course) => {
      const courseIdStr = course.courseId?._id?.toString();
      return {
        courseId: courseIdStr,
        title: course.courseId?.title || "Untitled",
        image: course.courseId?.image || null,
        status: course.status || "draft",
        studentCount: countMap[courseIdStr] || 0,
      };
    });

    res.json(result);
  } catch (err) {
    console.error("❌ Error fetching combined course data:", err);
    res.status(500).json({ message: "Failed to load courses with enrollments" });
  }
};

export const getVideosByCourseAndTeacher = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { teacherId } = req.query;

    if (!teacherId) {
      return res.status(400).json({ message: "Missing teacherId" });
    }

    // Video fetching from CourseVideo collection
    const videos = await CourseVideo.find({ courseId, teacherId });

    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: "No videos found for this course and teacher." });
    }

    res.json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ message: "Error fetching videos", error: err.message });
  }
};

