

import express from 'express';
import passport from 'passport';
import Auth from '../models/Auth.js';
import jwt from "jsonwebtoken";


import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdminById,
  getUserById,
  getAllUsers,
  updateUserByEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  deleteUserById,
  googleLogin,
  
  getAllTeachers,
  getTeacherById,
} from '../controllers/authController.js';

import { authenticateToken } from '../middlewares/authMiddleware.js';
import { protect } from '../middlewares/protectSuperAdmin.js';

const router = express.Router();

/* ------------------ Admin Routes ------------------ */
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/get-admin/:id', getAdminById);

/* ------------------ User Routes ------------------ */
router.get('/get-user/:id', getUserById);
router.get('/users', getAllUsers); // Keep this as the primary route for fetching users
router.put('/users/:email', updateUserByEmail);
router.delete('/:id', protect, deleteUserById);

/* ------------------ Auth Routes ------------------ */
router.post('/login-user', login); // renamed to avoid conflict
router.post('/logout-user', authenticateToken, logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/teacher/:id', getTeacherById);
// router.get("/:id", protect, getTeacherById);
router.get('/', getAllTeachers);
/* ------------------ Google OAuth ------------------ */
router.post('/google-login', googleLogin);

// Google OAuth2 Redirect Flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const user = req.user;
    res.redirect(`http://localhost:3000/google-success?email=${user.email}&username=${user.username}`);
  }
);


// authRoutes.js (router file)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});




// Express backend
router.post("/google-login", async (req, res) => {
  const { email, username } = req.body;

  try {
    let user = await Auth.findOne({ email });

    if (!user) {
      // Register new user with 'user' role
      user = await Auth.create({ username: username, email, role: "user", password: "google" });
    }

    return res.status(200).json({ role: user.role });
  } catch (err) {
    return res.status(500).json({ message: "Google login failed" });
  }
});




// 🔹 Facebook Login
router.post("/facebook-login", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: "Email and name are required" });
  }

  try {
    let user = await Auth.findOne({ email });

    if (!user) {
      // generate a unique username
      const uniqueUsername = name.replace(/\s+/g, '') + Math.floor(Math.random() * 10000);

      user = await Auth.create({
        username: uniqueUsername,
        email,
        password: "facebook_default_password",
        role: "user",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      role: user.role,
      username: user.username,
    });
  } catch (error) {
    console.error("Facebook login error:", error.message);
    res.status(500).json({ message: "Facebook login failed" });
  }
});





export default router;
