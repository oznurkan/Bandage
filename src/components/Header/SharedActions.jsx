import { Search, ShoppingCart, Heart, LogOut } from "lucide-react"; // LogOut eklendi
import { IoMdPerson, IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Gravatar from "react-gravatar";
import { useDispatch} from "react-redux";
import { logoutUser } from "../../store/actions/clientActions";
import { toast } from "react-toastify";
import CartDropdown from "../Order/CartDropdown";
import { useState } from "react";

const SharedActions = ({
  header,
  user,
  isLoggedIn,
  isSearchOpen,
  setIsSearchOpen,
  isMobile,
  cartItemCount,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);


  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("Logged out successfully");
  };


  return (
    <div
      className={`flex ${isMobile ? "flex-col items-center gap-6" : "flex-row items-center gap-4 xl:gap-6"}`}
    >
      <article
        className={`capitalize flex items-center justify-center gap-2 text-primary-color font-bold ${isMobile ? "text-3xl font-normal leading-12" : "text-sm"}`}
      >
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer group">
              <Gravatar
                email={user.email}
                size={isMobile ? 40 : 32}
                className="rounded-full border-2 border-primary-color transition-transform group-hover:scale-110"
                default="identicon"
              />
              {!isMobile && (
                <span className="text-text-color font-bold">{user.name}</span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 text-text-color hover:text-danger-color transition-colors flex items-center gap-1"
              title="Logout"
            >
              <LogOut size={isMobile ? 28 : 18} />
              {isMobile && <span className="text-lg">Logout</span>}
            </button>
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
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
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

              <div className="absolute right-0 top-full mt-1 z-50">
                <CartDropdown />
              </div>
            </>
          )}
        </div>

        <button className="relative cursor-pointer group">
          <Heart
            size={24}
            className="text-text-color group-hover:text-primary-color transition-colors"
          />
          <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-primary-color border-2 border-white rounded-full">
            3
          </span>
        </button>
      </div>
    </div>
  );
};

export default SharedActions;
