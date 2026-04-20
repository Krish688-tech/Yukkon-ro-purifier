import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { submitEnquiry } from "../controllers/enquiryController.js";
import {
  getAllEnquiries,
  updateStatus,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/submit", submitEnquiry);
router.get("/all", protect, adminOnly, getAllEnquiries);
router.put("/:id/status", protect, adminOnly, updateStatus);
router.delete("/:id", protect, adminOnly, deleteEnquiry);

export default router;