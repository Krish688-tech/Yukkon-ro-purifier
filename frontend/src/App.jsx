import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home.jsx";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage.jsx";
import ProductSpecification from "./pages/ProductSpecification";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
import UpdateProfilePage from "./pages/UpdateProfilePage.jsx";
import Layout from "./components/Layout";
import CategoryPage from "./pages/wideproductpages/CategoryPage";
import AboutUs from "./pages/footer/AboutUs.jsx";
import ContactUs from "./pages/footer/ContactUs.jsx";
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";
import TermsConditions from "./pages/footer/TermsConditions";
import RefundPolicy from "./pages/footer/RefundPolicy";
import ShippingPolicy from "./pages/footer/ShippingPolicy";
import ProductReviewPage from "./pages/ProductReviewPage.jsx";
import CartPage from "./pages/CartPage";
import EnquiryPage from "./pages/EnquiryPage.jsx";

import AdminEnquiries from "./pages/admin/AdminEnquiries.jsx";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import CashOnDeliveryPage from "./pages/CashOnDeliveryPage";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import GoogleSuccess from "./pages/GoogleSuccess.jsx";
import "./App.css";

function App() {
  return (
    <>
      <ScrollToTop /> {/* ✅ FIXED POSITION */}
      <Routes>
        {/* 🔥 Wrap everything inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id/:slug" element={<ProductSpecification />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="orders" element={<OrderHistoryPage />} />
          <Route path="profile" element={<UpdateProfilePage />} />
          <Route path="products/:category" element={<CategoryPage />} />

          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />

          <Route path="/product/:id/:slug/review" element={<ProductReviewPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
         
          <Route path="/admin/enquiries" element={<ProtectedAdminRoute><AdminEnquiries /></ProtectedAdminRoute>}/>
          <Route path="/cash-on-delivery" element={<CashOnDeliveryPage />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/google-success" element={<GoogleSuccess />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
