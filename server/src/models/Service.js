// models/Service.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String, // icon URL or icon name
});

export default mongoose.model('Service', serviceSchema);
