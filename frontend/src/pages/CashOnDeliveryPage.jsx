import { useContext, useState, useEffect } from "react";
import { API_URL } from "../data/api";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const CashOnDeliveryPage = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const [orderSuccess, setOrderSuccess] = useState(false);
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

  // ✅ COD PLACE ORDER FUNCTION
  const handlePlaceOrder = async () => {
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

    const token = getToken(); 
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      //  1. SAVE ADDRESS FIRST
      const updateRes = await fetch(`${API_URL}/api/users/update-profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
          }),
        },
      );

      const updatedUser = await updateRes.json();

      // 2. UPDATE GLOBAL STATE + STORAGE
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // 3. PLACE ORDER
      const res = await fetch(`${API_URL}/api/orders/cod-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cart,
          amount: finalTotal,
          shipping: form,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: data.message || "Something went wrong",
        });
        return;
      }

      clearCart();

      await Swal.fire({
        icon: "success",
        title: "Order Placed Successfully 🎉",
        text: `Your order ${data.orderId} has been placed successfully!`,
        confirmButtonText: "OK",
        timer: 4000,
        timerProgressBar: true,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return <h1 className="p-10 text-xl">Your cart is empty</h1>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-100 via-white to-green-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* LEFT - SAME SHIPPING FORM */}
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
            <div>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className={`input ${errors.city ? "border-red-500" : ""}`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
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
          <div>
            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className={`input ${errors.pincode ? "border-red-500" : ""}`}
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm">{errors.pincode}</p>
            )}
          </div>
        </motion.div>

        {/* RIGHT - SAME SUMMARY */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 h-fit sticky top-10"
        >
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

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

          {/* ✅ PLACE ORDER BUTTON */}
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-purple-600"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
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

export default CashOnDeliveryPage;
