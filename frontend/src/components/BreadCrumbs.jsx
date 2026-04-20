import { useLocation, useNavigate } from "react-router-dom";
import  products  from "../data/products";

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div className="text-sm text-gray-600 mb-6">
      {/* HOME */}
      <span
        onClick={() => navigate("/")}
        className="cursor-pointer hover:text-blue-600"
      >
        Home
      </span>

      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");

        let displayName = name;

        // 🔥 If it's a product ID → replace with product name
        const product = products.find(p => String(p?.id) === value);
        if (product) {
          displayName = product.name;
        } else {
          displayName = name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
        }

        return (
          <span key={index}>
            {" / "}
            <span
              onClick={() => {
                // ❌ prevent navigation to /product
                if (routeTo === "/product") return;

                navigate(routeTo);
              }}
              className="cursor-pointer hover:text-blue-600"
            >
              {displayName}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
