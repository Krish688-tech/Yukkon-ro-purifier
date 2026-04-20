import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

const fetchData = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/enquiry/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    const data = await res.json();
    setEnquiries(data);
  } catch (err) {
    console.error("Error fetching enquiries:", err);
  }
};

  useEffect(() => {
    fetchData(); // initial load

    const interval = setInterval(() => {
      fetchData();
    }, 5000); // 🔁 every 5 sec

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || user.role !== "admin" || !token) {
    navigate("/login");
  }
}, [navigate]);

  // 🔍 Filter logic
  const searchValue = search.toLowerCase().replace(/\s+/g, "");

  // remove non-digits for phone search
  const numericSearch = search.replace(/\D/g, "");

  const filtered = enquiries.filter((e) => {
    const name = e.name.toLowerCase();
    const product = e.productName.toLowerCase();
    const phone = e.whatsapp.toString();

    const matchSearch =
      name.includes(searchValue) ||
      product.includes(searchValue) ||
      phone.includes(numericSearch);

    const enquiryDate = new Date(e.createdAt);

    const matchFrom = fromDate ? enquiryDate >= new Date(fromDate) : true;
    const matchTo = toDate
      ? enquiryDate <= new Date(toDate + "T23:59:59")
      : true;

    return matchSearch && matchFrom && matchTo;
  });

  // ✅ Analytics counts — put here
  const total = enquiries.length;
  const sold = enquiries.filter((e) => e.status === "sold").length;
  const pending = enquiries.filter((e) => e.status !== "sold").length;

  // ✅ Update Status
  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/enquiry/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (res.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    if (!res.ok) {
      console.error("FAILED TO UPDATE STATUS");
    }
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/enquiry/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }
    fetchData();
  };

  // 📊 Export XLSX
  const exportToExcel = () => {
    const data = filtered.map((e) => ({
      Name: e.name,
      Email: e.email,
      WhatsApp: e.whatsapp,
      Product: e.productName,
      Message: e.message,
      Status: e.status,
      Date: new Date(e.createdAt).toLocaleString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Enquiries");

    XLSX.writeFile(wb, "enquiries.xlsx");
  };

  const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const highlightText = (text, search) => {
    if (!search) return text;

    const safeSearch = escapeRegex(search);
    const regex = new RegExp(`(${safeSearch})`, "gi");

    return text
      .toString()
      .split(regex)
      .map((part, i) =>
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
      {/* 🔥 Header */}
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-50 z-10 py-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Enquiries Dashboard
          </h1>
          <p className="text-sm text-gray-500">Welcome back, Admin 👋</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Orders 📦
          </button>
          <button
            onClick={exportToExcel}
            className="bg-linear-to-r from-green-500 to-green-600 hover:scale-105 transition text-white px-4 py-2 rounded-xl shadow-md"
          >
            Export 📥
          </button>

          <button
            onClick={handleLogout}
            className="bg-linear-to-r from-red-500 to-red-600 hover:scale-105 transition text-white px-4 py-2 rounded-xl shadow-md"
          >
            Logout 🚪
          </button>
        </div>
      </div>

      {/* 📊 Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="backdrop-blur-lg bg-white/70 border border-gray-200 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <p className="text-gray-500">Total Enquiries</p>
          <h2 className="text-3xl font-bold">{total}</h2>
        </div>

        <div className="backdrop-blur-lg bg-green-50 border border-green-200 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <p className="text-green-600">Sold</p>
          <h2 className="text-3xl font-bold text-green-700">{sold}</h2>
        </div>

        <div className="backdrop-blur-lg bg-red-50 border border-red-200 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
          <p className="text-red-500">Pending</p>
          <h2 className="text-3xl font-bold text-red-600">{pending}</h2>
        </div>
      </div>

      {/* 🔍 Filters */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search name, product or number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* From Date */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* To Date */}
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* 📋 Table Card */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">User</th>
              <th>Email</th>
              <th>WhatsApp</th>
              <th>Product</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((e) => (
              <tr
                key={e._id}
                className="border-t hover:bg-purple-50 transition duration-200"
              >
                {/* 👤 User */}
                <td className="p-3 font-medium">
                  {highlightText(e.name, search)}
                </td>

                {/* 📧 Email */}
                <td className="text-gray-600">
                  {highlightText(e.email, search)}
                </td>

                {/* 📱 WhatsApp */}
                <td className="flex items-center gap-2">
                  <span className="text-gray-700 text-sm">
                    {highlightText(e.whatsapp, search)}
                  </span>

                  <a
                    href={`https://wa.me/91${e.whatsapp}?text=${encodeURIComponent(
                      `Hi ${e.name}, 👋  
                        This is Team Yukkon.  
                        Regarding your enquiry for ${e.productName}, we’re here to assist you. 😊`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-100 hover:bg-green-200 p-2 rounded-full transition"
                    title="Chat on WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.52 3.48A11.82 11.82 0 0012.03 0C5.4 0 .03 5.37.03 12c0 2.12.55 4.2 1.6 6.04L0 24l6.17-1.6A11.94 11.94 0 0012.03 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.5-8.52zM12.03 21.8c-1.8 0-3.55-.48-5.08-1.4l-.36-.21-3.66.95.98-3.57-.24-.37a9.77 9.77 0 01-1.5-5.2c0-5.4 4.4-9.8 9.86-9.8 2.63 0 5.1 1.02 6.96 2.87a9.73 9.73 0 012.9 6.93c0 5.4-4.4 9.8-9.86 9.8zm5.4-7.35c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.8-1.68-2.1-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.17 4.56.72.3 1.28.48 1.72.62.72.23 1.37.2 1.88.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                    </svg>
                  </a>
                </td>

                {/* 📦 Product */}
                <td>{highlightText(e.productName, search)}</td>

                {/* 🟢 Status */}
                <td>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold tracking-wide ${
                      e.status === "new"
                        ? "bg-red-100 text-red-600"
                        : e.status === "contacted"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {e.status.toUpperCase()}
                  </span>
                </td>

                {/* 📅 Date */}
                <td className="text-gray-500">
                  {new Date(e.createdAt).toLocaleDateString()}
                </td>

                {/* ⚡ Actions */}
                <td className="flex gap-2 justify-center p-2">
                  {/* Contacted */}
                  {e.status === "new" && (
                    <button
                      onClick={() => updateStatus(e._id, "contacted")}
                      className="bg-blue-500 hover:bg-blue-600 transition text-white px-3 py-1 rounded-lg text-xs shadow"
                    >
                      Contact
                    </button>
                  )}

                  {/* Sold Toggle */}
                  <button
                    onClick={() =>
                      updateStatus(
                        e._id,
                        e.status === "sold" ? "contacted" : "sold",
                      )
                    }
                    className={`px-3 py-1 rounded-lg text-xs text-white shadow ${
                      e.status === "sold"
                        ? "bg-green-600"
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                  >
                    {e.status === "sold" ? "Sold" : "Mark Sold"}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded-lg text-xs shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-10 text-gray-400">
                No enquiries found 😔
              </td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
};

export default AdminEnquiries;
