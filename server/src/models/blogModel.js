import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now },
  views: [
    {
      name: String,
      email: String,
      viewedAt: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
