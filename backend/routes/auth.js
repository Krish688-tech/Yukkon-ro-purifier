import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {registerUser, loginUser } from "../controllers/authController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


// 🔥 GOOGLE LOGIN
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔥 CALLBACK
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // redirect to frontend
    res.redirect(`http://localhost:5173/google-success?token=${token}`);
  }
);

// GET CURRENT USER
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "No token" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ user });

  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Invalid token" });
  }
});

export default router;