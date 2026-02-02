import {
  Search,
  ShoppingCart,
  X,
  Phone,
  Mail,
  Heart,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/slices/dataInfoSlice";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoMdPerson, IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import SharedActions from "./SharedActions";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <div className="text-center py-10">Yükleniyor...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const { header } = content || {};

  return (
    <main
      className={`${isMenuOpen === true ? "bg-white" : "bg-transparent"} absolute top-0 left-0 w-full xl:static xl:pt-0 xl:bg-white z-50`}
    >
      {header && (
        <>
          <section className="hidden w-full justify-between items-center font-montserrat font-bold text-sm leading-6 bg-dark-background-color px-8 py-0.5 text-white xl:flex">
            <article className="flex gap-2.5">
              <a
                href={`tel:${header.telephone}`}
                title="go to phone"
                aria-label="go to phone"
                className="flex gap-1.5 p-2.5 items-center hover:text-primary-color transition-colors cursor-pointer"
              >
                <Phone size={16} />
                <h6>{header.telephone}</h6>
              </a>
              <a
                href={`mailto:${header.email}`}
                title="go to email"
                aria-label="go to email"
                className="flex gap-1.5 p-2.5 items-center hover:text-primary-color transition-colors cursor-pointer"
              >
                <Mail size={16} />
                <h6>{header.email}</h6>
              </a>
            </article>
            <h6>{header.text}</h6>
            <article className="flex p-2.5 gap-2.5 items-center">
              <h6 className="capitalize flex items-center">
                {header.follow}
                <span className="ml-3">:</span>
              </h6>
              <div className="flex items-center gap-5">
                {[
                  {
                    Icon: FaInstagram,
                    link: content.instagram,
                    name: "instagram",
                  },
                  { Icon: FaYoutube, link: content.youtube, name: "youtube" },
                  {
                    Icon: FaFacebook,
                    link: content.facebook,
                    name: "facebook",
                  },
                  { Icon: FaTwitter, link: content.twitter, name: "twitter" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    title={`go to ${item.name}`}
                    aria-label={`go to ${item.name}`}
                    className="py-1.5 text-white hover:text-primary-color cursor-pointer hover:scale-110 transition-transform"
                  >
                    <item.Icon size={18} />
                  </a>
                ))}
              </div>
            </article>
          </section>
          <header className="flex justify-between font-montserrat items-center w-[80%] xl:w-[95%] mx-auto py-7 bg-transparent xl:bg-white">
            <article className="flex items-center gap-10 xl:gap-35">
              <h1 className="font-bold text-2xl text-text-color capitalize">
                {header.title}
              </h1>

              <nav className="hidden gap-4 text-sm font-bold capitalize text-second-text-color items-center xl:flex">
                {header.categories.map((link) => {
                  if (link.toLowerCase() === "Shop".toLocaleLowerCase()) {
                    return (
                      <a
                        key={link}
                        className="relative group"
                        aria-label={`go to ${link}`}
                        onClick={() => navigate("/shop")}
                        onMouseEnter={() => setIsShopOpen(true)}
                        onMouseLeave={() => setIsShopOpen(false)}
                      >
                        <button className="flex items-end capitalize gap-1 hover:text-text-color transition-colors py-2">
                          {link}
                          <ChevronDown
                            size={14}
                            className={`transition-transform ${isShopOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isShopOpen && (
                          <div className="absolute top-full left-0 w-48 bg-white shadow-xl border border-gray-100 rounded-md py-4 z-50">
                            <a
                              href="/shop/men"
                              className="block px-4 py-2 hover:bg-gray-50 hover:text-primary-color"
                            >
                              Men
                            </a>
                            <a
                              href="/shop/women"
                              className="block px-4 py-2 hover:bg-gray-50 hover:text-primary-color"
                            >
                              Women
                            </a>
                            <a
                              href="/shop/accessories"
                              className="block px-4 py-2 hover:bg-gray-50 hover:text-primary-color"
                            >
                              Accessories
                            </a>
                          </div>
                        )}
                      </a>
                    );
                  }
                  return (
                    <a
                      key={link}
                      aria-label={`go to ${link}`}
                      href={`/${link.toLowerCase()}`}
                      className="hover:text-text-color transition-colors py-2"
                    >
                      {link}
                    </a>
                  );
                })}
              </nav>
            </article>

            <section className="flex items-center gap-4 xl:gap-8">
              {!isMenuOpen && (
                <article className="hidden xl:flex">
                  <SharedActions
                    header={header}
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                  />
                </article>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden"
              >
                {isMenuOpen ? (
                  <X size={24} className="text-text-color" />
                ) : (
                  <div className="flex w-6 h-6 flex-col items-end justify-evenly">
                    <span className="h-0.5 w-full bg-text-color"></span>
                    <span className="h-0.5 w-[75%] bg-text-color"></span>
                    <span className="h-0.5 w-[50%] bg-text-color"></span>
                  </div>
                )}
              </button>
            </section>
          </header>

          {isMenuOpen && (
            <article className="bg-white flex flex-col w-full py-10 gap-10 xl:hidden">
              <nav className="flex flex-col items-center gap-8 text-3xl capitalize text-second-text-color">
                {header.categories.map((link) => (
                  <a
                    key={link}
                    aria-label={`go to ${link}`}
                    href={`/${link.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link}
                  </a>
                ))}
              </nav>
              <SharedActions
                isMobile
                header={header}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />
            </article>
          )}
        </>
      )}
    </main>
  );
};

export default Header;
