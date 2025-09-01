import mongoose from "mongoose";

const upcommingregistrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    course: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const Registration = mongoose.models.Registration || mongoose.model("Registration", upcommingregistrationSchema);
export default Registration;
