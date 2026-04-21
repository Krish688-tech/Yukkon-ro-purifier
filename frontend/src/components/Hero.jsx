import roWater from "../assets/ro-water.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between px-6 md:px-16 pt-24 pb-10 md:py-20 min-h-[70vh] md:min-h-[90vh] bg-linear-to-br from-purple-50 via-white to-blue-50">
      {/* BLOBS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-125 h-125 bg-purple-300 rounded-full blur-3xl opacity-50 -top-25 -left-25"></div>

        <div className="absolute w-125 h-125 bg-pink-300 rounded-full blur-3xl opacity-50 top-50 -right-25"></div>

        <div className="absolute w-125 h-125 bg-blue-400 rounded-full blur-3xl opacity-40 -bottom-25 left-50"></div>
      </div>

      {/* TEXT */}
      <div className="md:w-1/2 relative z-10 mt-2 md:mt-0 text-center md:text-left">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-800 leading-tight mb-4 md:mb-6">
          The World’s Best & India’s Largest Selling
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500">
            Water Purifiers
          </span>
        </h1>

        <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
          Make your water pure & healthy. Protect your family from water-borne
          diseases with advanced purification technology.
        </p>

        <div className="flex gap-4">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-purple-700 transition-all duration-300">
            Explore Products
          </button>

          <button className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-white hover:shadow transition">
            Learn More
          </button>
        </div>
      </div>

      {/* IMAGE */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative z-10">
        <img
          src={roWater}
          alt="ro-purifier"
          className="w-full max-w-162.5 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
        />
      </div>
    </section>
  );
};

export default Hero;
