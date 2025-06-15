
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from "cors";
// import dbConnect from './db/connection.js';
// import inquiryRoutes from './routes/inquiryRoute.js';
// import cookieParser from 'cookie-parser';
// import errorMiddleware from './middlewares/errorMiddleware.js';
// import authRoutes from './routes/authRoutes.js';
// import Auth from './models/Auth.js';
// import contactRoutes from './routes/contactRoutes.js';
// import session from 'express-session';
// import jwt from "jsonwebtoken";
// import './utils/passport.js';
// import passport from 'passport';
// import path from "path";
// import galleryRoutes from "./routes/galleryRoutes.js";
// import testimonialRoutes from "./routes/testimonialRoutes.js";
// import teamRoutes from "./routes/team.js";


// dotenv.config();
// dbConnect();

// const app = express();

// // Middleware
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/inquiry', inquiryRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/contact', contactRoutes);
// app.use('/api/gallery', galleryRoutes);
// app.use("/api/testimonials", testimonialRoutes);
// app.use("/api/team", teamRoutes);


// // Serve uploaded images statically
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));







// // Test route (optional)
// app.get("/api/auths", async (req, res) => {
//   try {
//     const auths = await Auth.find();
//     res.json({ success: true, auths });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Google OAuth login endpoints...
// app.get(
//   "/api/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/api/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: `${process.env.FRONTEND_URL}/login`,
//     session: false,
//   }),
//   (req, res) => {
//     const user = req.user;
//     const token = jwt.sign(
//       { id: user.googleId, email: user.email, name: user.name, role: "admin" },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRE }
//     );
//     res.redirect(`${process.env.FRONTEND_URL}/dashboard/adminDashboard?token=${token}`);
//   }
// );

// // Error Handling Middleware
// app.use(errorMiddleware);

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`🚀 Server running on http://localhost:${port}`);
// });

import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import dbConnect from './db/connection.js';
import inquiryRoutes from './routes/inquiryRoute.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import Auth from './models/Auth.js';
import contactRoutes from './routes/contactRoutes.js';
import session from 'express-session';
import jwt from "jsonwebtoken";
import './utils/passport.js';
import passport from 'passport';
import path from "path";
import galleryRoutes from "./routes/galleryRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import teamRoutes from "./routes/team.js";
import classRoutes from './routes/classRoutes.js';



// Import courses route and mongoose here:
import mongoose from 'mongoose';
import courseRoutes from './routes/courseRoutes.js';

dotenv.config();
dbConnect(); // your existing DB connect

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join('public/uploads')));

// Serve uploads statically for all uploads including courses images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Your existing routes
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/classes", classRoutes);



// Add new courses route here:
app.use('/api/courses', courseRoutes);

// Test route (optional)
app.get("/api/auths", async (req, res) => {
  try {
    const auths = await Auth.find();
    res.json({ success: true, auths });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Session and passport setup
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth login endpoints
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user.googleId, email: user.email, name: user.name, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.redirect(`${process.env.FRONTEND_URL}/dashboard/adminDashboard?token=${token}`);
  }
);

// Error Handling Middleware
app.use(errorMiddleware);

// Connect to MongoDB (your original dbConnect handles connection, but just in case)
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/courses';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
