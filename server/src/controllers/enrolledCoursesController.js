import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import EnrolledCourse from "../models/enrolledCourses.js";
import Student from "../models/student.js";


import fs from 'fs';

import PDFDocument from 'pdfkit';

const CERT_DIR = path.join('public', 'certificates');
if (!fs.existsSync(CERT_DIR)) fs.mkdirSync(CERT_DIR, { recursive: true });
// ----------------- Multer Config -----------------

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("❌ Only image files are allowed"), false);
};

export const upload = multer({ storage, fileFilter });

// ----------------- Enrolled Course Controllers -----------------

// Create a new enrollment
export const createEnrolledCourse = async (req, res) => {
  try {
    const { studentId, courseId, teacherId, instructor, description } = req.body;

    if (!studentId || !courseId || !teacherId || !instructor) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Check duplicate enrollment by student email and courseId
    const duplicate = await EnrolledCourse.findOne({ courseId })
      .populate("studentId", "email");
    if (duplicate && duplicate.studentId.email === student.email) {
      return res.status(400).json({ message: "Student already enrolled in this course." });
    }

    const newEnrollment = await EnrolledCourse.create({
      studentId,
      courseId,
      teacherId,
      instructor,
      description,
    });

    res.status(201).json(newEnrollment);
  } catch (error) {
    console.error("❌ Error creating enrollment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all enrolled courses (admin use)
export const getAllEnrolledCourses = async (req, res) => {
  try {
    const enrolled = await EnrolledCourse.find().populate("courseId");
    res.status(200).json(enrolled);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrolled courses" });
  }
};

// Get courses a student is enrolled in
export const getEnrolledCoursesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const courses = await EnrolledCourse.find({ studentId }).populate("courseId");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student's enrolled courses" });
  }
};




// export const getEnrolledCoursesByStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     const enrollments = await EnrolledCourse.find({ studentId })
//       .populate({
//         path: "courseId",
//         select: "title status", // course को title र status मात्रै ल्याउने
//       })
//       .lean();

//     // ✅ केवल published course मात्र पठाउने
//     const filtered = enrollments.filter(
//       (e) => e.courseId && e.courseId.status === "published"
//     );

//     res.status(200).json(filtered);
//   } catch (error) {
//     console.error("❌ Error fetching enrolled courses by student:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };



// Get enrolled students by course ID (returns student basic info)
export const getStudentsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) return res.status(400).json({ message: "Course ID required" });

    const enrolled = await EnrolledCourse.find({ courseId })
      .populate("studentId", "username email");

    const students = enrolled.map((e) => ({
      studentId: e.studentId._id,
      name: e.studentId.username,
      email: e.studentId.email,
      enrolledDate: e.enrolledDate,
    }));

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students by course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get students enrolled in a specific course AND teacher
export const getCourseStudentsByTeacher = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { teacherId } = req.query;

    if (!teacherId) return res.status(400).json({ message: "Teacher ID required" });

    const enrolled = await EnrolledCourse.find({ courseId, teacherId })
      .populate("studentId", "username email");

    const students = enrolled.map((e) => e.studentId);

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students by course & teacher:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Count students by course and teacher
export const getStudentCountByCourseAndTeacher = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { teacherId } = req.query;

    const filter = { courseId };
    if (teacherId) filter.teacherId = teacherId;

    const count = await EnrolledCourse.countDocuments(filter);
    res.status(200).json({ studentCount: count });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all courses assigned to a teacher with student counts (no duplicates)
