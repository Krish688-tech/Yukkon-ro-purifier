import { useContext, useState, useEffect } from "react";
import { API_URL } from "../data/api";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentPage = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, setUser, getToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const deliveryCharge = 40;
  const discount = total > 500 ? 100 : 0;
  const finalTotal = total + deliveryCharge - discount;

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
      });
    }
  }, [user]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePayment = async () => {
    const newErrors = {};

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!form.state.trim()) newErrors.state = "State is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal }),
      });

      const data = await res.json();

      const options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: data.amount,
        currency: "INR",
        name: "My Store",
        description: "Order Payment",
        order_id: data.id,

        handler: async function (response) {
          // UPDATE USER (save address)
          const res = await fetch(`${API_URL}/api/users/update-profile`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({
              phone: form.phone,
              address: form.address,
              city: form.city,
              state: form.state,
              pincode: form.pincode,
            }),
          });

          const updatedUser = await res.json();

          // UPDATE GLOBAL STATE (VERY IMPORTANT)
          setUser(updatedUser);

          // ALSO UPDATE LOCALSTORAGE (so refresh works)
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // CONTINUE PAYMENT VERIFY
          await fetch(`${API_URL}/api/payment/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              cart,
              amount: finalTotal,
              shipping: form,
              userDetails: updatedUser, // use updated one
            }),
          });

          clearCart();
          navigate("/success");
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  if (cart.length === 0) {
    return <h1 className="p-10 text-xl">Your cart is empty</h1>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-purple-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* LEFT - SHIPPING FORM */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input"
          />

          {/* PHONE */}
          <div>
            <div className="flex items-center border rounded-xl overflow-hidden">
              <span className="px-4 bg-gray-100 text-gray-600">+91</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setForm({ ...form, phone: value });
                  if (value.length === 10) {
                    setErrors({ ...errors, phone: "" });
                  }
                }}
                placeholder="Enter phone number"
                className={`w-full px-4 py-3 outline-none ${errors.phone ? "border-red-500" : ""}`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Full Address (House no, Street, Area, Landmark...)"
            rows={4}
            className={`input w-full resize-none ${errors.address ? "border-red-500" : ""}`}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* CITY */}
            <div>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className={`input ${errors.city ? "border-red-500" : ""}`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            {/* STATE */}
            <div>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className={`input ${errors.state ? "border-red-500" : ""}`}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>
          </div>
          {/* PINCODE */}
          <div>
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className={`input ${errors.pincode ? "border-red-500" : ""}`}
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
            )}
          </div>
        </motion.div>

        {/* RIGHT - SUMMARY */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 h-fit sticky top-10"
        >
          <h2 className="text-xl font-semibold mb-6">Payment Summary</h2>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>

          <button
            onClick={handlePayment}
            className="w-full mt-6 bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Pay Now →
          </button>

          <button
            onClick={() => {
              if (!user) {
                alert("Please login to continue");
                navigate("/login");
                return;
              }

              navigate("/cash-on-delivery");
            }}
            className="w-full mt-6 bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Cash on Delivery
          </button>

          <div className="mt-4 text-sm text-gray-500 flex justify-between">
            <span>🔒 Secure</span>
            <span>⚡ Fast</span>
            <span>↩️ Easy Returns</span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .input {
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #ddd;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;
