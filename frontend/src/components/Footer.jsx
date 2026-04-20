import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-12">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-10">
        {/* LEFT SECTION */}
        <div className="md:col-span-2">
          <div className="md:border-r md:pr-6">
            {/* LOGO */}
            <h2 className="text-xl font-bold text-blue-900 mb-2">YUKKON</h2>
            <p className="text-sm mb-4">
              An Electronics Engineering R & D Company
            </p>

            {/* CONTACT */}
            <div className="mb-4">
              <p className="text-sm">Got questions?</p>
              <p className="text-sm">
                Call us Monday - Saturday - 9 AM to 6 PM
              </p>
              <p className="text-lg font-semibold mt-1">+91 9944152541</p>
            </div>

            {/* ADDRESS */}
            <div className="text-sm leading-6">
              <p className="font-semibold">Contact info</p>
              <p>YUKKON</p>
              <p>Chennai, Tamilnadu, India</p>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-5">
              <Facebook className="cursor-pointer hover:text-blue-600" />
              <Twitter className="cursor-pointer hover:text-blue-600" />
              <Instagram className="cursor-pointer hover:text-blue-600" />
              <Youtube className="cursor-pointer hover:text-blue-600" />
            </div>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className="md:border-r md:pr-6">
            <h3 className="font-semibold mb-4">Category</h3>
            <ul className="space-y-2 text-sm">
              {/*<li className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer">Automatic Controller</li>
            <li className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer">Voltage Regulators</li>
            <li className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer">Sensors</li>
            <li className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer">Microcontrollers</li>
            <li className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer">Modules</li>
            <li className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer">Displays</li>
            <li className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer">Connectors</li>*/}
              <li>
                <Link
                  to="/products/waterpurifier"
                  className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Water Purifier
                </Link>
              </li>
              <li>
                <Link
                  to="/products/industrialro"
                  className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Industrial RO
                </Link>
              </li>
              {/*<li>
                <Link
                  to="/products/kitchenappliances"
                  className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Kitchen Appliances
                </Link>
              </li>
              <li>
                <Link
                  to="/products/airpurifier"
                  className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Air Purifier
                </Link>
              </li>*/}

              <li>
                <Link
                  to="/products/watercontroller"
                  className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  Water Controller
                </Link>
              </li>
            </ul>
          </div>

          {/* USEFUL LINKS */}
          <div className="md:border-r md:pr-6">
            <h3 className="font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 block"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 hover:translate-x-1 transition-all duration-200 block"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-blue-600 transition-all duration-200 block"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-blue-600 transition-all duration-200 block"
                >
                  Terms & Condition
                </Link>
              </li>

              <li>
                <Link
                  to="/refund-policy"
                  className="hover:text-blue-600 transition-all duration-200 block"
                >
                  Return/Cancellation Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping-policy"
                  className="hover:text-blue-600 transition-all duration-200 block"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              {/*<li className="hover:text-blue-600 cursor-pointer">Order Tracking</li>
            <li className="hover:text-blue-600 cursor-pointer">Wishlist</li>*/}
              <li>
                <Link
                to="/orders"
                className="hover:text-blue-600 cursor-pointer"
                >
                My Orders
                </Link>
              </li>
              <li>
                <Link
                to="/profile"
                className="hover:text-blue-600 cursor-pointer"
                >
                  My Profile
                </Link>
              </li>
              <li className="hover:text-blue-600 cursor-pointer">Shop</li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t mt-10 py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© {new Date().getFullYear()} YUKKON - All rights Reserved</p>

        {/* PAYMENT ICONS 
        <div className="flex gap-3 mt-3 md:mt-0">
          <img src="/visa.png" alt="visa" className="h-6" />
          <img src="/mastercard.png" alt="mastercard" className="h-6" />
          <img src="/gpay.png" alt="gpay" className="h-6" />
          <img src="/upi.png" alt="upi" className="h-6" />
        </div>*/}
      </div>
    </footer>
  );
};

export default Footer;
