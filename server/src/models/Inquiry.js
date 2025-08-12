import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    course: { type: String, required: true },
    message: { type: String, required: true },
      seen: { type: Boolean, default: false }, // ✅ New field added
  },
  
  { timestamps: true }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
