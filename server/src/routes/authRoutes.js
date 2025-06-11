import express from 'express';
import { registerAdmin, loginAdmin, logoutAdmin, getAdminById, getUserById, getAllUsers,  updateUserByEmail, login, logout, forgotPassword, resetPassword, deleteUserById } from '../controllers/authController.js';
import { authenticateToken, protect } from '../middlewares/authMiddleware.js';
import Auth from '../models/Auth.js';
// import { protectSuperAdmin } from '../middlewares/protectSuperAdmin.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/get-admin/:id', getAdminById); // ✅ New route
router.get('/get-user/:id', getUserById);
router.get('/users', getAllUsers);
router.delete('/:id', protect, deleteUserById);

router.put("/users/:email", updateUserByEmail);
router.post('/login', login);
router.post('/logout', authenticateToken, logout)
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// In authRoutes.js or similar

// GET /api/users - fetch all users or just user count
router.get("/", async (req, res) => {
  try {
    const users = await Auth.find(); // fetch all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching users" });
  }
});



 

export default router;