import Auth from '../models/Auth.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};




// Utility to validate strong password
const isStrongPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
};

export const registerAdmin = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
      });
    }

    // Validate allowed roles
    const allowedRoles = ['user', 'admin'];
    const finalRole = allowedRoles.includes(role) ? role : 'user';

    const newUser = new Auth({
      username,
      email,
      password,
      role: finalRole,
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful!', user: { username, email, role: finalRole } });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error. Could not register user.' });
  }
};




export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Auth.findOne({ email });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      username: admin.username, // or name, whatever you use
      role: admin.role,         // << send this!
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




// logout --------------------

export const logoutAdmin = async (req, res) => {
    try {
    const user = await Auth.findById(req.user.id); // req.user from protect middleware
    if (user) {
      user.active = false;
      await user.save();
    }

    res.clearCookie('adminToken');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error });
  }
};


// ✅ Get Admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Auth.findById(req.params.id);
    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ username: admin.username });
  } catch (err) {
    console.error('Get Admin Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await Auth.findById(req.params.id);
    if (!user || user.role !== 'user') {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ username: user.username });
  } catch (err) {
    console.error('Get User Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get All Users

export const getAllUsers = async (req, res) => {
  try {
    const users = await Auth.find().select("-password"); // password field हटाइएको
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};



// ✅ Delete by ID
export const deleteUserById = async (req, res) => {
  try {
    const user = await Auth.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// UPDATE user by email
export const updateUserByEmail = async (req, res) => {
  try {
    const user = await Auth.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Auth.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Login सफल हुँदा active true set गर्ने
    user.active = true;
    await user.save();

    // Token generate
    // const token = generateToken(user);

    const token = generateToken(user._id, user.role);

    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




export const logout = async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndUpdate(userId, { active: false });
    res.status(200).json({ message: 'Logout successfull, active false ' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};






export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `You requested a password reset. Please go to: ${resetUrl}`;

    await sendEmail({ email: user.email, subject: 'Password Reset', message });

    // *** IMPORTANT: send resetToken also ***
    res.status(200).json({ 
      message: 'Password reset email sent',
      resetToken // send this token to frontend for redirect
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await Auth.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // token expiry check
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    // Set new password (hashing handled by pre-save middleware in Auth model)
    user.password = password;

    // Remove reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({ message: 'Password changed successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};





//// google login -------------------

export const googleLogin = async (req, res) => {
  const { email, googleId, username } = req.body;

  try {
    let user = await Auth.findOne({ email });

    if (user) {
      // यदि user पहिले नै छ भने, check googleId
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // नयाँ प्रयोगकर्ता create गर्नुहोस्
      user = await Auth.create({
        username,
        email,
        googleId,
        role: 'user',
        active: true,
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      token,
      role: user.role,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: 'Google login failed', error });
  }
};