import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  course: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  message: { type: String, required: true },
}, {
  timestamps: true,
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
