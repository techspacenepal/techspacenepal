import jwt from 'jsonwebtoken';
import  Auth  from '../models/authModel.js'; // Add `.js` extension if using ES6 modules

export const protectAdmin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Auth.findById(decoded.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


// export const protectSuperAdmin = async (req, res, next) => {
//   let token;

//   // First try from cookies
//   if (req.cookies.token) {
//     token = req.cookies.token;
//   }

//   // Then try from Authorization header
//   else if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await Auth.findById(decoded.id);

//     if (!user || user.role !== 'superadmin') {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };