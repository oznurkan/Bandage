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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading) return <div className="text-center py-10">Yükleniyor...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const { header } = content || {};

  return (
    <main
      className={`${isMenuOpen === true ? "bg-white" : "bg-transparent"} absolute top-0 left-0 w-full pt-6 pb-4 xl:static xl:pt-0 xl:bg-white z-50`}
    >
      {header && (
        <>
          <nav className="hidden xl:flex justify-between items-center w-full bg-dark-background-color px-6 py-0.5 text-white">
            <article className="flex gap-2.5">
              <a
                href={`tel:${header.telephone}`}
                className="flex gap-1.5 p-2.5 items-center font-bold text-sm hover:text-primary-color transition-colors cursor-pointer"
              >
                <Phone size={16} />
                <h6>{header.telephone}</h6>
              </a>
              <a
                href={`mailto:${header.email}`}
                className="flex gap-1.5 p-2.5 items-center font-bold text-sm hover:text-primary-color transition-colors cursor-pointer"
              >
                <Mail size={16} />
                <h6>{header.email}</h6>
              </a>
            </article>
            <h6 className="font-bold text-sm">{header.text}</h6>
            <article className="flex p-2.5 gap-2.5 items-center">
              <h6 className="font-bold text-sm capitalize">
                {header.follow} :
              </h6>
              <div className="flex items-center gap-2">
                {[
                  { Icon: FaInstagram, link: content.instagram },
                  { Icon: FaYoutube, link: content.youtube },
                  { Icon: FaFacebook, link: content.facebook },
                  { Icon: FaTwitter, link: content.twitter },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-white hover:text-primary-color cursor-pointer hover:scale-110 transition-transform"
                  >
                    <item.Icon size={18} />
                  </a>
                ))}
              </div>
            </article>
          </nav>
          <header className="flex justify-between items-center w-[80%] xl:w-[95%] mx-auto py-6 bg-transparent xl:bg-white">
            <article className="flex items-center gap-10 xl:gap-35">
              <h1 className="font-bold text-2xl text-text-color capitalize">
                {header.title}
              </h1>

              <nav className="hidden xl:flex gap-4 text-sm font-bold capitalize text-second-text-color items-center">
                {header.categories.map((link) => {
                  if (link.toLowerCase() === "Shop".toLocaleLowerCase()) {
                    return (
                      <div
                        key={link}
                        className="relative group"
                        onMouseEnter={() => setIsShopOpen(true)}
                        onMouseLeave={() => setIsShopOpen(false)}
                      >
                        <button className="flex items-center capitalize gap-1 hover:text-text-color transition-colors py-2">
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
                      </div>
                    );
                  }
                  return (
                    <a
                      key={link}
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
              <article className="hidden capitalize xl:flex items-center gap-2 text-primary-color font-bold text-sm">
                <IoMdPerson size={16} />{" "}
                <span>
                  {header.authentication.login} /
                  {header.authentication.register}
                </span>
              </article>

              <Search size={24} className="text-text-color cursor-pointer" />

              <button className="relative">
                <ShoppingCart size={24} className="text-text-color" />
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-primary-color border-2 border-white rounded-full">
                  3
                </span>
              </button>
              <button className="relative">
                <Heart size={24} className="text-text-color" />
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-primary-color border-2 border-white rounded-full">
                  3
                </span>
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden"
              >
                {isMenuOpen ? (
                  <X size={24} />
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
            <article className="bg-white flex flex-col w-full py-10 gap-10 xl:hidden h-screen">
              <nav className="flex flex-col items-center gap-8 text-3xl text-second-text-color">
                {header.categories.map((link) => (
                  <a key={link} href="#" onClick={() => setIsMenuOpen(false)}>
                    {link}
                  </a>
                ))}
              </nav>
              <div className="text-center text-primary-color font-bold text-xl">
                {header.authentication.login} /{header.authentication.register}
              </div>
            </article>
          )}
        </>
      )}
    </main>
  );
};

export default Header;
