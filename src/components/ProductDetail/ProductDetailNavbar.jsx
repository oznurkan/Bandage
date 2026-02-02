import { NavLink } from "react-router-dom";

const ProductDetailNavbar = () => {
  return (
    <section className="w-full py-30 bg-thin-white xl:py-2 ">
      <article className="flex flex-col mx-auto items-center font-montserrat font-bold text-text-color xl:w-[86%] xl:flex-row xl:justify-between">
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
        </nav>
      </article>
    </section>
  );
};

export default ProductDetailNavbar;
