import dotenv from 'dotenv';
dotenv.config();

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'adminsecrettoken';

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({ message: 'Unauthorized, invalid token' });
  }

  next();
};

export default adminAuth;
