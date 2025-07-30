import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "", enum: ["buyer", "seller", "admin"] },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    token: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("ecomUser", userSchema);
