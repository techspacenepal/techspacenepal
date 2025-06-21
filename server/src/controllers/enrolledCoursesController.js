
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



export const createEnrolledCourse = async (req, res) => {
  try {
    const { studentId, name, instructor, description } = req.body;

    const course = new EnrolledCourse({
      studentId,
      name,
      instructor,
      description,
      thumbnail: req.file ? req.file.filename : null,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getEnrolledCoursesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const courses = await EnrolledCourse.find({ studentId });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No enrolled courses found." });
    }

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};




export const getAllEnrolledCourses = async (req, res) => {
  try {
    const courses = await EnrolledCourse.find().populate("studentId");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




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