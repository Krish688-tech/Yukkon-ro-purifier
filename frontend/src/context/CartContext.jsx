import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { API_URL } from "../data/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, getToken } = useContext(AuthContext);

  const [cart, setCart] = useState([]);

  // ✅ FETCH CART FROM BACKEND
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;

      try {
        const res = await fetch(`${API_URL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        const data = await res.json();
        setCart(data.items || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [user]);

  // ✅ ADD TO CART (BACKEND)
  const addToCart = async (product) => {
    try {
      const token = await getToken();

      const res = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product: {
            id: product.productId, // 🔥 IMPORTANT
            name: product.name,
            price: product.price,
            image: product.image,
            qty: product.qty, // ✅ USE REAL QTY
          },
        }),
      });

      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // ✅ REMOVE ITEM
  const removeFromCart = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/cart/remove/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await res.json();
      setCart(data.items);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // ✅ UPDATE QTY
  const updateQty = async (productId, qty) => {
    try {
      const res = await fetch(`${API_URL}/api/cart/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ productId, qty }),
      });

      const data = await res.json();
      setCart(data.items);
    } catch (err) {
      console.error("Error updating qty:", err);
    }
  };

  // ✅ CLEAR CART
  const clearCart = async () => {
    try {
      await fetch(`${API_URL}/api/cart/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setCart([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const total = useMemo(() => {
    return (cart || []).reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return (cart || []).reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
