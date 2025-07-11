// import Student from '../models/student.js';
// import bcrypt from "bcryptjs";
// import jwt from 'jsonwebtoken';
// import {sendEmail} from '../utils/sendEmail.js';
// import nodemailer from "nodemailer";
// import EnrolledCourse from '../models/enrolledCourses.js';
// import dotenv from "dotenv";
// dotenv.config();
// const generateToken = (id, role) => {
//   return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
// };
// export const registerStudent = async (req, res) => {
//   try {
//     const { username, email, number, password } = req.body;

//     // Check for existing user
//     const existing = await Student.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     const student = new Student({ username, email, number, password, role: 'student' });
//     await student.save();

//     // Token generate 
//     const token = generateToken(student._id, student.role);

//     // Response मा token र user info 
//     res.status(201).json({
//       message: 'Student registered successfully!',
//       token,
//       username: student.username,
//       role: student.role,
//     });
//   } catch (error) {
//     console.error('Register Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// export const getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find({ role: "student" }).select("-password");
//     res.status(200).json(students);
//   } catch (error) {
//     console.error("Fetch Error:", error);
//     res.status(500).json({ message: "Failed to fetch students" });
//   }
// };
// export const loginStudent = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const student = await Student.findOne({ email });
//     if (!student) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid Password" });
//     }

//     const token = generateToken(student._id, student.role);
//     res.status(200).json({
//       token,
//       username: student.username,
//       role: student.role,
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// export const getStudentProfile = async (req, res) => {
//   try {
//     const student = await Student.findById(req.user._id).select("-password");

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     res.status(200).json(student);
//   } catch (error) {
//     console.error("Profile Fetch Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// export const getEnrolledCourses = async (req, res) => {
//   try {
//     const student = await Student.findById(req.user._id).populate("enrolledCourses.courseId");

//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const courses = student.enrolledCourses.map((enrolled) => {
//       return {
//         id: enrolled.courseId._id,
//         name: enrolled.courseId.name,
//         instructor: enrolled.courseId.instructor,
//         thumbnail: enrolled.courseId.thumbnail,
//         progress: enrolled.progress,
//       };
//     });

//     res.status(200).json(courses);
//   } catch (error) {
//     console.error("Fetch enrolled courses failed:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// export const studentforgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 10 * 60 * 1000;

//     const user = await Student.findOne({ email });
//     if (!user) return res.status(404).json({ message: "Email not found." });

//     user.resetOTP = otp;
//     user.resetOTPExpiry = otpExpiry;
//     await user.save();

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"Teach Space" <${process.env.GMAIL_USER}>`,
//       to: email,
//       subject: "Teach Space - OTP Verification Code",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 10px;">
//           <h2 style="color: #007bff;">Teach Space</h2>
//           <p>Hello,</p>
//           <p>Your OTP code is: <strong style="font-size: 18px;">${otp}</strong></p>
//           <p>This code is valid for 10 minutes. Please do not share this code with anyone.</p>
//           <br />
//           <p>Thank you,<br/>Teach Space Team</p>
//         </div>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: "OTP has been sent to your gmail box." });
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     res.status(500).json({ message: "Failed to send OTP.", error: error.message });
//   }
// };
// export const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     const user = await Student.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // ✅ Check for invalid or expired OTP
//     if (user.resetOTP !== otp || user.resetOTPExpiry < Date.now()) {
//       // Send expired OTP email
//       if (user.resetOTPExpiry < Date.now()) {
//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: process.env.GMAIL_USER,
//             pass: process.env.GMAIL_PASS,
//           },
//         });

//         const mailOptions = {
//           from: `"Teach Space Support" <${process.env.GMAIL_USER}>`,
//           to: user.email,
//           subject: "⚠️ OTP Expired - Action Required",
//           html: `
//             <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
//               <h2 style="color: #d9534f;">Teach Space - Password Reset</h2>
//               <p>Hi ${user.username || 'User'},</p>

//               <p>Your OTP has <strong style="color: #d9534f;">expired</strong>.</p>
//               <p>OTP codes are valid for only 10 minutes to protect your account.</p>
//               <p>Please request a new OTP from the password reset page to try again.</p>

//               <a href="https://yourdomain.com/auth/studentForgotPassword" 
//                  style="display:inline-block; margin-top:15px; background-color:#007bff; color:#fff; padding:10px 20px; text-decoration:none; border-radius:5px;">
//                  Request New OTP
//               </a>

//               <br/><br/>
//               <p style="font-size: 14px; color: #777;">
//                 If you did not request a password reset, you can safely ignore this message.
//               </p>

//               <p>Thank you,<br/><strong>Teach Space Support Team</strong></p>
//             </div>
//           `,
//         };

//         await transporter.sendMail(mailOptions);
//       }

//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     // ✅ Reset the password
//     user.password = newPassword;
//     user.resetOTP = undefined;
//     user.resetOTPExpiry = undefined;
//     await user.save();

