import nodemailer from "nodemailer";

export const submitContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // 👉 Save to DB (optional)
    // await Contact.create({ nam, email, message });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 Send to company
    await transporter.sendMail({
      from: `"YUKKON Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Contact Query - YUKKON",
      html: `
  <div style="font-family: Arial; padding:20px;">
    <h2 style="color:#2563eb;">New Inquiry Received 💧</h2>

    <table style="width:100%; border-collapse:collapse;">
      <tr>
        <td style="padding:8px;"><b>Name:</b></td>
        <td>${name}</td>
      </tr>
      <tr>
        <td style="padding:8px;"><b>Email:</b></td>
        <td>${email}</td>
      </tr>
      <tr>
        <td style="padding:8px;"><b>Phone:</b></td>
        <td>${phone}</td>
      </tr>
      <tr>
        <td style="padding:8px;"><b>Message:</b></td>
        <td>${message}</td>
      </tr>
    </table>
  </div>
  `,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 📩 Send confirmation to user
    await transporter.sendMail({
      from: `"YUKKON Support" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject: "Thanks for contacting YUKKON 💧",
      html: `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    
    <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 5px 15px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background:#2563eb; padding:20px; text-align:center; color:white;">
        <h2 style="margin:0;">YUKKON 💧</h2>
        <p style="margin:5px 0 0;">Pure Water Solutions</p>
      </div>

      <!-- Body -->
      <div style="padding:25px; color:#333;">
        <h3 style="margin-top:0;">Hi ${name}, 👋</h3>

        <p>Thank you for reaching out to us.</p>

        <p>
          We’ve successfully received your request and our team will contact you shortly 
          with the best solution tailored to your needs.
        </p>

        <!-- Highlight Box -->
        <div style="background:#f1f5f9; padding:15px; border-radius:8px; margin:20px 0;">
          <p><b>Your Message:</b></p>
          <p style="margin:0;">${message}</p>
        </div>

        <!-- CTA Button -->
        <div style="text-align:center; margin-top:20px;">
          <a href="http://localhost:5173"
             style="background:#2563eb; color:white; padding:12px 20px; text-decoration:none; border-radius:6px; display:inline-block;">
            Explore Our Products
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#777;">
        <p>© 2026 YUKKON. All rights reserved.</p>
        <p>Need help? Reply to this email anytime.</p>
      </div>

    </div>
  </div>
  `,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ message: "Error sending message" });
  }
};
