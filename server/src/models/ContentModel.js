import mongoose from 'mongoose';

const AccordionItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const ContentSchema = new mongoose.Schema({
  sectionText: { type: String, required: true },
  syllabus: [AccordionItemSchema],
  faq: [AccordionItemSchema],
}, { timestamps: true });

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);
