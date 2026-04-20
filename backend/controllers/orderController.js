import Order from "../models/Order.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


// 📧 COMMON EMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ==============================
// ✅ CREATE ORDER ID
// ==============================
const generateOrderId = () => {
  const prefix = "YUKKON";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${prefix}-${date}-${random}`;
};


// ==============================
// ✅ SAVE ONLINE PAYMENT ORDER
// ==============================
export const saveOrder = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      cart,
      amount,
      shipping,
    } = req.body;

    const paymentMethod = "Online";

    const orderId = generateOrderId();

    const order = new Order({
      orderId,
      userId: req.user._id,
      items: cart,
      amount,
      shipping,
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      paymentMethod,
      status: "paid",
    });

    await order.save();

    res.json({
      success: true,
      orderId: order.orderId,
    });

     console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

    // 📧 Send emails (non-blocking)
    try {
      // ADMIN EMAIL
      await transporter.sendMail({
        from: `"Yukkon Store" <${process.env.EMAIL_USER}>`,
        to: process.env.COMPANY_EMAIL,
        subject: `🛒 New Order - ${paymentMethod}`,
        html: `
          <h2>New Order Received</h2>

          <p><b>Name:</b> ${shipping.name}</p>
          <p><b>Email:</b> ${req.user.email}</p>
          <p><b>Phone:</b> ${shipping.phone}</p>

          <p><b>Address:</b> ${shipping.address}, ${shipping.city}</p>

          <p><b>Amount:</b> ₹${amount}</p>
          <p><b>Payment:</b> ${paymentMethod}</p>

          <h3>Items:</h3>
          <ul>
            ${cart
              .map(
                (item) => `
                <li>${item.name} x ${item.qty} - ₹${item.price}</li>
              `
              )
              .join("")}
          </ul>
        `,
      });

      // USER EMAIL
      await transporter.sendMail({
        from: `"Yukkon Store" <${process.env.EMAIL_USER}>`,
        to: req.user.email,
        subject: "✅ Order Confirmed",
        html: `
          <h2>Hi ${shipping.name},</h2>

          <p>Thank you for your order 🛍️</p>

          <p>Your order has been successfully placed and is being processed.</p>

          <p><b>Total Amount:</b> ₹${amount}</p>
          <p><b>Payment Method:</b> ${paymentMethod}</p>

          <br/>

          <p>🚚 We will ship your order as soon as possible.</p>
          <p>You will receive updates shortly.</p>

          <br/>

          <p>Thanks & Regards,<br/>Yukkon Team</p>
        `,
      });
    } catch (emailErr) {
      console.error("EMAIL ERROR:", emailErr);
    }

  } catch (err) {
    console.error("SAVE ORDER ERROR:", err);
    res.status(500).json({ success: false, msg: "Order save failed" });
  }
};


// ==============================
// ✅ SAVE COD ORDER
// ==============================
export const saveCODOrder = async (req, res) => {
  try {
    const { cart, amount, shipping } = req.body;

    const paymentMethod = "COD";
    const orderId = generateOrderId();
    const order = new Order({
      orderId,
      userId: req.user._id,
      items: cart,
      amount,
      shipping,
      paymentMethod,
      status: "pending",
    });
    // save to DB
    await order.save();

    res.json({
      success: true,
      orderId: order.orderId,
    });

    // 📧 Send emails safely
    try {
      // ADMIN EMAIL
      await transporter.sendMail({
        from: `"Yukkon Store" <${process.env.EMAIL_USER}>`,
        to: process.env.COMPANY_EMAIL,
        subject: `🛒 New Order - ${paymentMethod}`,
        html: `
          <h2>New Order Received</h2>

          <p><b>Name:</b> ${shipping.name}</p>
          <p><b>Email:</b> ${req.user.email}</p>
          <p><b>Phone:</b> ${shipping.phone}</p>

          <p><b>Address:</b> ${shipping.address}, ${shipping.city}</p>

          <p><b>Amount:</b> ₹${amount}</p>
          <p><b>Payment:</b> ${paymentMethod}</p>
          <p><b>Order ID:</b> ${orderId} </p>
          <h3>Items:</h3>
          <ul>
            ${cart
              .map(
                (item) => `
                <li>${item.name} x ${item.qty} - ₹${item.price}</li>
              `
              )
              .join("")}
          </ul>
        `,
      });

      // USER EMAIL
      await transporter.sendMail({
        from: `"Yukkon Store" <${process.env.EMAIL_USER}>`,
        to: req.user.email,
        subject: "✅ Order Confirmed",
        html: `
          <h2>Hi ${shipping.name},</h2>
          <h3>Items:</h3>
          <ul>
            ${cart
              .map(
                (item) => `
                <li>${item.name} x ${item.qty} - ₹${item.price}</li>
              `
              )
              .join("")}
          </ul>

          <p>Thank you for your order 🛍️</p>
          
          <p><b>Order ID:</b> ${orderId} </p>
          <p>Your order has been successfully placed and is being processed.</p>

          <p><b>Total Amount:</b> ₹${amount}</p>
          <p><b>Payment Method:</b> ${paymentMethod}</p>

          <br/>

          <p>🚚 We will ship your order as soon as possible.</p>
          <p>You will receive updates shortly.</p>

          <br/>

          <p>Thanks & Regards,<br/>Yukkon Team</p>
        `,
      });
    } catch (emailErr) {
      console.error("EMAIL ERROR:", emailErr);
    }

  } catch (err) {
    console.error("COD ORDER ERROR:", err);
    res.status(500).json({ success: false, msg: "COD order failed" });
  }
};

// ==============================
// 📦 GET USER ORDERS
// ==============================
export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching orders" });
  }
};

// ==============================
// 🛒 GET ALL ORDERS (ADMIN)
// ==============================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching orders" });
  }
};

// ==============================
// 🔥 TOP SELLING PRODUCTS
// ==============================
export const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.qty" },
          name: { $first: "$items.name" },
          price: { $first: "$items.price" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 6 },
    ]);

    res.json(topProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching top products" });
  }
};

// ==============================
// 🔄 UPDATE ORDER STATUS (ADMIN)
// ==============================
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Only allow pending -> paid (for COD)
    if (order.status === "pending") {
      order.status = "paid";
    }

    await order.save();

    res.json({
      success: true,
      message: "Order marked as paid",
      order,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error updating status" });
  }
};