//     res.status(200).json({ message: "Password reset successful!" });
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     res.status(500).json({ message: "Error resetting password", error: error.message });
//   }
// };
// export const googleLogin = async (req, res) => {
//   const { email, name } = req.body;

//   try {
//     let student = await Student.findOne({ email });

//     if (!student) {
//       // If not found, register new user
//       student = await Student.create({ email, username: name, password: "google-login", role: "student" });
//     }

//     const token = jwt.sign(
//       { id: student._id, role: student.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       token,
//       role: student.role,
//       username: student.username,
//     });
//   } catch (error) {
//     console.error("Google login error:", error);
//     res.status(500).json({ message: "Google login failed" });
//   }
// };
// export const githubLogin = async (req, res) => {
//   const { email, name } = req.body;

//   try {
//     let student = await Student.findOne({ email });

//     if (!student) {
//       // If student doesn't exist, create with dummy password
//       student = await Student.create({
//         email,
//         username: name,
//         password: "github-login",
//         role: "student",
//       });
//     }

//     const token = jwt.sign(
//       { id: student._id, role: student.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       token,
//       role: student.role,
//       username: student.username,
//     });
//   } catch (error) {
//     console.error("GitHub login error:", error);
//     res.status(500).json({ message: "GitHub login failed" });
//   }
// };
// export const facebookLogin = async (req, res) => {
//   const { email, name } = req.body;

//   try {
//     let student = await Student.findOne({ email });

//     if (!student) {
//       // If student not found, create one with dummy password
//       student = await Student.create({
//         email,
//         username: name,
//         password: "facebook-login",
//         role: "student",
//       });
//     }

//     const token = jwt.sign(
//       { id: student._id, role: student.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       token,
//       role: student.role,
//       username: student.username,
//     });
//   } catch (error) {
//     console.error("Facebook login error:", error);
//     res.status(500).json({ message: "Facebook login failed" });
//   }
// };
// export const getStudentById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const enrolled = await EnrolledCourse.findOne({ studentId: id })
//       .populate("studentId")
//       .populate("courseId");

//     if (!enrolled) {
//       return res.status(404).json({ message: "Student not found" });
//     }

//     const data = {
//       name: enrolled.studentId.username || enrolled.studentId.name,
//       email: enrolled.studentId.email,
//       number: enrolled.studentId.number || enrolled.studentId.phone || "N/A", 
//       progress: enrolled.progress || 0,
//       course: enrolled.courseId?.title || "N/A",
//       joinDate: enrolled.studentId.createdAt || null, 
//       status: enrolled.studentId.status || null       
//     };

//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching student:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import Student from '../models/student.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';
import nodemailer from "nodemailer";
import EnrolledCourse from '../models/enrolledCourses.js';
import multer from "multer";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

