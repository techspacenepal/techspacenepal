import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  course: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false }, // ✅ New field added
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
