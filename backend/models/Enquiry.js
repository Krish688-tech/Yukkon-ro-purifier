import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    whatsapp: String,
    message: String,
    productName: String,
    productImage: String,
    status: {
      type: String,
      enum: ["new", "contacted", "sold"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);