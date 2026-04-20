import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import WhatsAppPanel from "./WhatsAppPanel";




const Layout = () => {
  return (
    <>
      {/* FIXED NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="pt-17 min-h-screen">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />

       {/* ✅ GLOBAL WHATSAPP PANEL */}
      <WhatsAppPanel />
    </>
  );
};

export default Layout;