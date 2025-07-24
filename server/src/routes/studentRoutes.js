import express from 'express';
import { facebookLogin, getAllStudents,  getStudentById,  getStudentProfile, getTeacherForStudent, githubLogin, googleLogin, loginStudent, registerStudent, resetPassword, studentforgotPassword, uploadAvatar } from '../controllers/studentController.js';
import { protect } from '../middlewares/studentMiddleware.js';
import Student from "../models/student.js";
import multer from "multer";



const router = express.Router();

router.post('/register', registerStudent);
router.post("/login", loginStudent);
router.get("/profile", protect, getStudentProfile);
router.get("/", getAllStudents);
router.post("/forgot-password", studentforgotPassword);
router.post('/reset-password', resetPassword);
router.post("/google-login", googleLogin);
router.post("/facebook-login", facebookLogin);
router.post("/github-login", githubLogin);
router.get("/:id", getStudentById);

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



// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.put('/upload-avatar', protect, uploadAvatar);


// studentRoutes.js
router.get("/check-username/:username", async (req, res) => {
  try {
    const student = await Student.findOne({ username: req.params.username });
    res.json({ exists: !!student });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// 👇 Add this route
router.get("/teacher/:studentId/:courseId", getTeacherForStudent);



export default router;
