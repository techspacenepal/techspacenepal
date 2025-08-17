import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  email: {
    type: [String],  // multiple emails
    required: true
  },
  phone: {
    type: [String],  // multiple phones
    required: true
  },
  whatsapp: {
    type: String,
    required: true
  },
  socialLinks: {
    facebook: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' },
    tiktok: { type: String, default: '' },
    whatsapp: { type: String, default: '' }
  }
});

export default mongoose.model('ContactInfo', contactInfoSchema);
