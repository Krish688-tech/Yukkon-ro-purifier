import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((o) => {
    const value = search.toLowerCase();

    const matchesSearch =
      o.orderId?.toLowerCase().includes(value) ||
      o.shipping?.name?.toLowerCase().includes(value) ||
      o.shipping?.phone?.toLowerCase().includes(value);

    // 🎯 STATUS FILTER
    let matchesStatus = true;

    if (statusFilter === "paid") {
      matchesStatus = o.status === "paid";
    } else if (statusFilter === "pending") {
      matchesStatus = o.status !== "paid";
    } else if (statusFilter === "cod") {
      matchesStatus = !o.paymentId;
    }

    return matchesSearch && matchesStatus;
  });

  const fetchOrders = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/admin/orders?page=${pageNumber}&search=${encodeURIComponent(search)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();

      console.log("API DATA:", data);

      setOrders(Array.isArray(data) ? data : data.orders || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchOrders(1);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const updateStatus = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/update-order-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        fetchOrders(page); // refresh table
      }
    } catch (err) {
      console.error(err);
    }
  };

  const highlightText = (text) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={i} className="bg-purple-200 text-purple-900 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">Orders Dashboard 📦</h1>

      <input
        type="text"
        placeholder="Search by Order ID, Name, Phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="mb-4 p-2 border rounded-lg ml-2"
      >
        <option value="all">All</option>
        <option value="paid">Paid</option>
        <option value="cod">COD</option>
        <option value="pending">Pending</option>
      </select>

      <p className="text-sm text-gray-500 mb-2">
        Showing {filteredOrders.length} results
      </p>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th>Order ID</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders?.map((o) => (
              <tr key={o._id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">
                  {highlightText(o.shipping?.name || "")}
                </td>
                <td className="font-medium text-sm">
                  {highlightText(o.orderId || "")}
                </td>
                <td>{highlightText(o.shipping?.phone || "")}</td>
                <td>₹{o.amount}</td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      o.paymentId
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {o.paymentId ? "Online" : "COD"}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => updateStatus(o._id)}
                    className={`px-3 py-1 text-xs rounded-full ${
                      o.status === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {o.status}
                  </button>
                </td>

                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!search && (
          <div className="flex justify-center items-center gap-2 py-4">
            {/* PREVIOUS */}
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1 ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* NEXT */}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-center py-10 text-gray-400">No orders yet 😔</p>
        ) : null}
      </div>
    </div>
  );
};

export default AdminOrders;
