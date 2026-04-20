import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const { cart, total } = useContext(CartContext);
  const navigate = useNavigate();

  const deliveryCharge = 40;
  const discount = total > 500 ? 100 : 0;
  const finalTotal = total + deliveryCharge - discount;

  const handleCheckout = () => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", "/checkout");
      navigate("/login");
    } else {
      navigate("/payment");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-purple-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2 space-y-6"
        >
          {/* DELIVERY PREVIEW 
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-3">Deliver To</h2>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Rajesh S</p>
                <p className="text-sm text-gray-500">Coimbatore, Tamil Nadu</p>
                <p className="text-sm text-gray-500">+91 9876543210</p>
              </div>

              <button
                onClick={() => navigate("/shipping")}
                className="text-purple-600 font-medium hover:underline"
              >
                Change
              </button>
            </div>
          </div>*/}

          {/* ORDER ITEMS */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>

            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                  </div>

                  <p className="font-semibold">₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TRUST BADGES */}
          <div className="flex gap-6 text-sm text-gray-600">
            <p>🔒 Secure Payment</p>
            <p>🚚 Fast Delivery</p>
            <p>↩️ Easy Returns</p>
          </div>
        </motion.div>

        {/* RIGHT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 h-fit sticky top-10"
        >
          <h2 className="text-xl font-semibold mb-6">Price Details</h2>

          <div className="space-y-3 text-sm">
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

          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Continue to Payment →
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
