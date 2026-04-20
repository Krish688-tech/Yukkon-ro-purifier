import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const SortDropdown = ({ setSort }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Sort");
  const dropdownRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const options = [
    { label: "Price Low → High", value: "low" },
    { label: "Price High → Low", value: "high" },
  ];

  const handleSelect = (option) => {
    setSelected(option.label);
    setSort(option.value);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-56">

      {/* BUTTON */}
      <motion.div
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer 
        backdrop-blur-md bg-white/40 border border-white/30 
        px-4 py-2 rounded-xl shadow-md"
      >
        <span>{selected}</span>

        {/* 🔄 Arrow animation */}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute mt-2 w-full z-50 
            backdrop-blur-xl bg-white/40 border border-white/20 
            rounded-xl shadow-lg overflow-hidden"
          >
            {options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03, backgroundColor: "#ede9fe" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 cursor-pointer"
              >
                {option.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;