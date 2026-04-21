import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";

// ROUTES
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import cartRoutes from "./routes/cart.js";
//import paymentRoutes from "./routes/payment.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import session from "express-session";
import passport from "./config/passport.js";
import seedAdmin from "./seedAdmin.js";

const app = express();

// ================= MIDDLEWARES =================
const allowedOrigins = [
  "http://localhost:5173",
  "https://yukkon-ro-purifier-ra2r.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

// ================= ROUTES =================

// AUTH
app.use("/api/auth", authRoutes);

// USERS
app.use("/api/users", userRoutes);

// ADMIN
app.use("/api/admin", adminRoutes);

// ORDERS
app.use("/api/orders", orderRoutes);

// CONTACT
app.use("/api", contactRoutes);

// REVIEWS
app.use("/api/reviews", reviewRoutes);

// CART
app.use("/api/cart", cartRoutes);

// WISHLIST
//app.use("/api/wishlist", wishlistRoutes);

// ENQUIRY
app.use("/api/enquiry", enquiryRoutes);

//PAYMENT
//app.use("/api/payment", paymentRoutes);

app.set("trust proxy", 1);
// SESSION (for Google OAuth)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// ================= START SERVER =================
const startServer = async () => {
  try {
    await connectDB(); // connect DB
    await seedAdmin(); // auto-create admin

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server start error:", err);
  }
};

startServer();

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err);
  res.status(500).json({ message: "Server Error" });
});
