import Inquiry from "../models/Inquiry.js";
import axios from "axios";

export const submitInquiry = async (req, res) => {
  const { course, fullName, email, mobile, message } = req.body;

  // if (!token) {
  //   return res.status(400).json({ message: "reCAPTCHA token is missing" });
  // }

  try {
    // Verify reCAPTCHA token
    // const response = await axios.post(
    //   `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    // );

    // if (!response.data.success) {
    //   return res.status(400).json({ message: "reCAPTCHA verification failed" });
    // }

    // Save inquiry
    const inquiry = new Inquiry({ course, fullName, email, mobile, message });
    await inquiry.save();

    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("Inquiry error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


