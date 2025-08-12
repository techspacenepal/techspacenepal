// import jwt from 'jsonwebtoken';
// import  Auth  from '../models/authModel.js'; // Add `.js` extension if using ES6 modules

// export const protectAdmin = async (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await Auth.findById(decoded.id);

//     if (!user || user.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// middlewares/protect.js
import jwt from 'jsonwebtoken';
import Auth from '../models/Auth.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if token is in header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Attach full user info including role to request
      req.user = await Auth.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      console.error('JWT verification failed:', err);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
