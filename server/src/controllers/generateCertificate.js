
// import PDFDocument from "pdfkit";
// import EnrolledCourse from "../models/enrolledCourses.js";
// import fs from "fs";
// import path from "path";

// export const generateCertificate = async (req, res) => {
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
//     const issueDate = new Date().toLocaleDateString();

//     const doc = new PDFDocument({ size: "A4", margin: 50 });

//     const chunks = [];
//     doc.on("data", (chunk) => chunks.push(chunk));
//     doc.on("end", () => {
//       const pdfData = Buffer.concat(chunks);
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader(
//         "Content-Disposition",
//         `attachment; filename=Certificate_${courseTitle}.pdf`
//       );
//       res.send(pdfData);
//     });

//     // Background color or border (optional)
//     doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f4f6f8");
//     doc.fillColor("black");

//     // 🏫 Logo at the top
//     const logoPath = path.resolve("server/uploads/logo.png");
//     if (fs.existsSync(logoPath)) {
//       doc.image(logoPath, doc.page.width / 2 - 50, 40, { width: 100 });
//     }

//     // 🏫 Institute Name
//     doc
//       .font("Helvetica-Bold")
//       .fontSize(22)
//       .fillColor("#2c3e50")
//       .text("Teach Space Nepal Institute", {
//         align: "center",
//       });

//     doc.moveDown(2);

//     // 🏅 Certificate Title
//     doc
//       .fontSize(20)
//       .fillColor("black")
//       .text("Certificate of Completion", { align: "center" });

//     doc.moveDown();

//     // 👤 Student Name
//     doc
//       .font("Helvetica")
//       .fontSize(14)
//       .text(`This is to certify that`, { align: "center" })
//       .moveDown(0.5)
//       .font("Helvetica-Bold")
//       .fontSize(18)
//       .text(`${studentName}`, { align: "center" });

//     doc.moveDown(0.5);

//     // 📚 Course Title
//     doc
//       .font("Helvetica")
//       .fontSize(14)
//       .text(`has successfully completed the course`, { align: "center" })
//       .moveDown(0.3)
//       .font("Helvetica-Bold")
//       .fontSize(16)
//       .text(`"${courseTitle}"`, { align: "center", italic: true });

//     doc.moveDown(2);

//     // 📆 Issue Date
//     doc
//       .font("Helvetica")
//       .fontSize(12)
//       .text(`Issued on: ${issueDate}`, { align: "center" });

//     doc.moveDown(3);

//     // ✍️ Digital Signature
//     const signPath = path.resolve("server/uploads/signature.png");
//     if (fs.existsSync(signPath)) {
//       doc.image(signPath, doc.page.width / 2 - 50, doc.y, {
//         width: 100,
//       });
//       doc.moveDown(1);
//       doc
//         .fontSize(10)
//         .fillColor("gray")
//         .text("Authorized Signature", { align: "center" });
//     } else {
//       doc
//         .fontSize(10)
//         .fillColor("red")
//         .text("[Signature missing]", { align: "center" });
//     }

//     doc.end();
//   } catch (error) {
//     console.error("Certificate generation failed:", error);
//     res.status(500).json({ message: "Error generating certificate" });
//   }
// };





// controllers/generateCertificate.js
// import path from "path";
// import fs from "fs";
// import EnrolledCourse from "../models/enrolledCourses.js";
// import { generateCertificatePDF } from "./generateCertificatePDF.js";

// export const generateCertificate = async (req, res, next) => {
//   try {
//     const { studentId, courseId } = req.params;

//     const enrollment = await EnrolledCourse.findOne({ studentId, courseId })
//       .populate("studentId")
//       .populate("courseId");

//     if (!enrollment || enrollment.progress < 100) {
//       return res.status(400).json({ success: false, message: "Course not completed yet" });
//     }

//     const studentName = enrollment.studentId.username;
//     const courseTitle = enrollment.courseId.title;

//     const fileName = `${studentId}_${courseId}.pdf`;
//     const certFolder = path.join(process.cwd(), "public", "certificates");
//     const certPath = path.join(certFolder, fileName);

//     if (!fs.existsSync(certFolder)) {
//       fs.mkdirSync(certFolder, { recursive: true });
//     }

//     await generateCertificatePDF(studentName, courseTitle, certPath);

//     // ✅ Instead of sending file directly, return the file path
//     // return res.status(200).json({
//     //   success: true,
//     //   link: `/certificates/${fileName}`,
//     // });
//     res.status(200).json({
//   success: true,
//   link: `/certificates/${fileName}`, 
// });

//   } catch (error) {
//     console.error("❌ Certificate generation error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };



import fs from 'fs';
import path from 'path';
import { generateCertificatePDF } from './generateCertificatePDF.js'; 
import EnrolledCourse from '../models/enrolledCourses.js';

export const generateCertificate = async (req, res) => {
  const { studentId, courseId } = req.params;

  try {
    // 👉 fetch enrollment with populated fields
    const enrollment = await EnrolledCourse.findOne({ studentId, courseId })
      .populate('studentId')
      .populate('courseId');

    if (!enrollment || enrollment.progress < 100) {
      return res.status(400).json({ message: 'Course not completed yet' });
    }

    const studentName = enrollment.studentId.username;
    const courseTitle = enrollment.courseId.title;
    const description = enrollment.description || "Successfully completed the course.";

    const certDir = path.join(process.cwd(), 'public', 'certificates');
    const certPath = path.join(certDir, `${studentId}_${courseId}.pdf`);

    // 📁 create folder if not exists
    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir, { recursive: true });
    }

    // 📄 generate the PDF with description
    await generateCertificatePDF(studentName, courseTitle, certPath, description);

    // 📤 send the file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${studentName}_certificate.pdf"`
    );

    fs.createReadStream(certPath).pipe(res);
  } catch (error) {
    console.error("Certificate generate error:", error);
    res.status(500).json({ message: "Server error while generating certificate" });
  }
};
