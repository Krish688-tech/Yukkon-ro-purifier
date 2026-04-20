import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    phone: String,
    address: String,
    avatar: String,

    city: String,
    state: String,
    pincode: String,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
