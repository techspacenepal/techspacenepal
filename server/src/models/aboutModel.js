import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  imageUrl: { type: String }
}, { timestamps: true });

export default mongoose.model('About', aboutSchema);
