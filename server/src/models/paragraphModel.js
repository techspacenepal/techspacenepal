import mongoose from 'mongoose';

const paragraphSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Paragraph || mongoose.model('Paragraph', paragraphSchema);
