import Student from '../models/student.js';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {sendEmail} from '../utils/sendEmail.js';

import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


export const registerStudent = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const student = new Student({ username, email, password, role: 'student' });
    await student.save();

    res.status(201).json({ message: 'Student registered successfully!' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET: Fetch all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ role: "student" }).select("-password");
    res.status(200).json(students);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};



export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

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


export const getStudentProfile = async (req, res) => {
  try {
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


export const getEnrolledCourses = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).populate("enrolledCourses.courseId");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

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





export const studentforgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const user = await Student.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found." });

    user.resetOTP = otp;
    user.resetOTPExpiry = otpExpiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

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

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP has been sent to your gmail box." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP.", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await Student.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.resetOTP !== otp || user.resetOTPExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};




export const googleLogin = async (req, res) => {
  const { email, name } = req.body;

  try {
    let student = await Student.findOne({ email });

    if (!student) {
      // If not found, register new user
      student = await Student.create({ email, username: name, password: "google-login", role: "student" });
    }

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


export const githubLogin = async (req, res) => {
  const { email, name } = req.body;

  try {
    let student = await Student.findOne({ email });

    if (!student) {
      // If student doesn't exist, create with dummy password
      student = await Student.create({
        email,
        username: name,
        password: "github-login",
        role: "student",
      });
    }

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


export const facebookLogin = async (req, res) => {
  const { email, name } = req.body;

  try {
    let student = await Student.findOne({ email });

    if (!student) {
      // If student not found, create one with dummy password
      student = await Student.create({
        email,
        username: name,
        password: "facebook-login",
        role: "student",
      });
    }

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




