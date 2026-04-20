import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ✅ GET CART
router.get("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.json(cart || { items: [] });
});


// ✅ ADD TO CART
router.post("/add", protect, async (req, res) => {
  const { product } = req.body;

    // ✅ ADD THIS BLOCK
  if (!product || !product.id) {
    return res.status(400).json({ msg: "Invalid product data" });
  }

  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({
      userId: req.user.id,
      items: [],
    });
  }

  const existing = cart.items.find(
    (item) => Number(item.productId) === Number(product.id)
  );

  if (existing) {
    existing.qty += product.qty;
  } else {
    cart.items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0],
      qty: product.qty,
    });
  }

  await cart.save();
  res.json(cart);
});


// ✅ UPDATE QTY
router.put("/update", protect, async (req, res) => {
  const { productId, qty } = req.body;

  const cart = await Cart.findOne({ userId: req.user.id });

const item = cart.items.find(
  (i) => Number(i.productId) === Number(productId)
);

  if (item) item.qty = qty;

  cart.items = cart.items.filter((i) => i.qty > 0);

  await cart.save();
  res.json(cart);
});


// ✅ REMOVE ITEM
router.delete("/remove/:id", protect, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });

  cart.items = cart.items.filter(
    (item) => Number(item.productId) !== Number(req.params.id)
  );

  await cart.save();
  res.json(cart);
});


// ✅ CLEAR CART
router.delete("/clear", protect, async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user.id });
  res.json({ msg: "Cart cleared" });
});

export default router;