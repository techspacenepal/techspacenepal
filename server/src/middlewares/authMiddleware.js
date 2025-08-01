// server/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Auth from '../models/Auth.js'; // Or User model


export const protect = async (req, res, next) => {
  try {
    const token =
      req.cookies.adminToken ||
      req.cookies.teacherToken ||
      req.headers.authorization?.split(" ")[1];
      console.log("Token received in middleware:", token);

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

    // ✅ Check if the user (admin/teacher) is blocked
    if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account has been blocked by the institute. Please contact support.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Protect Middleware Error:", error.message);
    return res.status(500).json({ message: "Server error in auth middleware" });
  }
};


// export const protect = async (req, res, next) => {
//   let token;

//   if (req.cookies && (req.cookies.adminToken || req.cookies.teacherToken)) {
//     token = req.cookies.adminToken || req.cookies.teacherToken;
//   } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     let user;

//     if (decoded.role === "student") {
//       user = await Student.findById(decoded.id).select("-password");
//     } else {
//       user = await Auth.findById(decoded.id).select("-password");
//     }

//     if (!user) return res.status(401).json({ message: "User not found" });
//     if (user.isBlocked) return res.status(403).json({ message: "Account blocked" });

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Token invalid or expired" });
//   }
// };



// export const admin = (req, res, next) => {
//   if (req.user && req.user.isAdmin) {
//     next();
//   } else {
//     res.status(403).json({ message: 'Admin access required' });
//   }
// };


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




export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};


export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};









export const adminOnly = admin; // दुई अलग नाम नदिनु पनि हुन्छ, एउटै बनाउनु राम्रो हो
