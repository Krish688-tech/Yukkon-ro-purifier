import { testimonials } from "../data/testimonials";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Testimonials = () => {
  return (
    <section className="px-6 md:px-16 py-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Customers Say
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        speed={4000} // 🔥 smooth continuous movement
        autoplay={{
          delay: 0, // 👈 important for continuous scroll
          disableOnInteraction: false,
          reverseDirection: true, // 🔥 RIGHT → LEFT
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 h-full flex flex-col">

              {/* Profile */}
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>

              {/* Review */}
              <p className="mt-4 text-gray-600 grow">
                "{t.review}"
              </p>

              {/* Rating */}
              <div className="mt-4 text-yellow-500">
                {"⭐".repeat(t.rating)}
              </div>

              {/* Role */}
              <p className="mt-2 text-sm text-gray-400">
                {t.role}
              </p>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;