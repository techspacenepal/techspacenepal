// models/LoginSession.js

import mongoose from "mongoose";

const loginSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  deviceInfo: { type: String, required: true },
  ipAddress: { type: String, required: true },
  loginAt: { type: Date, default: Date.now },
  logoutAt: { type: Date },         // optional, logout time
  isActive: { type: Boolean, default: true },  // session active or logged out
});

const LoginSession = mongoose.models.LoginSession || mongoose.model("LoginSession", loginSessionSchema);

export default LoginSession;
