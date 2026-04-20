//import express from "express";
//import { saveOrder, getOrders, getTopSellingProducts } from "../controllers/orderController.js";

//const router = express.Router();

// ✅ Save order (after Razorpay)
//router.post("/verify-payment", saveOrder);

// ✅ Get orders (by userId)
//router.get("/orders/:userId", getOrders);

// ✅ Top Selling orders
//router.get("/top-products", getTopSellingProducts);

//export default router;

import express from "express";
import {
  saveOrder,
  getOrders,
  getTopSellingProducts,
  saveCODOrder,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";


const router = express.Router();

// ✅ Top Selling (keep FIRST)
router.get("/top-products", getTopSellingProducts);

// ✅ Save order (after Razorpay)
router.post("/verify-payment", saveOrder);

router.post("/cod-order", protect, saveCODOrder);

router.get("/admin/orders", protect, adminOnly, (req, res, next) => {
  console.log("ADMIN ORDERS HIT");
  next();
}, getAllOrders);

// ✅ Get orders (by userId)
router.get("/:userId", getOrders);

router.put("/update-order-status/:id", updateOrderStatus);

export default router;