// Helper function to generate JWT token with user ID and role, expires in 1 day
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Student Registration Handler
export const registerStudent = async (req, res) => {
  try {
    const {fullName, username, email, number, password } = req.body;

    // Check if user with given email already exists
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new student with given data, role hardcoded to 'student'
    const student = new Student({fullName, username, email, number, password, role: 'student' });
    await student.save();

    // Generate JWT token after successful registration
    const token = generateToken(student._id, student.role);

    // Respond with success message and token
    res.status(201).json({
      message: 'Student registered successfully!',
      token,
      username: student.username,
      role: student.role,
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch all students (excluding passwords)
export const getAllStudents = async (req, res) => {
  try {
    // Find all users with role "student" and exclude password field
    const students = await Student.find({ role: "student" }).select("-password");
    res.status(200).json(students);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// Student login handler
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate JWT token on successful login
    const token = generateToken(student._id, student.role);
    res.status(200).json({
      token,
      username: student.username,
      role: student.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in student's profile
export const getStudentProfile = async (req, res) => {
  try {
    // Fetch student by ID stored in the authenticated request (req.user)
    const student = await Student.findById(req.user._id).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get courses a student is enrolled in
export const getEnrolledCourses = async (req, res) => {
  try {
    // Find student and populate enrolledCourses with course details
    const student = await Student.findById(req.user._id).populate("enrolledCourses.courseId");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Map enrolled courses to send only required fields
    const courses = student.enrolledCourses.map((enrolled) => {
      return {
        id: enrolled.courseId._id,
        name: enrolled.courseId.name,
        instructor: enrolled.courseId.instructor,
        thumbnail: enrolled.courseId.thumbnail,
        progress: enrolled.progress,
      };
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Fetch enrolled courses failed:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Request password reset OTP (send email)
export const studentforgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Generate 6-digit OTP and set expiry (10 minutes)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    // Find user by email
    const user = await Student.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found." });

    // Save OTP and expiry in user document
    user.resetOTP = otp;
    user.resetOTPExpiry = otpExpiry;
    await user.save();

    // Setup nodemailer transporter using Gmail credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Email content with OTP
    const mailOptions = {
      from: `"Teach Space" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Teach Space - OTP Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2 style="color: #007bff;">Teach Space</h2>
          <p>Hello,</p>
          <p>Your OTP code is: <strong style="font-size: 18px;">${otp}</strong></p>
          <p>This code is valid for 10 minutes. Please do not share this code with anyone.</p>
          <br />
          <p>Thank you,<br/>Teach Space Team</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP has been sent to your gmail box." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP.", error: error.message });
  }
};

// Reset password using OTP
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find user by email
    const user = await Student.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if OTP matches and not expired
    if (user.resetOTP !== otp || user.resetOTPExpiry < Date.now()) {
      // If OTP expired, send expired notification email
      if (user.resetOTPExpiry < Date.now()) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"Teach Space Support" <${process.env.GMAIL_USER}>`,
          to: user.email,
          subject: "⚠️ OTP Expired - Action Required",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #d9534f;">Teach Space - Password Reset</h2>
              <p>Hi ${user.username || 'User'},</p>

              <p>Your OTP has <strong style="color: #d9534f;">expired</strong>.</p>
              <p>OTP codes are valid for only 10 minutes to protect your account.</p>
              <p>Please request a new OTP from the password reset page to try again.</p>

              <a href="https://yourdomain.com/auth/studentForgotPassword" 
                 style="display:inline-block; margin-top:15px; background-color:#007bff; color:#fff; padding:10px 20px; text-decoration:none; border-radius:5px;">
                 Request New OTP
              </a>

              <br/><br/>
              <p style="font-size: 14px; color: #777;">
                If you did not request a password reset, you can safely ignore this message.
              </p>

              <p>Thank you,<br/><strong>Teach Space Support Team</strong></p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
      }

      // Respond with error if OTP invalid or expired
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Reset user password
    user.password = newPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};

// Google OAuth login or registration
export const googleLogin = async (req, res) => {
  const { email, name } = req.body;

  try {
    let student = await Student.findOne({ email });

    // If user does not exist, create a new one with dummy password
    if (!student) {
      student = await Student.create({ email, username: name, password: "google-login", role: "student" });
    }

    // Generate JWT token valid for 7 days
    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      role: student.role,
      username: student.username,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Google login failed" });
  }
};

// GitHub OAuth login or registration
export const githubLogin = async (req, res) => {
  const { email, name } = req.body;

  try {
    let student = await Student.findOne({ email });

    // If student doesn't exist, create new one with dummy password
    if (!student) {
      student = await Student.create({
        email,
        username: name,
        password: "github-login",
        role: "student",
      });
    }

    // Generate JWT token valid for 7 days
    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      role: student.role,
      username: student.username,
    });
  } catch (error) {
    console.error("GitHub login error:", error);
    res.status(500).json({ message: "GitHub login failed" });
  }
};

// Facebook OAuth login or registration
export const facebookLogin = async (req, res) => {
  const { email, name } = req.body;

  try {
    let student = await Student.findOne({ email });

    // If student not found, create with dummy password
    if (!student) {
      student = await Student.create({
        email,
        username: name,
        password: "facebook-login",
        role: "student",
      });
    }

    // Generate JWT token valid for 7 days
    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      role: student.role,
      username: student.username,
    });
  } catch (error) {
    console.error("Facebook login error:", error);
    res.status(500).json({ message: "Facebook login failed" });
  }
};

// Get detailed student info by student ID, including course and progress
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find enrolled course record for studentId and populate student and course details
    const enrolled = await EnrolledCourse.findOne({ studentId: id })
      .populate("studentId")
      .populate("courseId");

    if (!enrolled) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Prepare data object with relevant student and course info
    const data = {
      name: enrolled.studentId.username || enrolled.studentId.name,
      email: enrolled.studentId.email,
      number: enrolled.studentId.number || enrolled.studentId.phone || "N/A", 
      progress: enrolled.progress || 0,
      course: enrolled.courseId?.title || "N/A",
      joinDate: enrolled.studentId.createdAt || null, 
      status: enrolled.studentId.status || null  ,
       avatarUrl: enrolled.studentId.avatarUrl || null,     
    };

    // Send response with student details
    res.json(data);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Storage config for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-avatar${ext}`);
  },
});

// Multer middleware
const upload = multer({ storage }).single("avatar");

// Controller function
export const uploadAvatar = (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ message: "Upload failed" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const avatarUrl = `http://localhost:5000/uploads/avatars/${req.file.filename}`;
      const studentId = req.user.id;

      const updated = await Student.findByIdAndUpdate(
        studentId,
        { avatarUrl },
        { new: true }
      );

      res.json({ avatarUrl });
    } catch (error) {
      console.error("DB update error:", error);
      res.status(500).json({ message: "Failed to update avatar" });
    }
  });
};