import { NavLink } from "react-router-dom";

const CartNavbar = () => {
  return (
    <section className="w-full py-30 bg-thin-white xl:py-12 ">
      <article className="flex flex-col mx-auto items-center font-montserrat font-bold text-text-color md:w-[90%] xl:flex-row xl:justify-between">
        <h1 className="text-3xl font-bold text-text-color">Shopping Cart</h1>

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
            to="/cart"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-text-color"
                  : "text-second-text-color hover:text-primary-color"
              }`
            }
          >
            Cart
          </NavLink>
        </nav>
      </article>
    </section>
  );
};

export default CartNavbar;
