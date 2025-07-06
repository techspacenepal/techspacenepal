import mongoose from "mongoose";
import EnrolledCourse from "../models/enrolledCourses.js";
import Notification from "../models/teacherNotification.js";  



// export const sendNotificationToCourseStudents = async (req, res) => {
//   try {
//     const { courseId, title, message } = req.body;

//     console.log("Request body:", req.body);

//     if (!courseId || !title || !message) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const enrolledStudents = await EnrolledCourse.find({ courseId }).populate("studentId");
//     console.log("Enrolled students found:", enrolledStudents.length);

//     if (!enrolledStudents.length) {
//       return res.status(404).json({ error: "No students enrolled in this course" });
//     }

//     const notifications = enrolledStudents.map((enroll) => ({
//       studentId: enroll.studentId._id,
//       title,
//       message,
//       createdAt: new Date(),
//     }));

//     console.log("Notifications to insert:", notifications.length);

//     await Notification.insertMany(notifications);

//     res.status(200).json({ message: "Notifications sent successfully to all students" });
//   } catch (error) {
//     console.error("Error sending notifications:", error);
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// };



// GET /api/notifications/student/:studentId




export const sendNotificationToCourseStudents = async (req, res) => {
  try {
    const { courseId, title, message } = req.body;
    const teacherId = req.user?.id;
    const role = req.user?.role;

    if (!teacherId || !role) {
      return res.status(401).json({ message: "Unauthorized. User info missing." });
    }

    if (!courseId || !title || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can send notifications" });
    }

    const enrolledStudents = await EnrolledCourse.find({ courseId, teacherId }).populate("studentId");

    if (!enrolledStudents.length) {
      return res.status(404).json({ error: "No students enrolled by this teacher in this course" });
    }

    const notifications = enrolledStudents.map((enroll) => ({
      studentId: enroll.studentId._id,
      teacherId,
      courseId,
      title,
      message,
      createdAt: new Date(),
    }));

    await Notification.insertMany(notifications);

    res.status(200).json({ message: "Notifications sent successfully to all students" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const getNotificationsForStudent = async (req, res) => {
  const { id: studentId } = req.params; // rename id to studentId here

  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: "Invalid student ID format" });
  }

  try {
    const notifications = await Notification.find({ studentId }).sort({ createdAt: -1 });
    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Failed to get notifications:", error);
    return res.status(500).json({ message: "Failed to get notifications" });
  }
};


// export const getNotificationsForStudent = async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     const notifications = await Notification.find({ studentId }).sort({
//       createdAt: -1,
//     });

//     res.status(200).json(notifications);
//   } catch (error) {
//     console.error("Failed to get notifications:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };