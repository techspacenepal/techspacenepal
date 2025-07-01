
import multer from "multer";
import path from "path";
import EnrolledCourse from "../models/enrolledCourses.js";

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // uploads folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("❌ Only image files are allowed"), false);
};

export const upload = multer({ storage, fileFilter });

// Controller function
// export const addEnrolledCourse = async (req, res) => {
//   try {
//     // पहिले req.body बाट सबै variable लिने
//     const { studentId, name, instructor, description } = req.body;

//     // studentId.trim() यो यहाँ राख्ने, studentId define भइसकेपछि मात्र
//     const studentIdTrimmed = studentId.trim();

//     const thumbnail = req.file ? req.file.filename : "";


//       if (!mongoose.Types.ObjectId.isValid(studentId)) {
//       return res.status(400).json({ message: "Invalid student ID." });
//     }
    
//     // नयाँ document create गर्दा trim गरेको studentId प्रयोग गर्ने
//     const course = new EnrolledCourse({
//       studentId: new mongoose.Types.ObjectId(studentId),
//       name,
//       instructor,
//       description,
//       thumbnail,
//     });

//     await course.save();

//     res.status(201).json({ message: "Course added successfully!", course });
//   } catch (error) {
//     console.error("❌ Add course error:", error);
//     res.status(500).json({ message: error.message || "Server Error" });
//   }
// };


// export const getEnrolledCoursesByStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(studentId)) {
//       return res.status(400).json({ message: "Invalid student ID format." });
//     }

//     const courses = await EnrolledCourse.find({
//       studentId: new mongoose.Types.ObjectId(studentId),
//     });

//     res.status(200).json(courses);
//   } catch (error) {
//     console.error("Error fetching courses:", error);
//     res.status(500).json({ message: "Failed to fetch courses" });
//   }
// };



// export const createEnrolledCourse = async (req, res) => {
//   try {
//     const { studentId, teacherId, courseId, instructor, description } = req.body;

//     if (!studentId || !teacherId || !courseId || !instructor || !description) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const newCourse = new EnrolledCourse({
//       studentId,
//       teacherId,
//       courseId,
//       instructor,
//       description,
//       // thumbnail: req.file ? req.file.filename : null,
//     });

//     await newCourse.save();
//     res.status(201).json({ message: "✅ Course enrolled successfully", course: newCourse });
//   } catch (error) {
//     console.error("❌ Error creating course:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export const createEnrolledCourse = async (req, res) => {
//   try {
//     const newEnrolledCourse = new EnrolledCourse({
//       studentId: req.body.studentId,
//       teacherId: req.body.teacherId,
//       courseId: req.body.courseId,
//       instructor: req.body.instructor,
//       description: req.body.description,
//       // enrolledDate: automatic because of default
//     });

//     const saved = await newEnrolledCourse.save();
//     res.status(201).json(saved);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to enroll course", error });
//   }
// };


// export const getEnrolledCoursesByStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     const courses = await EnrolledCourse.find({ studentId });

//     if (!courses || courses.length === 0) {
//       return res.status(404).json({ message: "No enrolled courses found." });
//     }

//     res.status(200).json(courses);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };




// export const getAllEnrolledCourses = async (req, res) => {
//   try {
//     const courses = await EnrolledCourse.find().populate("studentId");
//     res.status(200).json(courses);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



export const createEnrolledCourse = async (req, res) => {
  try {
    const { studentId, teacherId, courseId, instructor, description } = req.body;

    // Validate required fields
    if (!studentId || !teacherId || !courseId || !instructor) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newEnrollment = await EnrolledCourse.create({
      studentId,
      teacherId,
      courseId,
      instructor,
      description,
    });

    res.status(201).json(newEnrollment);
  } catch (error) {
    console.error("❌ Error creating enrolled course:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const getEnrolledCoursesByStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const courses = await EnrolledCourse.find({ studentId }).populate("courseId");
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch student's enrolled courses" });
  }
};



export const getAllEnrolledCourses = async (req, res) => {
  try {
    const enrolled = await EnrolledCourse.find().populate("courseId");
    res.status(200).json(enrolled);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enrolled courses" });
  }
};


// export const getAllEnrolledCourses = async (req, res) => {
//   try {
//     const courses = await EnrolledCourse.find()
//       .populate("studentId")
//       .populate("teacherId")
//       .populate("courseId"); // ✅ thumbnail ल्याउन यो आवश्यक

//     res.status(200).json(courses);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };




// Get single course
export const getEnrolledCourseById = async (req, res) => {
  try {
    const course = await EnrolledCourse.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};