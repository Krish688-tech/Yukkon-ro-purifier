import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,

  items: [
    {
      productId: String,
      name: String,
      qty: Number,
      price: Number,
    },
  ],

  amount: Number,

  shipping: {
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String,
  },

  paymentMethod: {
  type: String,
  enum: ["online", "COD"],
  default: "online",
},

status: {
  type: String,
  enum: ["pending", "paid", "shipped", "delivered"],
  default: "pending",
},

orderId: {
  type: String,
  required: true,
  unique: true,
  index: true,
},
  paymentId: String,
  razorpayOrderId: String,

}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);