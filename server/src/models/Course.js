import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String, 
  duration: String,
  image: String, 
  status: {
  type: String,
  // enum: ['draft', 'published'],
  // default: 'draft'
}

});

export default mongoose.model('Course', courseSchema);
