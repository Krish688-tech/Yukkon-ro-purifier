/*import razorpay from "../utils/razorpay.js";
import crypto from "crypto";
import Order from "../models/Order.js";
import jwt from "jsonwebtoken";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  const decoded = jwt.verify(req.headers.authorization, "SECRET_KEY");
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    cart,
    amount,
    userDetails
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expected === razorpay_signature) {
    await Order.create({
      products: cart,
      amount,
      userDetails,
      paymentId: razorpay_payment_id,
      status: "paid",
    });

    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
};*/