import {
  Search,
  ShoppingCart,
  Heart,
  
} from "lucide-react";
import { IoMdPerson, IoMdPersonAdd } from "react-icons/io";

const SharedActions = ({ isMobile = false, header, isSearchOpen, setIsSearchOpen }) => (
  <div className={`flex ${isMobile ? "flex-col items-center gap-6" : "flex-row items-center gap-4 xl:gap-6"}`}>
    <article className={`capitalize flex items-center justify-center gap-2 text-primary-color font-bold ${isMobile ? "text-3xl font-normal leading-12" : "text-sm"}`}>
      <IoMdPerson size={isMobile ? 28 : 16} />
      <span>
        {header.authentication.login} / {header.authentication.register}
      </span>
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
          isSearchOpen ? "w-full ml-2 opacity-100" : "w-0 opacity-0 pointer-events-none"
        }`}
      />
    </div>
    <button className="relative cursor-pointer">
      <ShoppingCart size={24} className="text-text-color hover:text-primary-color" />
      <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-primary-color border-2 border-white rounded-full">
        3
      </span>
    </button>
    <button className="relative cursor-pointer">
      <Heart size={24} className="text-text-color hover:text-primary-color" />
      <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-primary-color border-2 border-white rounded-full">
        3
      </span>
    </button>
  </div>
);

export default SharedActions;