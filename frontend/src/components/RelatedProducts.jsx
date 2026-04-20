import { Heart } from "lucide-react";
import { useEffect, useState, useContext, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import products from "../data/products";
import { getProductUrl } from "../utils/routes";


// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RelatedProducts = () => {
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const currentProduct = location.state;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const randomItems = [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 8); // take 6–8 items for slider

    setRelated(randomItems);
  }, []);

  return (
    <section className="px-6 md:px-16 py-16 bg-white">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Yukkon's Related Products
      </h2>
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={related.length >= 4}
          autoplay={{
            delay: 2300,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            480: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {related.map((item, index) => {
            const discount = 0.1;
            const originalPrice = item.price;
            const offerPrice = Math.round(
              originalPrice - originalPrice * discount,
            );

      

            return (
              <SwiperSlide key={index}>
                <div className="rounded-2xl p-4 bg-white/80 backdrop-blur-md shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300">
                  <img
                    src={item.images?.[0] || item.img}
                    alt={item.name}
                    className="w-full h-60 object-contain rounded"
                  />

                  <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
                  
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

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigate(getProductUrl(item))}
                      className="w-full mt-6 bg-linear-to-r from-purple-600 to-indigo-400 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          <button ref={prevRef} className="custom-arrow left-2">
            <ChevronLeft size={20} />
          </button>

          {/* RIGHT ARROW */}
          <button ref={nextRef} className="custom-arrow right-2">
            <ChevronRight size={20} />
          </button>
        </Swiper>
      </div>
    </section>
  );
};

export default RelatedProducts;
