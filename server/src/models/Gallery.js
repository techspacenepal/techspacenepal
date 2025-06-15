import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  student: { type: String, required: true },
  college: { type: String, required: true },
  faculty:{ type: String, required: true },
  company: { type: String, required: true },
  designation: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.model("Gallery", gallerySchema);
