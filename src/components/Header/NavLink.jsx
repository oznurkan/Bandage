import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const NavLinkHeader = ({ link, isMobile, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const categories = useSelector((state) => state.product.categories);

  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isWomenOpen, setIsWomenOpen] = useState(false);
  const [isMenOpen, setIsMenOpen] = useState(false);

  const isShopLink = link.toLowerCase() === "shop";

  const isActive = () => {
    const currentPath = location.pathname.toLowerCase();
    const linkPath = `/${link.toLowerCase()}`;

    if (link.toLowerCase() === "home") {
      return currentPath === "/";
    }

    return currentPath.startsWith(linkPath);
  };

  const handleNavigate = (path) => {
    navigate(path);
    onClose?.();
    setIsShopOpen(false);
  };

  if (!isMobile && isShopLink) {
    return (
      <div
        className="relative group font-montserrat text-sm font-bold leading-6"
        onMouseEnter={() => setIsShopOpen(true)}
        onMouseLeave={() => setIsShopOpen(false)}
      >
        <button
          onClick={() => handleNavigate("/shop")}
          className={`flex items-center cursor-pointer capitalize gap-1 hover:text-primary-color transition-colors py-2
            ${isActive() ? "text-text-color" : "text-second-text-color"}`}
        >
          {link}
          <ChevronDown
            size={14}
            className={`transition-transform ${isShopOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isShopOpen && (
          <div className="absolute top-full left-0 min-w-100 bg-white shadow-2xl border border-gray-100 rounded-lg p-6 z-50 flex gap-10">
            <div className="flex-1">
              <h3 className="font-extrabold text-text-color mb-3 border-b pb-1 text-base">
                Kadın
              </h3>
              <div className="space-y-1">
                {categories
                  .filter((cat) => cat.gender === "k")
                  .map((cat) => {
                    const categoryPath = `/shop/kadin/${cat.slug}/${cat.id}`;
                    const isCategoryActive = location.pathname === categoryPath;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleNavigate(categoryPath)}
                        className={`block w-full text-left cursor-pointer px-2 py-1.5 text-sm hover:bg-primary-color/10 hover:text-primary-color rounded transition-colors
                      ${
                        isCategoryActive
                          ? "text-text-color"
                          : "text-second-text-color"
                      }`}
                      >
                        {cat.title}
                      </button>
                    );
                  })}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-extrabold text-text-color mb-3 border-b pb-1 text-base">
                Erkek
              </h3>
              <div className="space-y-1">
                {categories
                  .filter((cat) => cat.gender === "e")
                  .map((cat) => {
                    const categoryPath = `/shop/erkek/${cat.slug}/${cat.id}`;
                    const isCategoryActive = location.pathname === categoryPath;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleNavigate(categoryPath)}
                        className={`block w-full text-left px-2 cursor-pointer py-1.5 text-sm hover:bg-primary-color/10 hover:text-primary-color rounded transition-colors
                                 ${
                                   isCategoryActive
                                     ? "text-text-color"
                                     : "text-second-text-color"
                                 }`}
                      >
                        {cat.title}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isMobile && isShopLink) {
    return (
      <div className="w-full font-montserrat text-sm font-normal leading-6">
        <button
          onClick={() => setIsShopOpen(!isShopOpen)}
          className={`flex items-end capitalize justify-center gap-0.5 w-full text-3xl cursor-pointer hover:text-primary-color
          ${isActive() ? "text-text-color" : "text-second-text-color"}`}
        >
          {link}
          <ChevronDown
            size={24}
            className={`transition-transform ${isShopOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isShopOpen && (
          <div className="flex flex-col items-center gap-4 mt-4 px-6">
            <button
              onClick={() => handleNavigate("/shop")}
              className={`text-lg font-semibold w-40 cursor-pointer hover:text-primary-color border-b pb-2
              ${
                location.pathname.toLowerCase() === "/shop"
                  ? "text-text-color border-primary-color"
                  : "text-second-text-color border-transparent"
              }`}
            >
              Tüm Ürünler
            </button>
            <div>
              <button
                onClick={() => setIsWomenOpen(!isWomenOpen)}
                className="flex items-center justify-center w-full py-2 text-xl font-bold text-text-color cursor-pointer hover:text-primary-color"
              >
                Kadın
                <ChevronDown
                  size={20}
                  className={`transition-transform ${isWomenOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isWomenOpen && (
                <div className="flex flex-col items-center gap-2 mt-2 pl-4">
                  {categories
                    .filter((cat) => cat.gender === "k")
                    .map((cat) => {
                      const categoryPath = `/shop/kadin/${cat.slug}/${cat.id}`;
                      const isCategoryActive =
                        location.pathname === categoryPath;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleNavigate(categoryPath)}
                          className={`text-left cursor-pointer py-2 text-base hover:text-primary-color transition-colors
                        ${
                          isCategoryActive
                            ? "text-text-color"
                            : "text-second-text-color"
                        }`}
                        >
                          {cat.title}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setIsMenOpen(!isMenOpen)}
                className="flex items-center justify-center w-full py-2 text-xl font-bold text-text-color cursor-pointer hover:text-primary-color"
              >
                Erkek
                <ChevronDown
                  size={20}
                  className={`transition-transform ${isMenOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isMenOpen && (
                <div className="flex flex-col items-center gap-2 mt-2 pl-4">
                  {categories
                    .filter((cat) => cat.gender === "e")
                    .map((cat) => {
                      const categoryPath = `/shop/erkek/${cat.slug}/${cat.id}`;
                      const isCategoryActive =
                        location.pathname === categoryPath;

                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleNavigate(categoryPath)}
                          className={`text-center py-2 cursor-pointer text-base hover:text-primary-color transition-colors
                        ${
                          isCategoryActive
                            ? "text-text-color"
                            : "text-second-text-color"
                        }`}
                        >
                          {cat.title}
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <a
      aria-label={`go to ${link}`}
      href={`/${link.toLowerCase()}`}
      onClick={onClose}
      className={`hover:text-primary-color transition-colors 
        ${isMobile ? "text-3xl" : "py-2"}  
        ${isActive() ? "text-text-color" : "text-second-text-color"}`}
    >
      {link}
    </a>
  );
};

export default NavLinkHeader;
