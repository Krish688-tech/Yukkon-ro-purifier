import { useState, useContext, useEffect, useRef } from "react";
import { API_URL } from "../data/api.js";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartPopup from "../components/CartPopup.jsx";
import { useParams } from "react-router-dom";
import products from "../data/products";
import ImageZoom from "../components/ImageZoom";
import SEO from "../components/SEO";
import Swal from "sweetalert2";

const ProductSpecification = () => {
  const { cart, addToCart, increaseQty, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [tab, setTab] = useState("description");
  const { id, slug } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const createSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const correctSlug = product ? createSlug(product.name) : "";
  const url = product
    ? `https://yourdomain.com/product/${product.id}/${correctSlug}`
    : "";
  const relatedProducts = product
    ? products.filter(
        (p) =>
          p.category === product.category &&
          p.type === product.type &&
          p.id !== product.id,
      )
    : [];
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);
  useEffect(() => {
    if (!product) return;

    if (slug !== correctSlug) {
      navigate(`/product/${product.id}/${correctSlug}`, { replace: true });
    }
  }, [product, slug, navigate]);

  if (!product) {
    return <h1 className="text-center mt-20 text-xl">Product Not Found</h1>;
  }
  const item = cart.find((i) => i.productId === product.id);
  //const qty = item?.qty || 1;
  const [qty, setQty] = useState(1);
  const highlights = product.features.filter((f) => f.highlight);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [total, setTotal] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const { user } = useContext(AuthContext);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const lastTap = useRef(0);
  const initialDistance = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  //PRICE CALCULATION
  const discount = 0.1;

  const discountedPrice = product.price * qty;
  const originalPrice = Math.round(discountedPrice / (1 - discount));

  const discountPercentage = discount * 100;
  const savings = originalPrice - discountedPrice;

  const getDistance = (touches) => {
    const [t1, t2] = touches;
    return Math.sqrt(
      Math.pow(t2.clientX - t1.clientX, 2) +
        Math.pow(t2.clientY - t1.clientY, 2),
    );
  };

  useEffect(() => {
    if (showZoom) {
      const index = product.images.findIndex((img) => img === mainImage);
      setCurrentIndex(index || 0);
    }
  }, [showZoom]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % product.images.length;
    setCurrentIndex(nextIndex);
    setMainImage(product.images[nextIndex]);
    setZoomScale(1); // reset zoom
  };

  const handlePrev = () => {
    const prevIndex =
      (currentIndex - 1 + product.images.length) % product.images.length;
    setCurrentIndex(prevIndex);
    setMainImage(product.images[prevIndex]);
    setZoomScale(1);
  };

  const handleTouchStart = (e) => {
    // 👉 Double tap
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      setZoomScale((prev) => (prev === 1 ? 2.5 : 1));
    }
    lastTap.current = now;

    // 👉 Pinch start
    if (e.touches.length === 2) {
      initialDistance.current = getDistance(e.touches);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialDistance.current) {
      const newDistance = getDistance(e.touches);
      let scale = newDistance / initialDistance.current;

      // Smooth + limit zoom
      scale = Math.min(Math.max(scale, 1), 4);

      setZoomScale(scale);
    }
  };

  const handleTouchEnd = () => {
    initialDistance.current = null;
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      setZoomScale((prev) => (prev === 1 ? 2.5 : 1));
    }

    lastTap.current = now;
  };
  const handleReviewSubmit = async () => {
    if (!user) {
      alert("Please login to submit a review");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          userId: user._id, // ✅ real user id
          name: user.name, // ✅ real user name
          rating,
          comment,
        }),
      });

      const data = await res.json();

      // ✅ important fix (avoid stale state bug)
      setReviews((prev) => {
        const updated = [data, ...prev];

        const total = updated.length;
        const avg = updated.reduce((acc, r) => acc + r.rating, 0) / total;

        setAvgRating(Number(avg.toFixed(1)));

        return updated;
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!product?.id) return; // ✅ prevent invalid call

    fetch(`${API_URL}/api/reviews/${product.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setReviews(data.reviews || []);
        setAvgRating(data.avgRating || 0);
      })
      .catch((err) => {
        console.error("Review fetch error:", err);
        setReviews([]);
        setAvgRating(0);
      });
  }, [product]);

  useEffect(() => {
    if (item) {
      setQty(item.qty);
    }
  }, [item]);

  const handleAddToCart = (product) => {
    if (!user) {
      Swal.fire({
        title: "🔒 Sign in Required",
        text: "Please login to add items to your cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Register",
        confirmButtonColor: "#7c3aed",
        cancelButtonColor: "#6b7280",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/register");
        }
      });

      return; //STOP here
    }

    // ✅ Only runs if logged in
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      qty: qty,
    });

    setShowCart(true);

    // ✅ Optional success toast
    Swal.fire({
      icon: "success",
      title: "Added to cart 🛒",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <>
      <SEO product={product} url={url} />
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-100 px-4 sm:px-6 md:px-16 py-6 sm:py-12">
        {/* MAIN CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/70 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl border border-gray-300">
          {/* IMAGES */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setMainImage(img)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover cursor-pointer border transition shrink-0 ${
                    mainImage === img
                      ? "border-purple-500 scale-105"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex-1 flex justify-center">
              <div
                className="w-[85%] sm:w-[75%] md:w-full cursor-zoom-in"
                onClick={() => setShowZoom(true)}
              >
                {isMobile ? (
                  <img
                    src={mainImage}
                    onClick={() => setShowZoom(true)}
                    className="w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-xl"
                  />
                ) : (
                  <ImageZoom src={mainImage} />
                )}
                {/* ✅ Enquiry Button (Only for Industrial RO) */}
                {product.category === "industrialro" && (
                  <button
                    onClick={() =>
                      navigate("/enquiry", {
                        state: {
                          productName: product.name,
                          productImage: mainImage,
                        },
                      })
                    }
                    className="w-full bg-linear-to-r from-green-400 via-emerald-500 to-green-400 text-white py-2 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
                  >
                    Enquiry Now 📩
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
              {product.name}
            </h1>

            <div className="mt-4">
              {/* PRICE ROW */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                {/* PRICE */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-semibold text-purple-600">
                    ₹{discountedPrice}
                  </span>

                  <span className="line-through text-gray-400">
                    ₹{originalPrice}
                  </span>
                </div>

                {/* BADGES (Tablet + Desktop) */}
                <div className="hidden sm:flex md:flex-1 md:justify-center lg:justify-start items-center gap-2 mt-2 sm:mt-0">
                  <span className=" bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full text-center min-w-30">
                    You saved ₹{savings}
                  </span>

                  <span className=" bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full text-center min-w-22.5">
                    {Math.round((savings / originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>

              {/* MOBILE */}
              <div className="flex sm:hidden flex-wrap gap-2 mt-2">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full text-center">
                  You saved ₹{savings}
                </span>

                <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full text-center">
                  {Math.round((savings / originalPrice) * 100)}% OFF
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-2">Inclusive of all taxes</p>

            {/* FEATURES */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {highlights.map((f, i) => (
                <div
                  key={i}
                  className="bg-purple-50 border border-purple-100 rounded-xl p-4"
                >
                  <p className="text-xs text-gray-500">{f.label}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {f.value}
                  </p>
                </div>
              ))}
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                -
              </button>

              <span className="text-xl font-semibold">{qty}</span>

              <button
                onClick={() => setQty((prev) => prev + 1)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                +
              </button>
              {/*<button
              onClick={() => decreaseQty(product.id)}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              -
            </button>

            <span className="text-xl font-semibold">{qty}</span>

            <button
              onClick={() => increaseQty(product.id)}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              +
            </button>*/}
            </div>

            {/* BUTTON */}
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-6 sm:mt-8 w-full py-3 sm:py-4 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold text-base sm:text-lg shadow-lg active:scale-95 transition"
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-14 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg">
          <div className="flex gap-4 border-b pb-4 text-lg font-medium">
            {["description", "specification", "reviews"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`capitalize transition ${
                  tab === t
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-6 text-gray-700 max-w-3xl mx-auto text-center md:text-left">
            {/*DESCRIPTION */}
            {tab === "description" && (
              <div className="space-y-6 text-gray-700">
                {/* TITLE */}
                <h2 className="text-xl sm:text-2xl mt-2 font-semibold text-gray-800 text-center md:text-left">
                  {product.description?.title}
                </h2>

                {/* INTRO */}
                <p className="leading-7 text-gray-600 text-justify md:text-left">
                  {product.description?.intro}
                </p>

                {/* HIGHLIGHTS */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Key Features
                  </h3>

                  <ul className="space-y-2 text-left">
                    {product.description?.highlights?.map((item, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-green-500 mt-1">✔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* APPLICATIONS */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Applications
                  </h3>

                  <ul className="space-y-2 text-left">
                    {product.description?.applications?.map((item, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-purple-500 mt-1">➤</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/*SPECIFICATION */}
            {tab === "specification" && (
              <div className="mt-4 border rounded-xl overflow-hidden">
                {product.features.map((f, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-2 px-4 py-3 ${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <span className="text-gray-600 font-medium">{f.label}</span>
                    <span className="text-gray-800">{f.value}</span>
                  </div>
                ))}
              </div>
            )}
            {/*REVIEWS */}
            {tab === "reviews" && (
              <div className="space-y-8">
                {/* HEADER */}
                <div className="flex justify-between mt-2 items-center">
                  <h2 className="text-2xl font-semibold">Customer Reviews</h2>

                  <button
                    onClick={() => navigate(`/product/${id}/${slug}/review`)}
                    className="bg-purple-600 text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:scale-105 transition"
                  >
                    Add Your Review
                  </button>
                </div>

                {/* REVIEWS LIST */}
                <div className="mt-6">
                  {/* ⭐ AVG RATING */}
                  <h3 className="text-lg font-semibold mb-4">
                    ⭐ {avgRating} / 5 ({reviews.length} reviews)
                  </h3>

                  {/* REVIEWS LIST */}
                  <div className="space-y-6">
                    {reviews.slice(0, 3).map((r, i) => (
                      <div
                        key={i}
                        className="border p-5 rounded-xl bg-white shadow-sm"
                      >
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{r.name}</p>

                          {/* ⭐ Stars */}
                          <p className="text-yellow-500">
                            {"★".repeat(r.rating)}
                            <span className="text-gray-300">
                              {"★".repeat(5 - r.rating)}
                            </span>
                          </p>
                        </div>

                        {/* COMMENT */}
                        <p className="text-gray-600 mt-2">{r.comment}</p>

                        {/* IMAGES */}
                        {r.images?.length > 0 && (
                          <div className="flex gap-3 mt-3">
                            {r.images.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                className="w-16 h-16 object-cover rounded-lg border"
                              />
                            ))}
                          </div>
                        )}

                        {/* DATE */}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 👉 VIEW ALL BUTTON */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={() =>
                        navigate(`/product/${product.id}/${slug}/reviews`)
                      }
                      className="text-purple-600 font-medium hover:underline"
                    >
                      View All Reviews →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/*Review form */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-lg">
              <h3 className="text-xl font-semibold mb-4">
                Review for {product.name}
              </h3>

              {/* Rating */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={
                      star <= rating ? "text-yellow-500" : "text-gray-300"
                    }
                  >
                    ⭐
                  </button>
                ))}
              </div>

              {/* Comment */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="w-full border p-3 rounded-lg mb-4"
              />

              {/* Image Upload */}
              <input
                type="file"
                multiple
                onChange={(e) => setImages([...e.target.files])}
                className="mb-4"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowReviewForm(false)}>Cancel</button>

                <button
                  onClick={handleReviewSubmit}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        {/* RELATED */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.slice(0, 3).map((item, index) => {
              const discount = 0.1;

              //DB price is already discounted
              const discountedPrice = item.price;

              // Calculate original price
              const originalPrice = Math.round(
                discountedPrice / (1 - discount),
              );

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl shadow hover:shadow-xl transition cursor-pointer"
                  onClick={() =>
                    navigate(`/product/${item.id}/${createSlug(item.name)}`)
                  }
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-48 w-full object-contain rounded-xl"
                  />

                  <h3 className="mt-3 font-semibold">{item.name}</h3>

                  {/* ✅ PRICE UI (UPDATED) */}
                  <div className="mt-2">
                    <span className="text-purple-600 font-bold text-lg">
                      ₹{discountedPrice}
                    </span>

                    <span className="ml-2 text-sm text-gray-400 line-through">
                      ₹{originalPrice}
                    </span>

                    <span className="ml-2 text-sm text-green-600 font-semibold">
                      10% OFF
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="w-full bg-linear-to-r from-purple-600 to-indigo-400 text-white py-2 rounded-xl font-semibold hover:scale-105 transition">
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {showCart && <CartPopup onClose={() => setShowCart(false)} />}
        {/* MODAL IMAGE ZOOM FOR MOBILE DEVICES */}
        {showZoom && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => {
                setShowZoom(false);
                setZoomScale(1);
              }}
              className="absolute top-4 right-4 text-white text-3xl"
            >
              ✕
            </button>

            {/* LEFT ARROW */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 text-white text-3xl bg-black/40 hover:bg-black/60 rounded-full w-10 h-10 flex items-center justify-center z-50"
            >
              ‹
            </button>

            {/* IMAGE */}
            <img
              src={product.images[currentIndex]}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="max-h-[85vh] max-w-[90%] object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoomScale})`,
                touchAction: zoomScale > 1 ? "none" : "auto",
              }}
            />

            {/* RIGHT ARROW */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 text-white text-3xl bg-black/40 hover:bg-black/60 rounded-full w-10 h-10 flex items-center justify-center z-50"
            >
              ›
            </button>

            {/* IMAGE COUNT */}
            <div className="absolute bottom-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentIndex + 1} / {product.images.length}
            </div>

            {/* THUMBNAILS INSIDE MODAL */}
            <div className="flex gap-3 mt-6 overflow-x-auto px-4">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setMainImage(img)}
                  className={`w-14 h-14 rounded-full object-cover cursor-pointer border ${
                    mainImage === img ? "border-purple-500" : "border-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductSpecification;
