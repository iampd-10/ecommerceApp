// this is sessionSchema.js
import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "ecomUser", required: true },
        accessToken: { type: String, required: true },
        refreshToken: { type: String, required: true },

    },
    { timestamps: true }
);
export default mongoose.model("SessionEcom", sessionSchema);