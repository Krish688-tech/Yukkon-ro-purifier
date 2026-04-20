import { useEffect, useState, useContext } from "react";
import { API_URL } from "../data/api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const OrderHistoryPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders/${user?._id}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) fetchOrders();
  }, [user]);

  if (loading) return <h1 className="p-10">Loading...</h1>;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-white to-purple-200 p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {/* USER PROFILE */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">My Profile</h2>

          <div className="space-y-2">
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <div className="mt-6 text-sm text-gray-600 space-y-2">
            <p>📦 Orders: {orders.length}</p>
            <p>💰 Total Spent: ₹{orders.reduce((acc, o) => acc + o.amount, 0)}</p>
          </div>
        </div>

        {/* ORDERS */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold">Order History</h1>

          {orders.length === 0 && (
            <div className="bg-white/70 p-6 rounded-2xl shadow">
              No orders found
            </div>
          )}

          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6"
            >
              {/* HEADER */}
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{order.orderId}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-bold">₹{order.amount}</p>
                </div>
              </div>

              {/* ITEMS */}
              <div className="space-y-2 border-t pt-4">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{item.name} x {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              {/* STATUS */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-green-600 font-medium">✔ {order.status || "Paid"}</span>
                <span className="text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
