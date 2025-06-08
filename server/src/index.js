// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import dbConnect from './db/connection.js';
import { submitInquiry } from './controllers/inquiryController.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import Auth from './models/Auth.js';


const app = express();
dotenv.config();
dbConnect();


// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use("/api/inquiry", submitInquiry)


app.use('/api/auth', authRoutes);


// Test route (optional)
app.get("/api/auths", async (req, res) => {
  try {
    const auths = await Auth.find();
    res.json({ success: true, auths });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



// Error Handling Middleware
app.use(errorMiddleware);






const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on ${port}`);
});
