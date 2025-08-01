import Auth from "../models/Auth.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import Student from "../models/student.js";
import LoginSession from "../models/LoginSession.js";
import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Utility to validate strong password
const isStrongPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
};


export const registerAdmin = async (req, res) => {
  const { fullName, username, email, number, password, role } = req.body;

  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      });
    }

    const allowedRoles = ["user", "admin", "superadmin", "teacher"];
    const finalRole = allowedRoles.includes(role) ? role : "user";

    const newUser = new Auth({
      fullName,
      username,
      email,
      number,
      password,
      role: finalRole,
    });

    await newUser.save();

    // ✅ Token generate गर्नुहोस्
    const token = generateToken(newUser._id, newUser.role);

    // ✅ Response मा token return गर्नुहोस्
    res.status(201).json({
      message: "Registration successful!",
      token,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
      number: newUser.number,
      role: newUser.role,
    });
  } catch (error) {
    console.error("Register Error:", error);

    // 👇 यो line पहिले try block मा थियो — अब यहाँ सही ठाउँमा राखिएको छ
    if (error.code === 11000 && error.keyPattern?.username) {
      return res.status(400).json({ message: "Username already exists" });
    }

    res.status(500).json({ message: "Server error. Could not register user." });
  }
};




export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Auth.findOne({ email });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    if (admin.isBlocked)
      return res.status(403).json({ message: "Your access has been temporarily suspended. For further assistance, please contact the administration." });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      token,
      userId: admin._id,
      username: admin.username,
      role: admin.role,
      email: admin.email,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const logoutAdmin = async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id); // req.user from protect middleware
    if (user) {
      user.active = false;
      await user.save();
    }

    res.clearCookie("adminToken");
    res.clearCookie("teacherToken");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error });
  }
};




// ✅ Get Admin by ID (admin or superadmin)
export const getAdminById = async (req, res) => {
  try {
    const admin = await Auth.findById(req.params.id);

    // admin वा superadmin दुबैलाई अनुमति
    if (!admin || !["admin", "superadmin"].includes(admin.role)) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ username: admin.username, role: admin.role });
  } catch (err) {
    console.error("Get Admin Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    if (!user || user.role !== "user") {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ username: user.username });
  } catch (err) {
    console.error("Get User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Users

export const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find().select("-password"); // password field हटाइएको
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


export const deleteUserById = async (req, res) => {
  try {
   
    const user = await Auth.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

   
    if (user.role === "superadmin") {
      return res.status(403).json({ message: "Superadmin cannot be deleted" });
    }

    
    await Auth.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// UPDATE user by email
export const updateUserByEmail = async (req, res) => {
  try {
    const user = await Auth.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await Auth.findOne({ email });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.isBlocked)
//       return res.status(403).json({ message: "Your account has been blocked by admin" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     // login success
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     res.status(200).json({
//       message: "Login successful ",
//       token,
//       user,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     await User.findByIdAndUpdate(userId, { active: false });
//     res.status(200).json({ message: "Logout successfull, active false " });
//   } catch (error) {
//     console.error("Logout error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const user = await Auth.findOne({ email });
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

    res.status(200).json({ message: "OTP has been sent to your email." });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res
      .status(500)
      .json({ message: "Failed to send OTP.", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword, token, password } = req.body;

  try {
    // 1. OTP-based reset (OTP + email required)
    if (email && otp && newPassword) {
      const user = await Auth.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.resetOTP !== otp || user.resetOTPExpiry < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      user.password = newPassword;
      user.resetOTP = undefined;
      user.resetOTPExpiry = undefined;
      await user.save();

      return res.status(200).json({ message: "Password reset successful!" });
    }

    // 2. Token-based reset (token param + new password)
    if (token && password) {
      const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const user = await Auth.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      // Token invalid or expired
      if (!user) {
        // Send email about expired link if possible
        const expiredUser = await Auth.findOne({
          resetPasswordToken: hashedToken,
        });
        if (expiredUser) {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.GMAIL_USER,
              pass: process.env.GMAIL_PASS,
            },
          });

          const mailOptions = {
            from: `"Teach Space" <${process.env.GMAIL_USER}>`,
            to: expiredUser.email,
            subject: "Teach Space - Reset Link Expired",
            html: `
              <div style="font-family: Arial, sans-serif; padding: 10px;">
                <h2 style="color: #dc3545;">Teach Space</h2>
                <p>Hello ${expiredUser.username || "User"},</p>
                <p>Your password reset link has expired. Please request a new one to reset your password.</p>
                <br/>
                <p>Thank you,<br/>Teach Space Team</p>
              </div>
            `,
          };

          await transporter.sendMail(mailOptions);
        }

        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Valid token - reset password
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.status(200).json({ message: "Password reset successful" });
    }

    // If neither flow matched
    return res.status(400).json({ message: "Invalid request" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const googleLogin = async (req, res) => {
  const { email, googleId, username } = req.body;

  try {
    let user = await Auth.findOne({ email });

    if (user) {
      // यदि user पहिले नै छ भने, check googleId
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // नयाँ प्रयोगकर्ता create गर्नुहोस्
      user = await Auth.create({
        username,
        email,
        googleId,
        role: "user",
        active: true,
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      role: user.role,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: "Google login failed", error });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Auth.findById(req.params.id);

    if (!teacher || teacher.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({
      id: teacher._id,
      username: teacher.username,
      email: teacher.email,
      role: teacher.role,
    });
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Auth.find({ role: "teacher" }, "_id username");
    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Failed to fetch teachers" });
  }
};






export const blockUser = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "superadmin") {
      return res.status(403).json({ message: "Cannot block superadmin" });
    }

    const updatedUser = await Auth.findByIdAndUpdate(
      req.params.id,
      { isBlocked: !user.isBlocked },
      { new: true }
    );

    res.status(200).json({
      message: `User has been ${updatedUser.isBlocked ? "blocked" : "unblocked"}`,
    });
  } catch (error) {
    console.error("BlockUser Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getProfile = async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      id: user._id,
      username: user.username,
      role: user.role,
      email: user.email,
      isBlocked: user.isBlocked, 
    });
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



export const getLoginSessions = async (req, res) => {
  const { studentId } = req.params;

  try {
    const sessions = await LoginSession.find({ userId: studentId })
      .sort({ loginAt: -1 })
      .limit(10); // पछिल्ला १० session मात्र देखाउन

    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch login sessions" });
  }
};
