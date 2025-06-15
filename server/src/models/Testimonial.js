import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: String,
  course: String,
  message: String,
  image: String
}, {
  timestamps: true
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
