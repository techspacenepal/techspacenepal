// src/database/connection.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Adjust path as per location

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URI);

    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default dbConnect;
