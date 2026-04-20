import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPopup = ({ onClose }) => {
  const { cart, updateQty, removeFromCart, total } = useContext(CartContext);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      {/* POPUP */}
      <div className="bg-white/80 backdrop-blur-xl w-[95%] md:w-150 max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl relative border border-white/30">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl hover:scale-110 transition"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">🛒 Your Cart</h2>

        {/* EMPTY */}
        {cart.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition"
                >
                  {/* LEFT */}
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} × {item.qty}
                    </p>

                    <p className="text-blue-600 font-semibold">
                      ₹{item.price * item.qty}
                    </p>
                  </div>

                  {/* QTY */}
                  <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-lg">
                    <button
                      onClick={() =>
                        item.qty > 1 && updateQty(item.productId, item.qty - 1)
                      }
                      className="text-lg font-bold px-2 hover:text-red-500"
                    >
                      −
                    </button>

                    <span className="font-medium">{item.qty}</span>

                    <button
                      onClick={() => updateQty(item.productId, item.qty + 1)}
                      className="text-lg font-bold px-2 hover:text-green-600"
                    >
                      +
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-gray-400 hover:text-red-500 text-lg transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center mt-6 text-lg font-semibold border-t pt-4">
              <span>Total</span>
              <span className="text-blue-600">₹{total}</span>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="w-1/2 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => {
                  onClose();
                  window.location.href = "/checkout";
                }}
                className="w-1/2 py-3 rounded-xl bg-linear-to-r from-purple-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition shadow-md"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPopup;
