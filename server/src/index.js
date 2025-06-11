// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import dbConnect from './db/connection.js';
import inquiryRoutes from './routes/inquiryRoute.js'
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import Auth from './models/Auth.js';
import contactRoutes from './routes/contactRoutes.js';
import session from 'express-session';
import jwt from "jsonwebtoken";
import './utils/passport.js';
import passport from 'passport';

const app = express();
dotenv.config();
dbConnect();


// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use('/api/inquiry', inquiryRoutes);


app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);


// Test route (optional)
app.get("/api/auths", async (req, res) => {
  try {
    const auths = await Auth.find();
    res.json({ success: true, auths });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});





app.use(session ({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session())


// Error Handling Middleware
app.use(errorMiddleware);




// Google OAuth login endpoint
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback endpoint
app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  (req, res) => {
    // Create JWT token after successful login
    const user = req.user;
    const token = jwt.sign(
      { id: user.googleId, email: user.email, name: user.name, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    // Redirect to frontend with token (as query param or better use cookies)
    res.redirect(`${process.env.FRONTEND_URL}/dashboard/adminDashboard?token=${token}`);
  }
);




//--------------------

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: "some_secret",
    resave: false,
    saveUninitialized: true,
  })
);







const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on ${port}`);
});



