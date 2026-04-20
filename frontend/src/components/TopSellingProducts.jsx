import { useEffect, useState, useContext } from "react";
import { API_URL } from "../data/api";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import { getProductUrl } from "../utils/routes";

const TopSelling = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${API_URL}/api/orders/top-products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          //  fallback dummy
          setTopProducts(products.sort(() => 0.5 - Math.random()).slice(0, 3));
        } else {
          // merge backend + local products
          const merged = data.map((tp) => {
            const full = products.find((p) => p.id == tp._id);
            return {
              ...full,
              totalSold: tp.totalSold,
            };
          });

          setTopProducts(merged);
        }

        setLoading(false);
      })
      .catch(() => {
        setTopProducts(products.slice(0, 3));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Loading top products...</p>;
  }

  return (
    <section className="px-6 md:px-16 py-16 bg-white">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Top Selling Products
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {topProducts.map((item, index) => {
          const discount = 0.1;
          const originalPrice = item.price;
          const offerPrice = Math.round(
            originalPrice - originalPrice * discount,
          );

          return (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow hover:shadow-xl"
            >
              <img
                src={item.images?.[0] || item.img}
                className="w-full h-60 object-contain rounded"
              />

              <h3 className="mt-4 font-semibold">{item.name}</h3>

              {/* ✅ PRICE UI */}
              <div className="mt-2">
                <span className="text-lg font-bold text-purple-600">
                  ₹{offerPrice}
                </span>

                <span className="ml-3 text-sm text-gray-400 line-through">
                  ₹{originalPrice}
                </span>

                <span className="ml-2 text-sm text-green-600 font-semibold">
                  10% OFF
                </span>

              </div>

              {item.totalSold && (
                <p className="text-sm text-green-600">
                  🔥 {item.totalSold} sold
                </p>
              )}

              <button
                onClick={() => navigate(getProductUrl(item))}
                className="w-full mt-6 bg-linear-to-r from-purple-600 to-indigo-400 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TopSelling;
