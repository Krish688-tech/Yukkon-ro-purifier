import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, totalItems, total, removeFromCart, updateQty } =
    useContext(CartContext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 🔵 LEFT SIDE - USER INFO */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">👤 User Info</h2>

          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Name:</span> {user?.name}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
        </div>

        {/* 🛒 RIGHT SIDE - CART */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">🛒 Your Cart</h2>

            <span className="text-sm font-semibold text-blue-600">
              Items: {totalItems}
            </span>
          </div>

          {/* EMPTY CART */}
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              Your cart is empty 😢
            </p>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="border p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  {/* TOP / LEFT */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || "/fallback.png"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.qty}
                      </p>

                      <p className="text-sm font-semibold text-gray-800">
                        ₹{item.price * item.qty}
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM / RIGHT */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    {/* QTY */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.productId, item.qty - 1)}
                        className="px-3 py-1 bg-gray-200 rounded text-lg"
                      >
                        -
                      </button>

                      <span className="min-w-5 text-center">{item.qty}</span>

                      <button
                        onClick={() => updateQty(item.productId, item.qty + 1)}
                        className="px-3 py-1 bg-gray-200 rounded text-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="bg-linear-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-xl w-full sm:w-auto hover:opacity-90"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* TOTAL */}
              <div className="text-right mt-6">
                <h3 className="text-lg font-bold">Total: ₹{total}</h3>
                <button
                  onClick={() => {
                    setLoading(true);

                    // simulate delay OR wait for real API
                    setTimeout(() => {
                      navigate("/checkout");
                    });
                  }}
                  disabled={loading || cart.length === 0}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-white flex items-center justify-center gap-2 transition ${
                    loading || cart.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-linear-to-r from-purple-500 to-indigo-600 hover:opacity-90"
                  }`}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Processing...
                    </>
                  ) : (
                    "Buy Now"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
