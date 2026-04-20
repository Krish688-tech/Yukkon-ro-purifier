import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const { cart, clearCart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearCart();
    setProfileOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const navItems = [
    {
      name: "Water Purifiers",
      id: "waterpurifier",
      dropdown: [{ name: "Water Purifiers", path: "/products/waterpurifier" }],
    },
    {
      name: "Industrial RO",
      id: "industrialro",
      dropdown: [{ name: "Industrial RO", path: "/products/industrialro" }],
    },
    {
      name: "Water Controller",
      id: "watercontroller",
      dropdown: [{ name: "WaterController", path: "/products/watercontroller" }],
    },
  ];

  return (
    <div className="w-full">
      {/* TOP BAR */}
      {/*<div className="bg-gray-900 text-white text-xs px-6 md:px-12 py-2 flex justify-between">
        <div className="space-x-4 hidden md:block opacity-80">
          <span className="hover:text-blue-400 cursor-pointer">
            Customer Service
          </span>
          <span className="hover:text-blue-400 cursor-pointer">
            Where to Buy
          </span>
          <span className="hover:text-blue-400 cursor-pointer">About Us</span>
          <span className="hover:text-blue-400 cursor-pointer">
            Investor Relations
          </span>
        </div>
        <div className="opacity-80">English</div>
      </div>*/}

      {/* NAVBAR */}
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-12 py-3 md:py-3 lg:py-4 bg-white shadow fixed top-0 left-0 w-full z-50">
        {/* LEFT - LOGO */}
        <h1
          className="text-xl md:text-2xl font-bold text-blue-900 cursor-pointer tracking-wide"
          onClick={() => navigate("/")}
        >
          YUKKON
        </h1>

        {/* CENTER - MENU */}
        <ul className="hidden md:flex flex-1 justify-center space-x-6 lg:space-x-10 text-sm lg:text-base text-gray-700 font-medium">
          {/* ✅ HOME LINK */}
          <li
            className="cursor-pointer relative group"
            onClick={() => navigate("/")}
          >
            <span className="relative">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </li>
          {navItems.map((item) => (
            <li
              key={item.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setDropdown(item.id)}
              onMouseLeave={() => setDropdown(null)}
            >
              {/* NAV LINK */}
              <div className="flex items-center gap-1">
                <span className="relative">
                  {item.name}
                  {/* underline animation */}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </span>

                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    dropdown === item.id ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* DROPDOWN */}
              <div
                className={`absolute top-full mt-1 left-0 w-52 bg-white shadow-xl rounded-xl p-4 
                transition-all duration-300 origin-top
                ${
                  dropdown === item.id
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <ul className="space-y-2">
                  {item.dropdown.map((sub, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        navigate(sub.path);
                        setDropdown(null); // close dropdown after click
                      }}
                      className="px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                    >
                      {sub.name}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li
            className="cursor-pointer relative group"
            onClick={() => navigate("/about")}
          >
            <span className="relative">
              About Us
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </li>
          <li
            className="cursor-pointer relative group"
            onClick={() => navigate("/contact")}
          >
            <span className="relative">
              Contact Us
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6 relative">
          {/* CART */}
          <div
            className="cursor-pointer relative flex flex-col items-center justify-center hover:scale-110 transition"
            onClick={() => navigate("/cart")}
          >
            <span className="text-md">🛒</span>

            {totalItems > 0 && (
              <span className="absolute -bottom-2 bg-purple-500 text-white text-[10px] px-1.5 py-px rounded-full">
                {totalItems}
              </span>
            )}
          </div>

          {/* USER */}
          {user ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="w-9 h-9 bg-linear-to-r from-purple-600 to-indigo-500 text-white rounded-full flex items-center justify-center font-semibold shadow">
                  {user.name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <span className="hidden md:block text-sm">
                  {user.name || user.email}
                </span>
              </div>

              {/* PROFILE DROPDOWN */}
              <div
                className={`absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-xl p-3 text-sm transition-all duration-300
                ${
                  profileOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                {/* 🔴 CLOSE BUTTON */}
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p
                  className="py-2 px-2 rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Update Profile
                </p>
                <p
                  className="py-2 px-2 rounded hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/orders")}
                >
                  Order History
                </p>
                <p
                  className="py-2 px-2 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-purple-600 text-white px-5 py-2 rounded-lg transition shadow-md hover:shadow-lg cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* MOBILE ICON */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-lg md:hidden transition-all duration-500 overflow-hidden rounded-b-2xl ${
            open ? "max-h-[90vh] p-4" : "max-h-0 p-0"
          }`}
        >
          {/* HOME */}
          <p
            className="font-semibold text-gray-800 text-lg py-2 cursor-pointer"
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
          >
            Home
          </p>

          {navItems.map((item) => (
            <div key={item.id} className="border-b border-gray-200 mb-2">
              {/* Main item (clickable) */}
              <div
                className="flex justify-between items-center py-2 cursor-pointer"
                onClick={() =>
                  setMobileDropdown(mobileDropdown === item.id ? null : item.id)
                }
              >
                <p className="font-semibold text-gray-800 text-lg">
                  {item.name}
                </p>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    mobileDropdown === item.id ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown items */}
              <div
                className={`pl-4 overflow-hidden transition-all duration-300 ${
                  mobileDropdown === item.id ? "max-h-40 mt-1" : "max-h-0"
                }`}
              >
                {item.dropdown.map((sub, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      navigate(sub.path);
                      setOpen(false);
                      setMobileDropdown(null);
                    }}
                    className="py-1 text-md text-gray-600 hover:text-blue-600 cursor-pointer"
                  >
                    {sub.name}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* ABOUT */}
          <p
            className="font-semibold text-gray-800 text-lg py-2 cursor-pointer"
            onClick={() => {
              navigate("/about");
              setOpen(false);
            }}
          >
            About Us
          </p>

          {/* CONTACT */}
          <p
            className="font-semibold text-gray-800 text-lg py-2 cursor-pointer"
            onClick={() => {
              navigate("/contact");
              setOpen(false);
            }}
          >
            Contact Us
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
