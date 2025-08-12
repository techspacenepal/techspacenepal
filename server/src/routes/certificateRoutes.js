
// import express from "express";
// import path from "path";
// import fs from "fs";
// import { generateCertificatePDF } from "../controllers/generateCertificatePDF.js";
// import { generateCertificate } from "../controllers/generateCertificate.js";

// const router = express.Router();

// // ✅ POST - generate certificate manually (already done)
// router.post("/generate", async (req, res) => {
//   const { studentName, courseTitle } = req.body;
//   const fileName = `${studentName}_${Date.now()}.pdf`;
//   const certPath = path.join(process.cwd(), "public", "certificates", fileName);

//   if (!fs.existsSync(path.dirname(certPath))) {
//     fs.mkdirSync(path.dirname(certPath), { recursive: true });
//   }

//   await generateCertificatePDF(studentName, courseTitle, certPath);

//   res.status(200).json({
//     success: true,
//     link: `/certificates/${fileName}`,
//   });
// });

// // ✅ NEW: GET - generate by studentId & courseId (dynamic)
// // router.get("/:studentId/:courseId", async (req, res, next) => {
// //   try {
// //     const { studentId, courseId } = req.params;

// //     const enrollment = await EnrolledCourse.findOne({ studentId, courseId })
// //       .populate("studentId")
// //       .populate("courseId");

// //     if (!enrollment || enrollment.progress < 100) {
// //       return res.status(400).json({ message: "Course not completed yet" });
// //     }

// //     const studentName = enrollment.studentId.username;
// //     const courseTitle = enrollment.courseId.title;

// //     const certFolder = path.resolve("server/public/certificates");
// //     const certPath = path.join(certFolder, `${studentId}_${courseId}.pdf`);

// //     if (!fs.existsSync(certFolder)) {
// //       fs.mkdirSync(certFolder, { recursive: true });
// //     }

// //     await generateCertificatePDF(studentName, courseTitle, certPath);

// //     // सिधै PDF file पठाउने (download गराउन)
// //     res.download(certPath, `${studentName}_certificate.pdf`, (err) => {
// //       if (err) return next(err);
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // });

// router.get("/:studentId/:courseId", generateCertificate);

// export default router;






import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { generateCertificatePDF } from "../controllers/generateCertificatePDF.js";
import { generateCertificate } from "../controllers/generateCertificate.js";
import Student from "../models/student.js";
import Course from "../models/Course.js";


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}, "_id username");
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

// GET courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({}, "_id title");
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch courses" });
  }
});

// POST generate certificate
// router.post("/generate", async (req, res) => {
//   const { studentName, courseTitle, description, grade } = req.body;
//   const fileName = `${studentName}_${Date.now()}.pdf`;
//   const certPath = path.join(process.cwd(), "public", "certificates", fileName);

//   if (!fs.existsSync(path.dirname(certPath))) {
//     fs.mkdirSync(path.dirname(certPath), { recursive: true });
//   }

//   await generateCertificatePDF(studentName, courseTitle, certPath, description);

//   res.status(200).json({
//     success: true,
//     link: `/certificates/${fileName}`,
//   });
// });


// Update this route:
router.post("/generate", async (req, res) => {
  const { studentName, courseTitle, description, grade } = req.body;

  const fileName = `${studentName}_${Date.now()}.pdf`;
  const certPath = path.join(process.cwd(), "public", "certificates", fileName);

  if (!fs.existsSync(path.dirname(certPath))) {
    fs.mkdirSync(path.dirname(certPath), { recursive: true });
  }

  const displayGrade = grade && grade.trim() !== '' ? grade : 'N/A';

  await generateCertificatePDF(studentName, courseTitle, certPath, description, displayGrade);

  res.status(200).json({
    success: true,
    link: `/certificates/${fileName}`,
  });
});


router.get("/:studentId/:courseId", generateCertificate);


// router.get("/:studentId/:courseId", async (req, res) => {
//   try {
//     const { studentId, courseId } = req.params;

//     const enrollment = await EnrolledCourse.findOne({ studentId, courseId })
//       .populate("studentId")
//       .populate("courseId");

//     if (!enrollment || enrollment.progress < 100) {
//       return res.status(400).json({ message: "Course not completed yet" });
//     }

//     const studentName = enrollment.studentId.username;
//     const courseTitle = enrollment.courseId.title;
//     const description = enrollment.description || "has successfully completed the course.";

//     const certDir = path.resolve("public", "certificates");
//     const fileName = `${studentId}_${courseId}.pdf`;
//     const certPath = path.join(certDir, fileName);

//     if (!fs.existsSync(certDir)) {
//       fs.mkdirSync(certDir, { recursive: true });
//     }

//     await generateCertificatePDF(studentName, courseTitle, certPath, description);

//     res.download(certPath, `${studentName}_certificate.pdf`);
//   } catch (error) {
//     console.error("Certificate download error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



router.get("/:studentId/:courseId", async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    const enrollment = await EnrolledCourse.findOne({ studentId, courseId })
      .populate("studentId")
      .populate("courseId");

    if (!enrollment || enrollment.progress < 100) {
      return res.status(400).json({ message: "Course not completed yet" });
    }

    const studentName = enrollment.studentId.username;
    const courseTitle = enrollment.courseId.title;
    const description = "has successfully completed the course.";
    const grade = enrollment.grade || 'N/A';

    const certDir = path.resolve("public", "certificates");
    const fileName = `${studentId}_${courseId}.pdf`;
    const certPath = path.join(certDir, fileName);

    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir, { recursive: true });
    }

    await generateCertificatePDF(studentName, courseTitle, certPath, description, grade);

    res.download(certPath, `${studentName}_certificate.pdf`);
  } catch (error) {
    console.error("Certificate download error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get('/template', async (req, res) => {
  const certPath = path.join("temp", `template_certificate.pdf`);
  const certDir = path.dirname(certPath);

  if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir, { recursive: true });
  }

  try {
    await generateCertificatePDF('', '', certPath, '', true); 
    res.download(certPath, 'Blank_Certificate_Template.pdf', (err) => {
      if (!err) fs.unlink(certPath, () => {});
    });
  } catch (err) {
    console.error("❌ Error generating template PDF:", err);
    res.status(500).send("Failed to generate template.");
  }
});






export default router;
