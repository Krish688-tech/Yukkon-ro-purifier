import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  features: String,
  description: String,
  category: String,
  type: String
});

export default mongoose.model("Product", productSchema);