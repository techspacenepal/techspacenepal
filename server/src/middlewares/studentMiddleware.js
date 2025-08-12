// import jwt from 'jsonwebtoken';
// import Student from '../models/student.js';

// export const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // 🛑 Check for token presence and correct format
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided or format invalid" });
//     }

//     const token = authHeader.split(" ")[1];

//     // 🛑 Check for malformed token (e.g., "null", "undefined", broken string)
//     if (!token || token === "null" || token === "undefined" || token.split(".").length !== 3) {
//       return res.status(401).json({ message: "Malformed or invalid token" });
//     }

//     // ✅ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const student = await Student.findById(decoded.id).select("-password");

//     if (!student) {
//       return res.status(401).json({ message: "Student not found" });
//     }

//     req.user = student;
//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error.message);
//     return res.status(401).json({
//       message: error.name === "TokenExpiredError"
//         ? "Token expired. Please login again."
//         : "Invalid or expired token",
//     });
//   }
// };


import jwt from "jsonwebtoken";
import Student from "../models/student.js";

// export const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
// if (!authHeader || !authHeader.startsWith("Bearer ")) {
//   return res.status(401).json({ message: "No token provided or format invalid" });
// }
//     const token = authHeader.split(" ")[1];

//     // 🛑 Malformed token check
//     if (
//       !token ||
//       token === "null" ||
//       token === "undefined" ||
//       token.split(".").length !== 3
//     ) {
//       return res.status(401).json({ message: "Malformed or invalid token" });
//     }

//     // ✅ Token verify
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       console.error("JWT Verify Error:", err.message);
//       return res.status(401).json({
//         message:
//           err.name === "TokenExpiredError"
//             ? "Token expired. Please login again."
//             : "Invalid or expired token",
//       });
//     }

//     // ✅ Find user from DB
//     const student = await Student.findById(decoded.id).select("-password");

//     if (!student) {
//       return res.status(401).json({ message: "Student not found" });
//     }

//     req.user = student; // You can access req.user in next handlers
//     next();
//   } catch (error) {
//     console.error("Protect Middleware Error:", error.message);
//     return res.status(500).json({ message: "Server error in auth middleware" });
//   }
// };


export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const student = await Student.findById(decoded.id).select("-password");

      if (!student) {
        return res.status(401).json({ message: "Student not found" });
      }

      req.user = student; // ✅ सुरक्षित रूपमा set
      next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      return res.status(401).json({
        message:
          error.name === "TokenExpiredError"
            ? "Token expired. Please login again."
            : "Token invalid.",
      });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
};



export const protect1 = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Student.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
