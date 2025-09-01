import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Logo || mongoose.model("Logo", logoSchema);
