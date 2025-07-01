
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const authSchema = new mongoose.Schema(
//   {
//      username: {
//     type: String,
//     required: true,
//     trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       minlength: 6,
//     },
//     provider: { type: String, default: "google" },

//     role: {
//       type: String,
//       enum: ["user", "admin", "teacher"],
//       default: "user",
//     },
//     active: {
//       type: Boolean,
//       default: false,
//     },
//     resetOTP: String,
//     resetOTPExpiry: Date,
//   },
//   { timestamps: true }
// );

// // ✅ Hash password only if it exists and is modified
// authSchema.pre("save", async function (next) {
//   if (!this.isModified("password") || !this.password) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     return next(err);
//   }
// });

// // ✅ Password comparison method (for local login only)
// authSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const Auth = mongoose.models.Auth || mongoose.model("Auth", authSchema);
// export default Auth;
// // 👇 IMPORTANT: register as "User"
// const User = mongoose.models.User || mongoose.model("User", authSchema);
// export default User;



import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
    },
    provider: { type: String, default: "google" },
    role: {
      type: String,
      enum: ["user", "admin", "teacher"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: false,
    },
    resetOTP: String,
    resetOTPExpiry: Date,
  },
  { timestamps: true }
);

// 🔐 Hash password
authSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// 🔍 Compare password
authSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Register both models using same schema
const Auth = mongoose.models.Auth || mongoose.model("Auth", authSchema);
const User = mongoose.models.User || mongoose.model("User", authSchema);

// ✅ Export both
export { Auth, User };

// 🔁 Export Auth as default if needed
export default Auth;
