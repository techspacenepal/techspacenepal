import mongoose from 'mongoose';

const homeSlideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  src: { type: String, required: true },
  type: { type: String, default: 'image' },
}, { timestamps: true });

export default mongoose.model('Slide', homeSlideSchema);
