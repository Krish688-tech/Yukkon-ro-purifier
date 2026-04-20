import { useNavigate } from "react-router-dom";
import homeCards from "../data/homeCard";


const WideProducts = () => {
  const navigate = useNavigate();



  return (
    <section className="px-6 md:px-16 py-16 bg-gray-100">
      {/* TITLE */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Wide Varieties of Our Products
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        {homeCards.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center bg-gray-200 rounded-3xl p-8 hover:shadow-xl transition
      ${
        homeCards.length % 2 !== 0 && index === homeCards.length - 1
          ? "md:col-span-2 md:mx-auto md:max-w-2xl"
          : ""
      }`}
          >
            {/* TEXT */}
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {item.name}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">{item.desc}</p>

              <button
                onClick={() => navigate(`/products/${item.category}`)}
                className="w-3/6 mt-6 bg-linear-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                View Full Range
              </button>
            </div>

            {/* IMAGE */}
            <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
              <div className="w-60 md:w-72 h-60 md:h-72 rounded-2xl overflow-hidden bg-white shadow-sm flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WideProducts;
