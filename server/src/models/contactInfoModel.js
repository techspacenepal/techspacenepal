import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  address: String,
  email: String,
  phone: String,
  whatsapp: String,
  socialLinks: {
    facebook: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    youtube: String,
    tiktok: String,     // <-- Added TikTok here
    whatsapp: String,   // <-- Added WhatsApp here (if you want socialLinks.whatsapp separate from main whatsapp field)
  },
}, { timestamps: true });

export default mongoose.model('ContactInfo', contactInfoSchema);
