import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one cart per user
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        image: String,
        qty: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);