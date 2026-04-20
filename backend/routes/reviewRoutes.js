import express from "express";
import Review from "../models/Review.js";

const router = express.Router();


// 🔹 GET reviews by product
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    const reviews = await Review.find({ productId })
      .sort({ createdAt: -1 });

    // ⭐ Calculate average rating
    const total = reviews.length;
    const avgRating =
      total === 0
        ? 0
        : reviews.reduce((acc, r) => acc + r.rating, 0) / total;

    res.json({
      reviews,
      total,
      avgRating: Number(avgRating.toFixed(1)),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 POST new review
router.post("/", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;