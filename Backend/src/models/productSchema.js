import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        stock: { type: Number, default: 0 },
        sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "ecomUser", required: true },
        images: [{ type: String }], // Array of image URLs
        ratings: { type: Number, default: 0 },
        reviews: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "ecomUser", required: true },
                comment: { type: String, required: true },
                rating: { type:Number, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ]
    },
    { timestamps: true }
);
export default mongoose.model("ProductEcom", productSchema);