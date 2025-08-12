import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  value: { type: Number, required: true },
  label: { type: String, required: true }
});

export default mongoose.model('Stat', statSchema);
