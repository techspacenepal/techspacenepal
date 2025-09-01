import mongoose from 'mongoose';

const FooterPaymentLogoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  modalImage: { type: String, required: false },
}, { timestamps: true });

export default mongoose.models.FooterPaymentLogo || mongoose.model('FooterPaymentLogo', FooterPaymentLogoSchema);
