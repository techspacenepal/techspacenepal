//------------- working code ------------------

import fs from 'fs';
import path from 'path';
import { generateCertificatePDF } from './generateCertificatePDF.js'; 
import EnrolledCourse from '../models/enrolledCourses.js';


export const generateCertificate = async (req, res) => {
  const { studentId, courseId } = req.params;

  try {
    const enrollment = await EnrolledCourse.findOne({ studentId, courseId })
      .populate('studentId')
      .populate('courseId');

    if (!enrollment || enrollment.progress < 100) {
      return res.status(400).json({ message: 'Course not completed yet' });
    }

    const studentName = enrollment.studentId.username;
    const courseTitle = enrollment.courseId.title;

    // 🧹 Clean unwanted characters from description
    const rawDescription = enrollment.courseId.description || "Successfully completed the course.";
    const description = rawDescription.replace(/[^\x00-\x7F]/g, "");

    const certDir = path.join(process.cwd(), 'public', 'certificates');
    const certPath = path.join(certDir, `${studentId}_${courseId}.pdf`);

    if (!fs.existsSync(certDir)) {
      fs.mkdirSync(certDir, { recursive: true });
    }

    await generateCertificatePDF(studentName, courseTitle, certPath, description);

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










/// trying to url in download certificate ---------------
