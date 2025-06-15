import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: String,
  category: String,
  duration: String,
  image: String, // image path string
});

export default mongoose.model('Course', courseSchema);
