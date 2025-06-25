import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String, // icon URL or path
});

export default mongoose.model('Service', serviceSchema);
