import { useState, useContext } from "react";
import { API_URL } from "../data/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await registerUser(form.name, form.email, form.password);

    if (res.success) {
      navigate("/"); // go to home
    } else {
      alert(res.msg);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden bg-gray-50">
      {/* 🌟 LIGHT BACKGROUND */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-linear-to-br from-white  via-gray-500 to-purple-200"></div>
        <div className="absolute inset-0 backdrop-blur-xl bg-white/40"></div>
      </div>

      {/* 🔥 REGISTER CARD */}
      <div className="relative -translate-y-5 z-10 w-[90%] max-w-md rounded-2xl p-px bg-linear-to-br from-purple-300 to-blue-200 shadow-xl">
        <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl p-8 text-gray-800">
          {/* TITLE */}
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
            Create Account
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Join us and get started
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* NAME */}
            <input
              type="text"
              placeholder="Full name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/80 border border-gray-200 p-3 rounded-lg outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition"
            />

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email address"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/80 border border-gray-200 p-3 rounded-lg outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition"
            />

            {/* PASSWORD */}
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white/80 border border-gray-200 p-3 rounded-lg outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition"
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold shadow-md transition"
            >
              Register
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* GOOGLE */}
          <button
            onClick={() =>
              (window.location.href = `${API_URL}/api/auth/google`)
            }
            className="w-full border cursor-pointer border-gray-200 py-3 rounded-lg hover:bg-purple-200 transition"
          >
            Continue with Google
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
