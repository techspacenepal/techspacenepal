import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  student: { type: String, required: true },
  college: { type: String, required: true },
  address: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.model("Gallery", gallerySchema);
