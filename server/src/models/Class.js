import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  duration: String,
  imageUrl: String
});

export default mongoose.model("Class", classSchema);
