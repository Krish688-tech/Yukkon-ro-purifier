import express from "express";
import Order from "../models/Order.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL ORDERS
router.get("/orders", protect, adminOnly, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const isSearching = search.trim() !== "";

    // 🔥 SEARCH FILTER
    const query = isSearching
      ? {
          $or: [
            { orderId: { $regex: search, $options: "i" } },
            { "shipping.name": { $regex: search, $options: "i" } },
            { "shipping.phone": { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await Order.countDocuments(query);

    let ordersQuery = Order.find(query).sort({ createdAt: -1 });

    // ✅ Apply pagination only if NOT searching
    if (!isSearching) {
      ordersQuery = ordersQuery.skip(skip).limit(limit);
    }

    const orders = await ordersQuery;

    res.json({
      orders,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching orders" });
  }
});

export default router;