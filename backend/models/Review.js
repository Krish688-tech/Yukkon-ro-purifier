import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      index: true,
    },

    userId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      minlength: 5,
    },

    images: [String],

    // 🔥 Future-ready (optional)
    isVerifiedBuyer: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // replaces createdAt
);

// 🚫 Prevent duplicate reviews (1 user → 1 review per product)
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);