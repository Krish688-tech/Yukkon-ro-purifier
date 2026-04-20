import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { HelmetProvider } from "react-helmet-async";


createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
            <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </HelmetProvider>,
);
