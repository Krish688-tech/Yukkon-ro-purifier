import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await loginUser(form.email, form.password, navigate);

    if (!res.success) {
      setError(res.msg || "Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden bg-gray-50">
      {/* 🌟 LIGHT BACKGROUND */}
      <div className="absolute inset-0">
        {/* soft gradient */}
        <div className="w-full h-full bg-linear-to-br from-white via-gray-500 to-purple-200"></div>

        {/* blur overlay */}
        <div className="absolute inset-0 backdrop-blur-xl bg-white/40"></div>
      </div>

      {/* 🔥 LOGIN CARD */}
      <div className="relative -translate-y-5 z-10 w-[90%] max-w-md rounded-2xl p-px bg-linear-to-br from-purple-300 to-blue-200 shadow-xl">
        <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl p-8 text-gray-800">
          {/* TITLE */}
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Login to continue
          </p>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm mb-4 text-center">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* EMAIL */}
            <input
              type="email"
              required
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/80 border border-gray-200 p-3 rounded-lg outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white/80 border border-gray-200 p-3 rounded-lg outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition pr-10"
              />

              {/* 👁️ TOGGLE */}
              <div
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            {/* FORGOT */}
            <div className="text-right text-sm">
              <span className="text-blue-500 cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
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
              (window.location.href = "http://localhost:5000/api/auth/google")
            }
            className="w-full border cursor-pointer border-gray-300 py-3 rounded-lg hover:bg-purple-200 transition"
          >
            Continue with Google
          </button>

          {/* REGISTER */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
