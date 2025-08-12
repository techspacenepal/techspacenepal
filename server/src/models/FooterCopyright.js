import mongoose from 'mongoose';

const FooterCopyrightSchema = new mongoose.Schema({
  text: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.FooterCopyright || mongoose.model('FooterCopyright', FooterCopyrightSchema);
