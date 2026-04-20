import express from "express";
import { updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

// 🔥 important: upload.single("avatar")
router.put("/update-profile", protect, upload.single("avatar"), updateProfile);

export default router;