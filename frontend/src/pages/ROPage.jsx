import { useNavigate } from "react-router-dom";
import products from "../data/products";
import { getProductUrl } from "../utils/routes";

const ROPage = () => {
  const navigate = useNavigate();

  // ✅ FILTER ONLY RO PRODUCTS
  const roProducts = products.filter((p) => p.roOnNav);

  return (
    <div className="pt-1 mt-2 min-h-screen bg-linear-to-br from-green-50 via-white to-green-100">
      {/* HERO WRAPPER (adds left-right space) */}
      <section className="px-4 md:px-5 mb-0">
        {/* HERO CARD */}
        <div className="max-w-9xl mx-auto grid md:grid-cols-2 items-center gap-10 bg-linear-to-r from-purple-800 to-indigo-200 rounded-3xl p-8 md:p-12 shadow-xl">
          {/* LEFT TEXT */}
          <div>
            <h1 className="text-4xl md:text-4xl text-white leading-tight">
              Yukkon's RO <span className="text-purple-200">Purifiers</span>
            </h1>

            <h2 className="mt-2 text-2xl md:text-2xl text-white/90">
              Pure Water,
              <span className="text-green-300"> Healthy Life</span>
            </h2>

            <p className="mt-4 text-white/80 text-lg">
              Discover our premium RO water purifiers with advanced filtration,
              mineral retention, and modern design.
            </p>

           {/* <button
              onClick={() => navigate("/products")}
              className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-600 transition"
            >
              Explore Products
            </button>*/}
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center">
            {/* IMAGE CARD (like your screenshot) */}
            <div className="bg-white/30 backdrop-blur-lg p-3 rounded-2xl shadow-2xl border border-white/40">
              <img
                src="https://livpure.com/cdn/shop/articles/List-of-Factors-to-Take-Into-Account-When-Buying-a-Water-Purifier-1_b17e23de-6a7a-4d2d-b587-c64c42a21635-988455.png?v=1726725972"
                alt="RO Purifier"
                className="w-80 md:w-96 h-56 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT LIST */}
      <section className="px-6 md:px-16 py-12">
        <h2 className="text-2xl text-center font-semibold mb-1 text-gray-800">
          Yukkon's Water Purifiers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {roProducts.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition"
            >
              {/* IMAGE */}
              <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
                <div className="w-60 md:w-72 h-60 md:h-72 rounded-2xl overflow-hidden bg-white shadow-sm flex items-center justify-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              <h3 className="font-semibold text-lg text-gray-800">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>

              <p className="mt-3 font-bold text-green-600">₹{item.price}</p>

              <button
                onClick={() => navigate(getProductUrl(item))}
                className="w-3/6 mt-6 bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="px-6 md:px-16 py-12 bg-white">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Why Choose RO?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg text-green-600">
              99% Purification
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Removes harmful contaminants and bacteria
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg text-green-600">
              Mineral Retention
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Keeps essential minerals for better health
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg text-green-600">
              Smart Technology
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Auto shut-off and energy efficient systems
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ROPage;
