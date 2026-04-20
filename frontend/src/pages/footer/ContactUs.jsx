import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

const ContactUs = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Thank you for contacting YUKKON 💧",
          html: `
      <p>Your request has been received successfully.</p>
      <p class="mt-2">We’ll contact you shortly with the best solution.</p>
    `,
          confirmButtonColor: "#2563eb",
          confirmButtonText: "Got it!",
          timer: 3500,
          timerProgressBar: true,
        });

        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Something went wrong!",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 px-6 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Contact YUKKON
        </h1>
        <p className="text-gray-600">
          Have questions about our water purification solutions? We're here to
          help.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          minLength="10"
          maxLength="10" // 👈 basic validation (10 digits)
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="message"
          placeholder="Your Query..."
          value={form.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2
               ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
                  `}
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Sending...
            </>
          ) : (
            "Submit Query"
          )}
        </button>
      </form>

      {/* Bottom CTA */}
      <div className="text-center mt-10">
        <div className="text-center mt-12 space-y-6">
          {/* Explore Products */}
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            onClick={() => navigate("/")}
          >
            Explore Products
          </button>

          {/* Contact Info */}
          <div className="text-gray-700 space-y-2">
            <p>
              📧 Email:
              <a
                href="mailto:support@yukkon.com"
                className="text-blue-600 hover:underline ml-1"
              >
                support@yukkon.com
              </a>
            </p>

            <p>
              📱 WhatsApp:
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline ml-1"
              >
                +91 98765 43210
              </a>
            </p>
          </div>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919876543210?text=Hello%20YUKKON%20Team,%20I%20have%20a%20query"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>

          {/* Social Media */}
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-3">
              Follow us on
            </p>

            <div className="flex justify-center gap-6">
              <a href="#" className="hover:text-blue-600 transition">
                <Facebook size={22} />
              </a>

              <a href="#" className="hover:text-sky-500 transition">
                <Twitter size={22} />
              </a>

              <a href="#" className="hover:text-pink-500 transition">
                <Instagram size={22} />
              </a>

              <a href="#" className="hover:text-red-600 transition">
                <Youtube size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
