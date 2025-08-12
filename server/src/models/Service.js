import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String, // icon URL or path
  imageUrl: { type: String },
  heading: { type: String },   // ✅ Added
  content: { type: String }    // ✅ Added
});

export default mongoose.model('Service', serviceSchema);
