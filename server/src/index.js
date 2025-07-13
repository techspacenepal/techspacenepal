import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import './utils/passport.js';

// DB connection function (dummy placeholder, तपाईंले आफैले बनाउनुपर्छ)
import dbConnect from './db/connection.js';

// Routes imports (dummy placeholders)
import inquiryRoutes from './routes/inquiryRoute.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import teamRoutes from './routes/team.js';
import classRoutes from './routes/classRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import enrolledCoursesRoutes from './routes/enrolledCoursesRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import todoRoutes from './routes/todoRoutes.js';


import courseRoutes from './routes/courseRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
// Custom error middleware (dummy placeholder)
import errorMiddleware from './middlewares/errorMiddleware.js';
import teacherCourseRoutes from "./routes/teacherCourseRoutes.js";

import { sendNotificationToCourseStudents } from './controllers/teacherNotificationController.js';
 import notificationRoutes from "./routes/teacherNotificationRoutes.js";
import teacherNotificationRoutes from './routes/teacherNotificationRoutes.js';
import videoRoutes from "./routes/courseVideoRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

// __dirname define for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize app
const app = express();

// Load environment variables
dotenv.config();
// Connect DB
dbConnect();

// Middleware setup
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
app.use("/certificates", express.static(path.join(process.cwd(), "public", "certificates")));


// Your existing routes
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/enrolledCourses', enrolledCoursesRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/teacherCourses', teacherCourseRoutes);

app.use('/api/services', serviceRoutes);
app.post("/api/notifications/sendToCourse", sendNotificationToCourseStudents);
app.use("/api/notifications", notificationRoutes);
app.use('/api/teacherNotifications', teacherNotificationRoutes);
app.use("/api/videos", videoRoutes);

// app.use("/api", certificateRoutes);
app.use("/api/certificates", certificateRoutes);

app.use('/api/todos', todoRoutes);

// Google OAuth login
app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user.googleId, email: user.email, name: user.name, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.redirect(`${process.env.FRONTEND_URL}/dashboard/adminDashboard?token=${token}`);
  }
);

// Test API to check auths (example)
app.get('/api/auths', async (req, res) => {
  try {
    // Assume Auth is a mongoose model imported earlier
    const auths = await Auth.find();
    res.json({ success: true, auths });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Error Middleware must be last
app.use(errorMiddleware);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
