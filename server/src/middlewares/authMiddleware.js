// server/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Auth from '../models/Auth.js'; // Or User model

// export const protect = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Token missing" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await Auth.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = {
//       id: user._id,
//       role: user.role,
//       username: user.username,
//       email: user.email,
//     };

//     next(); // ⚠️ यो next() नभएसम्म req.user आउँदैन
//   } catch (error) {
//     res.status(403).json({ message: "Invalid token" });
//   }
// };


export const protect = async (req, res, next) => {
  try {
    // ✅ Try token from cookie first, then Authorization header
    const token = req.cookies.adminToken || req.cookies.teacherToken || req.headers.authorization?.split(" ")[1];

    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({ message: "No token provided or invalid format" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message:
          err.name === "TokenExpiredError"
            ? "Token expired. Please login again."
            : "Invalid or expired token",
      });
    }

    const user = await Auth.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Protect Middleware Error:", error.message);
    return res.status(500).json({ message: "Server error in auth middleware" });
  }
};


export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};


 export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};





export const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};