import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-linear-to-br from-purple-50 via-white to-blue-50 min-h-screen text-gray-800">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20 px-6 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-96 h-96 bg-purple-300/30 rounded-full blur-3xl top-10 left-10" />
          <div className="absolute w-96 h-96 bg-blue-300/30 rounded-full blur-3xl bottom-10 right-10" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Pure Water. Trusted Innovation Since 1995.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl mx-auto text-lg text-gray-600"
        >
          Delivering advanced water purification, smart controllers, and home
          wellness solutions built on decades of research and engineering excellence.
        </motion.p>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">Who We Are</h2>
        <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
          YUKKON is a trusted name in water purification and home wellness solutions since 1995.
          Starting as a dealership and supplier, we have grown into an innovation-driven company,
          developing our own advanced range of YUKKON Water Purifiers backed by strong R&D.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {["Water Purifiers", "Water Softeners", "Air Purifiers", "Kitchen Appliances", "Water Controllers"].map((item, i) => (
            <div key={i} className="rounded-2xl shadow-lg hover:shadow-2xl transition p-6 text-center bg-white hover:-translate-y-1">
              <h3 className="font-semibold text-lg">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-16 px-6 bg-white/60 backdrop-blur-xl">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Journey</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            "1995 – Started as a dealership & supplier",
            "Expanded into service & technical expertise",
            "Entered product innovation phase",
            "Today – Own YUKKON product line"
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-4 rounded-xl bg-white shadow"
            >
              {step}
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Work in Action</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((img) => (
            <div key={img} className="rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition">
              <img
                src={`https://source.unsplash.com/600x400/?water,technology&sig=${img}`}
                alt="gallery"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-20 px-6 bg-linear-to-r from-purple-100 to-blue-100 text-center">
        <h2 className="text-3xl font-semibold mb-6">Founder’s Message</h2>
        <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
          “Since 1995, our mission has been to ensure access to safe and clean water.
          At YUKKON, we build solutions backed by research, experience, and a commitment to quality.”
        </p>
        <p className="mt-4 font-semibold">– Er. G. Palani Ganesan</p>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">Why Choose YUKKON</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "30+ Years Experience",
            "Strong R&D",
            "Trusted by Customers",
            "Innovative Products",
            "Complete Solutions",
            "Reliable Support"
          ].map((item, i) => (
            <div key={i} className="p-6 text-center rounded-2xl shadow hover:shadow-xl transition bg-white hover:-translate-y-1">
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Experience the Future of Clean Water
        </h2>
        <div className="flex justify-center gap-4">
          <button className="rounded-2xl px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            onClick={() => navigate("/")}
            > 
            Explore Products
          </button>
          <button className="rounded-2xl px-6 py-3 border border-gray-300 hover:bg-gray-100 transition"
          onClick={() => navigate("/contact")}
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );

};

export default AboutUs;
