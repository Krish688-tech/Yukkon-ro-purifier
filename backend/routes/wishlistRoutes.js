import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ✅ GET Wishlist
router.get("/", protect, async (req, res) => {
  try {
    console.log("USER ID:", req.user._id);
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user.wishlist || []);
  } catch (err) {
    console.error("WISHLIST ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
});


// ✅ TOGGLE Wishlist (ADD + REMOVE)
router.post("/toggle", protect, async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const exists = user.wishlist.find(
      (item) => item.productId === productId
    );

    if (exists) {
      user.wishlist = user.wishlist.filter(
        (item) => item.productId !== productId
      );
    } else {
      user.wishlist.push({ productId });
    }

    await user.save();

    res.json(user.wishlist);
  } catch (err) {
    console.error("TOGGLE ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
});



export default router;