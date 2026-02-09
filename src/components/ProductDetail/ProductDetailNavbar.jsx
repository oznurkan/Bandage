import { ChevronLeft} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const ProductDetailNavbar = () => {
  const navigate = useNavigate();
  const product = useSelector((state) => state.product.selectedProduct);
  return (
    <section className="w-full py-30 bg-thin-white xl:py-2 ">
      <article className="flex flex-col mx-auto items-center font-montserrat font-bold text-text-color xl:w-[86%] xl:flex-row xl:justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center cursor-pointer gap-2 text-primary-color hover:text-blue-700 transition-all text-sm group"
          >
            <ChevronLeft size={20} className=" transition-transform" /> 
            Back to Shop
          </button>
        </div>
        <nav className="flex py-2.5 gap-4 text-sm leading-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-text-color"
                  : "text-second-text-color hover:text-primary-color"
              }`
            }
          >
            Home
          </NavLink>
          <div className="text-muted-color">{">"}</div>
          <NavLink
            to="/shop"
            end
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-text-color"
                  : "text-second-text-color hover:text-primary-color"
              }`
            }
          >
            Shop
          </NavLink>
          <div className="text-muted-color">{">"}</div>
          {product?.name && (
            <NavLink
              to={location.pathname} 
                className={({ isActive }) =>
                  `transition-colors truncate ${
                    isActive
                      ? "text-text-color cursor-default"
                      : "text-second-text-color hover:text-primary-color"
                  }`
                }
              >
            {product.name}
          </NavLink>
          )}
        </nav>
      </article>
    </section>
  );
};

export default ProductDetailNavbar;
