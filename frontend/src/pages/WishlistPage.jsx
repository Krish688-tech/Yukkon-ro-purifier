import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import products from "../data/products";

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  // 🔥 map wishlist → full product data
const productMap = new Map(products.map(p => [p.id, p]));

const wishlistProducts = wishlist
  .map(w => productMap.get(Number(w.productId)))
  .filter(Boolean);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8">❤️ Your Wishlist</h2>

      {wishlistProducts.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {wishlistProducts.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              {/* 🖼 IMAGE */}
              <img
                src={item.images?.[0] || item.img}
                alt={item.name}
                className="w-24 h-24 object-contain rounded"
              />

              {/* 📦 DETAILS */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-purple-600 font-bold">₹{item.price}</p>

                <div className="flex gap-3 mt-3">
                  {/* 🛒 ADD TO CART */}
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg text-sm"
                  >
                    Add to Cart
                  </button>

                  {/* ❌ REMOVE */}
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;