

import jwt from "jsonwebtoken";
import Student from "../models/student.js";


// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const student = await Student.findById(decoded.id).select("-password");

//       if (!student) {
//         return res.status(401).json({ message: "Student not found" });
//       }

//       req.user = student; 
//       next();
//     } catch (error) {
//       console.error("JWT Error:", error.message);
//       return res.status(401).json({
//         message:
//           error.name === "TokenExpiredError"
//             ? "Token expired. Please login again."
//             : "Token invalid.",
//       });
//     }
//   } else {
//     return res.status(401).json({ message: "Not authorized, token missing" });
//   }
// };


export const protect = async (req, res, next) => {
  let token;

  console.log("[Backend] Authorization header:", req.headers.authorization); // Debug authorization header

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("[Backend] Extracted token:", token); // Debug extracted token

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("[Backend] Decoded token:", decoded); // Debug decoded token

      const student = await Student.findById(decoded.id).select("-password");
      if (!student) {
        return res.status(401).json({ message: "Student not found" });
      }

      req.user = student;
      next();
    } catch (error) {
      console.error("[Backend] JWT verification error:", error.message);
      return res.status(401).json({
        message:
          error.name === "TokenExpiredError"
            ? "Token expired. Please login again."
            : "Token invalid.",
      });
    }
  } else {
    console.log("[Backend] No token found in authorization header");
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
};





export const isStudent = (req, res, next) => {
  if (req.user?.role === "student") next();
  else res.status(403).json({ message: "Only students can send notifications" });
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
