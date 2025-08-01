// import dotenv from 'dotenv';
// dotenv.config();

// const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'adminsecrettoken';

// const adminAuth = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   const token = authHeader.split(' ')[1];

//   if (token !== ADMIN_TOKEN) {
//     return res.status(403).json({ message: 'Unauthorized, invalid token' });
//   }

//   next();
// };

// export default adminAuth;



import jwt from "jsonwebtoken";
import Auth from "../models/Auth.js";

export const protectAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token दिइएको छैन।" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    const admin = await Auth.findById(decoded.id);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Admin मात्र यो access गर्न सक्छ।" });
    }

    if (admin.isBlocked) {
      return res.status(403).json({ message: "Blocked account." });
    }

    req.user = admin;
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(401).json({ message: "Token अवैध वा expire भएको छ।" });
  }
};


