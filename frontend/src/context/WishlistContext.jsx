import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, getToken } = useContext(AuthContext);

  const [wishlist, setWishlist] = useState([]);

  // ✅ FETCH wishlist when user logs in
  useEffect(() => {
    if (!user) {
      setWishlist([]); // ✅ reset when logged out
      return;
    }

    const fetchWishlist = async () => {
      try {
        const token = await getToken();

        const res = await fetch("http://localhost:5000/api/wishlist", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // ✅ REMOVE DUPLICATES (important safety)
        const uniqueWishlist = data.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (w) => Number(w.productId) === Number(item.productId)
            )
        );

        setWishlist(uniqueWishlist);
      } catch (err) {
        console.log("Wishlist fetch error:", err);
      }
    };

    fetchWishlist();
  }, [user, getToken]);

  // ✅ TOGGLE wishlist (add/remove)
  const toggleWishlist = async (productId) => {
    if (!productId) return; // safety guard

    setWishlist((prev) => {
      const exists = prev.some(
        (w) => Number(w.productId) === Number(productId)
      );

      if (exists) {
        return prev.filter(
          (w) => Number(w.productId) !== Number(productId)
        );
      } else {
        return [...prev, { productId }];
      }
    });

    try {
      const token = await getToken();

      await fetch("http://localhost:5000/api/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
    } catch (err) {
      console.error("Toggle wishlist error:", err);
    }
  };

  // ✅ REMOVE explicitly (clean UX)
  const removeFromWishlist = async (productId) => {
    if (!productId) return;

    // instant UI update
    setWishlist((prev) =>
      prev.filter((w) => Number(w.productId) !== Number(productId))
    );

    try {
      const token = await getToken();

      await fetch("http://localhost:5000/api/wishlist/toggle", {
        method: "POST", // same endpoint handles remove
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
    } catch (err) {
      console.error("Remove wishlist error:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};