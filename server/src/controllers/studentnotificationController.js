// controllers/notificationController.js

//import StudentNotification from "../models/StudentNotification.js";
import Notification from "../models/StudentNotification.js";


export const sendStudentNotification = async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required" });
    }

    const studentId = req.user._id;

    const newNotification = new Notification({
      studentId,
      name: req.user.fullName || req.user.username || "Unknown",
      title,
      message,
      type: "student_notification",
    });

    await newNotification.save();

    res.status(201).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error in sendStudentNotification:", error);
    res.status(500).json({ message: "Server error sending notification" });
  }
};



// 👉 Student ले पठाएको notification admin ले हेर्न
export const getStudentNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ type: "student_notification" }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error("Error fetching student notifications:", err);
    res.status(500).json({ message: "Server error fetching notifications" });
  }
};

// 👉 Mark all as seen (optional)
// export const markAllStudentNotificationsSeen = async (req, res) => {
//   try {
//     await Notification.updateMany({ type: "student_notification", seen: false }, { $set: { seen: true } });
//     res.status(200).json({ message: "All student notifications marked as seen" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to mark notifications" });
//   }
// };


export const markAllStudentNotificationsSeen = async (req, res) => {
  try {
    const currentUserId = req.user?.role || req.user?._id;
    
    // ✅ Update notifications where user has not seen
    await Notification.updateMany(
      {
        type: "student_notification",
        seenBy: { $ne: currentUserId },
      },
      {
        $addToSet: { seenBy: currentUserId },
      }
    );

    res
      .status(200)
      .json({ message: "Notifications marked as seen for current user" });
  } catch (err) {
    console.error("Error marking notifications as seen:", err);
    res
      .status(500)
      .json({ message: "Failed to mark notifications" });
  }
};
