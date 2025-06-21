import express from 'express';
import { facebookLogin, getAllStudents, getStudentProfile, githubLogin, googleLogin, loginStudent, registerStudent, resetPassword, studentforgotPassword } from '../controllers/studentController.js';
import { protect } from '../middlewares/studentMiddleware.js';
import Student from "../models/student.js";


const router = express.Router();

router.post('/register', registerStudent);
router.post("/login", loginStudent); // ✅ login endpoint
router.get('/profile', protect, getStudentProfile);
router.get("/", getAllStudents);
router.post("/forgot-password", studentforgotPassword);
router.post('/reset-password', resetPassword);
router.post("/google-login", googleLogin);
router.post("/facebook-login", facebookLogin);
router.post("/github-login", githubLogin);



// routes/students.js or routes/studentRoutes.js
router.put("/update", protect, async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id; // must come from token

    const updatedUser = await Student.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
});


export default router;
