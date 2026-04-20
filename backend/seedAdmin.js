import User from "./models/User.js";
import bcrypt from "bcryptjs";

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "srajesh007259@gmail.com" });

    if (existingAdmin) {
      console.log("⚡ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "srajesh007259@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
};

export default seedAdmin;