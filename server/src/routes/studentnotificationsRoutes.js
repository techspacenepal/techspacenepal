import express from "express";
import StudentNotification from "../models/StudentNotification.js";
// import { isStudent, protect } from "../middlewares/studentMiddleware.js"; // पुरानो student middleware
import { protectAll } from "../middlewares/protectAll.js";

import { getStudentNotifications, markAllStudentNotificationsSeen, sendStudentNotification } from "../controllers/studentnotificationController.js";
import { isStudent} from "../middlewares/studentMiddleware.js";
import { allowRoles } from "../middlewares/authMiddleware.js";

// import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/student", protectAll, isStudent, sendStudentNotification);

// RIGHT in backend
router.get("/notifications/student/notifications", protectAll,allowRoles("admin", "superadmin", "user"), getStudentNotifications);

// in studentNotificationRoutes.js
router.put("/notifications/student/mark-seen", protectAll, markAllStudentNotificationsSeen);


export default router;
