import Enquiry from "../models/Enquiry.js";
import nodemailer from "nodemailer";

export const submitEnquiry = async (req, res) => {
  const { name, email, whatsapp, message, productName, productImage } =
    req.body;

  try {
    // ✅ 1. Save to MongoDB
    const newEnquiry = await Enquiry.create({
      name,
      email,
      whatsapp,
      message,
      productName,
      productImage,
    });

    // ✅ 2. Send Email to Company
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Yukkon Website" <${process.env.EMAIL_USER}>`,
      to: process.env.COMPANY_EMAIL,
      subject: `New Enquiry - ${productName}`,
      html: `
        <h2>New Enquiry Received 📩</h2>

        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>WhatsApp:</b> ${whatsapp}</p>
        <p><b>Product:</b> ${productName}</p>
        <p><b>Message:</b> ${message}</p>

        <br/>
        <img src="${productImage}" width="150" />
      `,
    });

    res.json({
      success: true,
      message: "Enquiry saved & email sent",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to submit enquiry",
    });
  }

};

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // ✅ take status from frontend

    // Optional: validate status
    const allowedStatuses = ["new", "contacted", "sold"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status }, // ✅ dynamic status
      { new: true }
    );

    res.json(enquiry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};