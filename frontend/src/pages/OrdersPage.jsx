import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const OrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id }),
      });

      const data = await res.json();
      setOrders(data);
    };

    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border p-5 mb-4 rounded">

            <h2 className="font-semibold mb-2">
              Order ID: {order._id}
            </h2>

            <p className="text-sm text-gray-500 mb-2">
              Amount: ₹{order.amount}
            </p>

            {/* Items */}
            {order.cart.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{item.name} x {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;