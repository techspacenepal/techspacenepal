// import multer from "multer";
// import path from "path";
// import EnrolledCourse from "../models/enrolledCourses.js";
// import Student from "../models/student.js";
// import mongoose from "mongoose";
// // 🔸 Multer को Storage configuration (Image कंहा र कुन नाममा save गर्ने)
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // फाइल uploads/ फोल्डरमा जान्छ
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname); // file को extension निकाल्ने
//     const filename = `${Date.now()}-${file.fieldname}${ext}`; // युनिक नाम बनाउने
//     cb(null, filename);
//   },
// });
// // 🔸 केवल image फाइल मात्र स्वीकार गर्ने filter
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) cb(null, true);
//   else cb(new Error("❌ Only image files are allowed"), false); // error फ्याँक्ने
// };
// // Multer middleware export गर्ने
// export const upload = multer({ storage, fileFilter });
// // 🔸 नयाँ Enrolled Course सिर्जना गर्ने
// // export const createEnrolledCourse = async (req, res) => {
// //   try {
// //     const { studentId, teacherId, courseId, instructor, description } = req.body;

// //     // सबै आवश्यक fields validate गर्ने
// //     if (!studentId || !teacherId || !courseId || !instructor) {
// //       return res.status(400).json({ message: "Missing required fields." });
// //     }

// //     // नयाँ enrollment बनाउने
// //     const newEnrollment = await EnrolledCourse.create({
// //       studentId,
// //       teacherId,
// //       courseId,
// //       instructor,
// //       description,
// //     });

// //     // सफल भएमा प्रतिक्रिया पठाउने
// //     res.status(201).json(newEnrollment);
// //   } catch (error) {
// //     console.error("❌ Error creating enrolled course:", error);
// //     res.status(500).json({ message: "Internal server error", error: error.message });
// //   }
// // };
// export const createEnrolledCourse = async (req, res) => {
//   const { studentId, courseId } = req.body;

//   try {
//     const student = await Student.findById(studentId);
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     // Check if any student with same email is already enrolled in the same course
//     const existingEnrollment = await EnrolledCourse.findOne({ courseId })
//       .populate("studentId");

//     if (
//       existingEnrollment &&
//       existingEnrollment.studentId?.email === student.email
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Student with this email is already enrolled in this course." });
//     }

//     // Create enrollment
//     const newEnroll = new EnrolledCourse(req.body);
//     await newEnroll.save();

//     res.status(201).json(newEnroll);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
// // 🔸 एक जना विद्यार्थीले कुन-कुन course मा enroll गरेका छन् भन्ने ल्याउने
// export const getEnrolledCoursesByStudent = async (req, res) => {
//   try {
//     const studentId = req.params.studentId;
    
//     // EnrolledCourse बाट studentId अनुसार data निकाल्ने, साथै courseId populate गर्ने
//     const courses = await EnrolledCourse.find({ studentId }).populate("courseId");

//     res.status(200).json(courses);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch student's enrolled courses" });
//   }
// };
// // 🔸 सबै enrolled courses ल्याउने (admin/view purpose का लागि उपयोगी)
// export const getAllEnrolledCourses = async (req, res) => {
//   try {
//     const enrolled = await EnrolledCourse.find().populate("courseId");
//     res.status(200).json(enrolled);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch enrolled courses" });
//   }
// };
// // 🔸 एकल enrolled course को जानकारी ID अनुसार ल्याउने
// export const getEnrolledCourseById = async (req, res) => {
//   try {
//     const course = await EnrolledCourse.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     res.status(200).json(course);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// // 🔸 कुनै एउटा course मा कुन-कुन विद्यार्थी enrolled छन् भन्ने पत्ता लगाउने
// export const getStudentsByCourseId = async (req, res) => {
//   const { courseId } = req.params;

//   if (!courseId) {
//     return res.status(400).json({ message: "Course ID required" });
//   }

//   try {
//     // courseId अनुसार सबै विद्यार्थीहरू ल्याउने र studentId बाट नाम/इमेल मात्र देखाउने
//     const students = await EnrolledCourse.find({ courseId })
//       .populate("studentId", "username email")
//       .exec();

