import jwt from "jsonwebtoken";
import Student from "../models/student.js";
import Auth from "../models/Auth.js";

export const protectAll = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user;

      if (decoded.role === "student") {
        user = await Student.findById(decoded.id).select("-password");
      } else if (["admin", "superadmin", "user"].includes(decoded.role)) {
        // ✅ Handle admin, superadmin, user
        user = await Auth.findById(decoded.id).select("-password");
      } else {
        return res.status(403).json({ message: "Unauthorized role" });
      }

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (user.isBlocked) {
        return res.status(403).json({ message: "Account is blocked" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("JWT Error:", err.message);
      return res.status(401).json({ message: "Token invalid or expired" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};