export const getCoursesByTeacherIdFromEnrollments = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: "Invalid teacher ID" });
    }

    const enrollments = await EnrolledCourse.find({ teacherId })
      .populate("courseId");

    // Map courseId => { courseId, studentCount }
    const courseMap = new Map();

    enrollments.forEach(({ courseId }) => {
      if (!courseId?._id) return;
      const key = courseId._id.toString();

      if (!courseMap.has(key)) {
        courseMap.set(key, {
          courseId: courseId._id,
          title: courseId.title,
          studentCount: 1,
        });
      } else {
        courseMap.get(key).studentCount += 1;
      }
    });

    res.status(200).json(Array.from(courseMap.values()));
  } catch (error) {
    console.error("Error fetching courses by teacher:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get students by teacher with progress and course info
export const getStudentsByTeacherWithProgress = async (req, res) => {
  try {
    const { teacherId } = req.params;

    if (!teacherId) return res.status(400).json({ message: "Teacher ID required" });

    const enrollments = await EnrolledCourse.find({ teacherId })
      .populate("studentId", "username email avatarUrl")
      .populate("courseId", "title");

    const students = enrollments.map((enroll) => ({
      id: enroll.studentId._id,
      name: enroll.studentId.username,
      email: enroll.studentId.email,
      avatar: enroll.studentId.avatarUrl || "",
      progress: enroll.progress || 0,
      courseTitle: enroll.courseId?.title || "",
    }));

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students with progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEnrolledCoursesByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const enrollments = await EnrolledCourse.find({ teacherId })
      .populate("courseId", "title")   // course को title मात्र populate गर्ने
      .populate("studentId", "username email");

    res.json(enrollments);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const getCoursesByTeacherIdFromEnrollments = async (req, res) => {
//   try {
//     const { teacherId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(teacherId)) {
//       return res.status(400).json({ message: "Invalid teacher ID" });
//     }

//     const enrollments = await EnrolledCourse.find({ teacherId })
//       .populate("courseId");

//     // Map courseId => { courseId, studentCount }
//     const courseMap = new Map();

//     enrollments.forEach(({ courseId }) => {
//       if (!courseId?._id) return;
//       const key = courseId._id.toString();

//       if (!courseMap.has(key)) {
//         courseMap.set(key, {
//           courseId: courseId._id,
//           title: courseId.title,
//           studentCount: 1,
//         });
//       } else {
//         courseMap.get(key).studentCount += 1;
//       }
//     });

//     res.status(200).json(Array.from(courseMap.values()));
//   } catch (error) {
//     console.error("Error fetching courses by teacher:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };







// export const updateProgress = async (req, res) => {
//   try {
//     const { id } = req.params; // enrollment ID
//     const { progress } = req.body;

//     const enrolled = await EnrolledCourse.findById(id);
//     if (!enrolled) return res.status(404).json({ message: "Enrollment not found" });

//     // If progress > 0 and no startDate yet, set it
//     if (progress > 0 && !enrolled.startDate) {
//       enrolled.startDate = new Date();
//     }

//     enrolled.progress = progress;
//     await enrolled.save();

//     res.json({ message: "Progress updated", enrolled });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };




export const markVideoWatched = async (req, res) => {
  const { id } = req.params;
  const { videoProgress } = req.body;

  try {
    const enrolled = await EnrolledCourse.findById(id).populate('studentId courseId');
    if (!enrolled) return res.status(404).json({ message: 'Not found' });

    if (!enrolled.startDate) enrolled.startDate = new Date();
    enrolled.progress = Math.min(enrolled.progress + videoProgress, 100);

    if (enrolled.progress === 100 && !enrolled.certificateUrl) {
      const certPath = path.join(CERT_DIR, `${id}.pdf`);
      const certUrl = `/certificates/${id}.pdf`;
      await generateCertificate(enrolled.studentId.name, enrolled.courseId.title, certPath);
      enrolled.certificateUrl = certUrl;
    }

    await enrolled.save();
    res.json({ message: 'Video progress updated', enrolled });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Similar to video logic
export const markQuizPassed = async (req, res) => {
  const { id } = req.params;
  const { quizScore } = req.body; // e.g. +20 progress

  try {
    const enrolled = await EnrolledCourse.findById(id);
    if (!enrolled) return res.status(404).json({ message: "Enrollment not found" });

    if (!enrolled.startDate) enrolled.startDate = new Date();

    enrolled.progress = Math.min(enrolled.progress + quizScore, 100);

    if (enrolled.progress === 100 && !enrolled.certificateUrl) {
      enrolled.certificateUrl = `http://localhost:5000/certificates/${id}.pdf`;
    }

    await enrolled.save();
    res.json({ message: "Quiz score updated", enrolled });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const generateCertificate = async (studentName, courseTitle, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    doc
      .fontSize(24)
      .text('🎓 Certificate of Completion', { align: 'center' })
      .moveDown(2);

    doc
      .fontSize(18)
      .text(`This is to certify that`, { align: 'center' })
      .moveDown(1);

    doc
      .fontSize(22)
      .fillColor('blue')
      .text(studentName, { align: 'center' })
      .fillColor('black')
      .moveDown(1);

    doc
      .fontSize(18)
      .text(`has successfully completed the course`, { align: 'center' })
      .moveDown(1);

    doc
      .fontSize(20)
      .text(`"${courseTitle}"`, { align: 'center', italic: true })
      .moveDown(2);

    doc
      .fontSize(14)
      .text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });

    doc.end();
    resolve(true);
  });
};








// ✅ Publish all enrolledCourses for a specific teacher and course
export const publishEnrolledCourse = async (req, res) => {
  const { teacherId, courseId } = req.params;


  // 👉 Debugging logs
  console.log("📥 Publish Route Hit!");
  console.log("🔍 teacherId:", teacherId);
  console.log("🔍 courseId:", courseId);
  console.log("🧪 teacherId typeof:", typeof teacherId);
  console.log("🧪 courseId typeof:", typeof courseId);

  if (!teacherId || !courseId) {
    return res.status(400).json({ message: "Teacher ID and Course ID required." });
  }

    console.log("🔎 Found record:", record);

  try {
    const result = await EnrolledCourse.updateMany(
      { teacherId, courseId },
      { $set: { status: "published" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "No enrolled courses found to publish." });
    }

    res.status(200).json({ message: "✅ Enrolled course(s) published.", result });
  } catch (error) {
    console.error("❌ Publish error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// ✅ Fetch enrollment by courseId and studentId (for student video access)
export const getEnrollmentByCourseAndStudent = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;

    const enrollment = await EnrolledCourse.findOne({ courseId, studentId });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment फेला परेन" });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    console.error("❌ Enrollment fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const updateProgress = async (req, res) => {
  const { studentId, courseId } = req.params;
  const { progress } = req.body;

  try {
    const enrollment = await EnrolledCourse.findOne({ studentId, courseId });
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    enrollment.progress = progress;
    await enrollment.save();

    res.status(200).json({ message: "Progress updated", progress: enrollment.progress });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};