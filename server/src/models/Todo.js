import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'student', 'admin'], required: true },
  text: { type: String, required: true },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
