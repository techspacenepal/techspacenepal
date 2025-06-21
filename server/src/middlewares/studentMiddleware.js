
import jwt from 'jsonwebtoken';
import Student from '../models/student.js';

// export const protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await Student.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       console.error("Auth Middleware Error:", error);
//       res.status(401).json({ message: "Not authorized" });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: "No token provided" });
//   }
// };


export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const student = await Student.findById(decoded.id).select("-password");

      if (!student) {
        return res.status(401).json({ message: "Student not found" });
      }

      req.user = student;
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      console.error("❌ Invalid Token:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};



