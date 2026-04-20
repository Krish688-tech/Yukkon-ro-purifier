import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("REQ.USER:", req.user);

    const userId = req.user.id; 
    const { name, email, phone, address, city, state, pincode } = req.body;

    let avatarUrl;

    if (req.file) {
      avatarUrl = req.file.path || req.file.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(city && { city }),
        ...(state && { state }),
        ...(pincode && { pincode }),
        ...(avatarUrl && { avatar: avatarUrl }),
      },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("💥 REAL ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
