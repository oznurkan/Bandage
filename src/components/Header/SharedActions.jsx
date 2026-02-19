import { Search, ShoppingCart, Heart, LogOut } from "lucide-react";
import { IoMdPerson, IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CartDropdown from "../Cart/CartDropdown";
import { useState } from "react";
import UserDropdown from "./UserDropdown";

const SharedActions = ({
  header,
  isLoggedIn,
  isSearchOpen,
  setIsSearchOpen,
  isMobile,
  cartItemCount,
  favoritesCount,
}) => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div
      className={`flex ${isMobile ? "flex-col items-center gap-6" : "flex-row items-center gap-4 xl:gap-4"}`}
    >
      <article
        className={`capitalize flex items-center justify-center gap-2 text-primary-color font-bold ${isMobile ? "text-3xl font-normal leading-12" : "text-sm"}`}
      >
        {isLoggedIn ? (
          <div className="flex items-center gap-0.5">
            <UserDropdown isMobile={isMobile} />
          </div>
        ) : (
          <>
            <a
              onClick={() => navigate("/login")}
              className="cursor-pointer flex gap-2 justify-center items-center hover:opacity-80"
            >
              <IoMdPerson size={isMobile ? 28 : 16} />
              <span>{header.authentication.login}</span>
            </a>
            <span> /</span>
            <a
              onClick={() => navigate("/signup")}
              className="cursor-pointer flex gap-2 justify-center items-center hover:opacity-80"
            >
              <IoMdPersonAdd size={isMobile ? 28 : 16} />
              <span>{header.authentication.register}</span>
            </a>
          </>
        )}
      </article>
      <div
        className={`flex items-center transition-all duration-500 ease-in-out overflow-hidden ${
          isSearchOpen
            ? "w-48 border border-primary-color rounded-4xl px-2 py-1 opacity-100"
            : "w-7 border border-transparent opacity-100 px-1"
        }`}
      >
        <Search
          size={24}
          className={`cursor-pointer hover:text-primary-color transition-colors shrink-0 ${
            isSearchOpen ? "text-primary-color" : "text-text-color"
          }`}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        />
        <input
          type="text"
          placeholder="Ara..."
          className={`outline-none bg-transparent text-sm transition-all duration-300 ${
            isSearchOpen
              ? "w-full ml-2 opacity-100"
              : "w-0 opacity-0 pointer-events-none"
          }`}
        />
      </div>

      <div className="relative">
        <button
          onClick={() => setIsCartOpen((prev) => !prev)}
          className="relative cursor-pointer focus:outline-none flex items-center justify-center group"
        >
          <ShoppingCart
            size={24}
            className={`transition-colors pointer-events-none ${
              isCartOpen
                ? "text-primary-color"
                : "text-text-color group-hover:text-primary-color"
            }`}
          />

          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold text-white bg-primary-color border-2 border-white rounded-full pointer-events-none">
              {cartItemCount}
            </span>
          )}
        </button>
        {isCartOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setIsCartOpen(false)}
            />

            <div className="absolute -right-30 top-full mt-1 z-50 xl:right-0">
              <CartDropdown />
            </div>
          </>
        )}
      </div>

      <button className="relative cursor-pointer group">
        <Heart
          size={24}
          onClick={() => navigate("/favorites")}
          className="text-text-color group-hover:text-primary-color transition-colors"
        />
        {favoritesCount > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold text-white bg-primary-color border-2 border-white rounded-full pointer-events-none">
            {favoritesCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default SharedActions;
