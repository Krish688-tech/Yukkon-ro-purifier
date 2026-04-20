import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import products from "../../data/products";
import { getProductUrl } from "../../utils/routes";
import { motion } from "framer-motion";
import SortDropdown from "../../components/SortDropdown";

const categoryHero = {
  industrialro: {
    title: "Yukkon's Advanced Industrial RO",
    description:
      "Yukkon's Transform your industrial water quality with our advanced Reverse Osmosis plants. Designed for high capacity and reliability, our systems remove up to 99% of dissolved solids, bacteria, and contaminants",
    image:
      "https://res.cloudinary.com/dkp7rlfq4/image/upload/v1776685610/Yukkon_s_Industrial_RO_sujwzr.jpg",
  },
  waterpurifier: {
    title: "Yukkon's Water Purifier",
    description:
      "Pure & Safe Water, Experience crystal clear drinking water with our latest RO+UV+UF purification technology with Automate TDS Controller.",
    image:
      "https://livpure.com/cdn/shop/articles/family-spending-time-together-outside_23-2148659464_c1d9a034-3bff-4de0-a3c5-7828aa0ec439.jpg?v=1696920137&width=1100",
  },

  watercontroller: {
    title: "Yukkon's Smart Water Control",
    description:
      "Automate and optimize your water usage with Yukkon's Smart intelligent Water controllers.",
    image:
      "https://www.flosenso.com/wp-content/uploads/2023/08/FloSenso-Blog-Image-1A.jpg",
  },
};

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const hero = categoryHero[category];
  const [sort, setSort] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  let filteredProducts = products.filter((item) => item.category === category);

  const types = [
    "All",
    ...new Set(
      products
        .filter((item) => item.category === category)
        .map((item) => item.type?.toLowerCase())
        .filter(Boolean),
    ),
  ];

  if (typeFilter !== "All") {
    filteredProducts = filteredProducts.filter(
      (item) => item.type?.toLowerCase() === typeFilter,
    );
  }

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const categoryMap = {
    industrialro: "Industrial RO",
    waterpurifier: "RO Water Purifiers",
    watercontroller: "Water Controller",
    //kitchenappliances: "Kitchen Appliances",
    //airpurifier: "Air Purifiers",
  };

  return (
    <div className="pt-2 pb-5 px-6 min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-100">
      {hero && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 rounded-3xl overflow-hidden relative bg-linear-to-r from-purple-800 to-indigo-200 text-white p-8 md:p-12 shadow-xl"
        >
          <div className="grid md:grid-cols-2 items-center gap-8">
            {/* TEXT */}
            <div>
              <h1 className="text-xl md:text-4xl leading-tight">
                {hero.title}
              </h1>
              <p className="mt-4 text-white/90 text-lg">{hero.description}</p>
            </div>

            {/* IMAGE */}
            <motion.img
              src={hero.image}
              alt={hero.title}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-105 max-h-80 object-contain rounded-3xl shadow-2xl mx-auto bg-white/40 backdrop-blur-md p-2"
            />
          </div>

          {/* Blur Glow Effect */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl"></div>
        </motion.div>
      )}
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg sm:text-xl md:text-2xl capitalize tracking-wide">
          {categoryMap[category] || category}
        </h1>
        <SortDropdown setSort={setSort} />
      </div>

      <div className="grid md:grid-cols-5 gap-10">
        {/* GLASS FILTER PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-5 rounded-2xl backdrop-blur-xl bg-white/30 border border-white/20 shadow-lg h-fit"
        >
          <h2 className="font-semibold mb-4 text-lg">Filters</h2>

          {types.map((t) => (
            <motion.button
              key={t}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setTypeFilter(t)}
              className={`block w-full p-2 mb-2 rounded-lg transition-all duration-300 ${
                typeFilter === t
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white/40 hover:bg-purple-100"
              }`}
            >
              {t.toUpperCase()}
            </motion.button>
          ))}
        </motion.div>

        {/* 🛍️ PRODUCTS */}
        <div className="md:col-span-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((item, index) => {
            const discount = 0.1;

            const discountedPrice = item.price;
            const originalPrice = Math.round(discountedPrice / (1 - discount));
            const savings = originalPrice - discountedPrice;
            const discountPercentage = Math.round(
              (savings / originalPrice) * 100,
            );

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer rounded-2xl backdrop-blur-lg bg-white/40 border border-white/20 shadow-md hover:shadow-2xl transition-all duration-300 p-5"
                onClick={() => navigate(getProductUrl(item), { state: item })}
              >
                <motion.img
                  src={item.images[0]}
                  className="h-44 mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />

                <h2 className="mt-4 font-semibold text-lg">{item.name}</h2>

                {/* ✅ NEW PRICE UI */}
                <div className="mt-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-purple-600 font-semibold text-lg">
                      <span className="mr-1">₹</span>{discountedPrice}
                    </span>

                    <span className="line-through text-gray-400 text-sm">
                      ₹{originalPrice}
                    </span>

                    <span className="text-green-600 text-sm font-medium">
                      {discountPercentage}% OFF
                    </span>
                  </div>

                  <div className="mt-1">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                      You saved ₹{savings}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full bg-purple-600 text-white py-2 rounded-xl shadow hover:bg-purple-700 transition"
                >
                  View Details
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
