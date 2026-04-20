import { useLocation } from "react-router-dom";
import { API_URL } from "../data/api";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const EnquiryPage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const { productName, productImage } = location.state || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });

  // ✅ Auto-fill user data
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Phone validation (10 digits only)
    const phoneRegex = /^[0-9]{10}$/;

    if (!form.whatsapp) {
      return Swal.fire({
        icon: "warning",
        title: "Phone number required 📱",
        text: "Please enter your phone number.",
      });
    }

    if (!phoneRegex.test(form.whatsapp)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Phone Number ❌",
        text: "Phone number must be exactly 10 digits.",
      });
    }

    try {
      const res = await fetch(`${API_URL}/api/enquiry/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          message: form.message,
          productName,
          productImage,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit enquiry");
      }

      await Swal.fire({
        icon: "success",
        title: "Enquiry Sent 🎉",
        text: `Thank you for your enquiry about "${productName}". Our team will contact you as soon as possible.`,
        confirmButtonText: "OK",
        timer: 4000,
      });

      setForm({
        name: user?.name || "",
        email: user?.email || "",
        whatsapp: "",
        message: "",
      });
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Something went wrong ❌",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Product Enquiry 📩</h1>

        {/* PRODUCT INFO */}
        {productName && (
          <div className="flex items-center gap-4 mb-6 border p-4 rounded-xl">
            <img
              src={productImage}
              className="w-20 h-20 object-contain rounded-lg"
            />
            <p className="font-medium">{productName}</p>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Your Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="tel"
            name="whatsapp"
            value={form.whatsapp}
            placeholder="Your Phone Number"
            onChange={(e) => {
              // ✅ allow only numbers
              const value = e.target.value.replace(/\D/g, "");
              setForm({ ...form, whatsapp: value });
            }}
            maxLength={10}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            name="message"
            value={form.message}
            placeholder="Your Query..."
            onChange={handleChange}
            className="w-full border p-3 rounded-lg h-32"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
          >
            Submit Enquiry 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryPage;