//     // फारम्याट मिलाएर पठाउने
//     const formatted = students.map((enroll) => ({
//       studentId: enroll.studentId._id,
//       name: enroll.studentId.username,
//       email: enroll.studentId.email,
//       enrolledDate: enroll.enrolledDate,
//     }));

//     res.status(200).json(formatted);
//   } catch (err) {
//     console.error("❌ Failed to get enrolled students", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// // 🔸 शिक्षक अनुसार एउटै course मा enrolled विद्यार्थीहरूको सूची ल्याउने
// export const getCourseStudentsByTeacher = async (req, res) => {
//   const { courseId } = req.params;
//   const { teacherId } = req.query;

//   // teacherId अनिवार्य छ
//   if (!teacherId) {
//     return res.status(400).json({ message: "Teacher ID is required" });
//   }

//   try {
//     // एउटै course र teacher अनुसार enrolled विद्यार्थी खोज्ने
//     const enrolledStudents = await EnrolledCourse.find({
//       courseId,
//       teacherId,
//     }).populate("studentId", "username email");

//     // studentId बाट नाम/ईमेल मात्र पठाउने
//     const students = enrolledStudents.map((enrollment) => enrollment.studentId);

//     res.json(students);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const getStudentCountByCourseAndTeacher = async (req, res) => {
//   const { courseId } = req.params;
//   const { teacherId } = req.query;

//   try {
//     const filter = { courseId };
//     if (teacherId) filter.teacherId = teacherId;

//     const count = await EnrolledCourse.countDocuments(filter); // ✅ direct count
//     res.status(200).json({ studentCount: count });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const getCoursesByTeacherIdFromEnrollments = async (req, res) => {
//   try {
//     const { teacherId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(teacherId)) {
//       return res.status(400).json({ message: "Invalid teacher ID" });
//     }

//     const enrollments = await EnrolledCourse.find({ teacherId })
//       .populate("courseId") // Populate full course info
//       .populate("studentId"); // Optional: populate student if needed

//     const courseMap = new Map(); // To avoid duplicates

//     enrollments.forEach((enroll) => {
//       const courseId = enroll.courseId?._id?.toString();
//       if (!courseId) return;

//       if (!courseMap.has(courseId)) {
//         courseMap.set(courseId, {
//           courseId: enroll.courseId,
//           studentCount: 1,
//         });
//       } else {
//         courseMap.get(courseId).studentCount += 1;
//       }
//     });

//     const result = Array.from(courseMap.values());

//     res.json(result);
//   } catch (error) {
//     console.error("❌ Error in getCoursesByTeacherIdFromEnrollments:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// // enrolledCourseController.js
// export const getStudentsByTeacher = async (req, res) => {
//   try {
//     const { teacherId } = req.params;

//     const enrolled = await EnrolledCourse.find({ teacherId })
//       .populate("studentId", "name email username")
//       .populate("courseId", "title"); // this is important!

//     res.json(enrolled);
//   } catch (error) {
//     console.error("Error fetching enrolled students:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// export const getStudentsByTeacherWithProgress = async (req, res) => {
//   const { teacherId } = req.params;

//   if (!teacherId) {
//     return res.status(400).json({ message: "Teacher ID required" });
//   }

//   try {
//     const enrollments = await EnrolledCourse.find({ teacherId })
//       .populate("studentId", "username email avatarUrl") // populate student info (adjust fields)
//       .populate("courseId", "title"); // optional: populate course info if needed

//     const students = enrollments.map((enroll) => ({
//       id: enroll.studentId._id,
//       name: enroll.studentId.username,
//       email: enroll.studentId.email,
//       avatar: enroll.studentId.avatarUrl || "",
//       progress: enroll.progress || 0,
//       courseTitle: enroll.courseId?.title || "",
//     }));

//     res.status(200).json(students);
//   } catch (err) {
//     console.error("Error fetching students by teacher:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



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







export const updateProgress = async (req, res) => {
  try {
    const { id } = req.params; // enrollment ID
    const { progress } = req.body;

    const enrolled = await EnrolledCourse.findById(id);
    if (!enrolled) return res.status(404).json({ message: "Enrollment not found" });

    // If progress > 0 and no startDate yet, set it
    if (progress > 0 && !enrolled.startDate) {
      enrolled.startDate = new Date();
    }

    enrolled.progress = progress;
    await enrolled.save();

    res.json({ message: "Progress updated", enrolled });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




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
