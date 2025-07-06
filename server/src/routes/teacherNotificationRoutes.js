import express from "express";


import {  getNotificationsForStudent, sendNotificationToCourseStudents } from "../controllers/teacherNotificationController.js";
// import { protect } from "../middlewares/authMiddleware.js";
// import { protect } from "../middlewares/studentMiddleware.js";


import { protect as teacherProtect } from "../middlewares/authMiddleware.js";
import { protect as studentProtect } from "../middlewares/studentMiddleware.js";

const router = express.Router();

// Teacher मात्र access गर्न सक्ने route (optional)
router.post('/sendToCourse', teacherProtect, sendNotificationToCourseStudents);
// router.get("/student/:studentId", protect, getNotificationsForStudent);
router.get("/student/:id", studentProtect, getNotificationsForStudent);


export default router;
