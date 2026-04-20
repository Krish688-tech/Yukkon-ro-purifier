import { useParams } from "react-router-dom";
import { API_URL } from "../data/api";
import products from "../data/products";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProductReviewPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const product = products.find((p) => p.id === Number(id));
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(0);

  if (!product) return <p>Product not found</p>;

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // ❌ NOT LOGGED IN
    if (!user) {
      Swal.fire({
        title: "Sign in required",
        html: "<b>Login to submit your review ✨</b>",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#7c3aed",
        cancelButtonColor: "#6b7280",
        background: "#1f2937",
        color: "#fff",
        backdrop: `rgba(0,0,0,0.8)`,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {
            state: { from: `/product/${product.id}/${product.slug}/review` },
          });
        }
      });

      return; // 🚫 stop API call
    }

    // ❌ VALIDATION (optional but good UX)
    if (!rating || !comment) {
      Swal.fire({
        title: "Missing fields",
        text: "Please add rating and comment",
        icon: "info",
        confirmButtonColor: "#7c3aed",
      });
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
          userId: user._id,
          name: user.name,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          title: "Error",
          text: data.error || "Something went wrong",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
        return;
      }

      // ✅ SUCCESS PREMIUM POPUP
      Swal.fire({
        title: "Review Submitted 🎉",
        html: "<b>Thanks for your feedback!</b>",
        icon: "success",
        confirmButtonColor: "#7c3aed",
        background: "#1f2937",
        color: "#fff",
        timer: 2000,
        showConfirmButton: false,
      });

      // reset form
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Server error. Try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">
          Review for {product.name}
        </h2>

        <p className="text-gray-500 mb-6">
          Share your experience with this product
        </p>

        {/* Rating */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`text-2xl ${
                star <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
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

        <button
          className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full"
          onClick={handleSubmit}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ProductReviewPage;
