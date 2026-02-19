import { X, Phone, Mail, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SharedActions from "./SharedActions";
import { getCategories } from "../../store/actions/productActions";
import NavLinkHeader from "./NavLink";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { content, loading, error } = useSelector((state) => state.appData);
  const user = useSelector((state) => state.client.user);
  const cart = useSelector((state) => state.shoppingCart.cart);
  const favorites = useSelector((state) => state.product.favoritesList);

  const isLoggedIn = user && user.email;
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);
  const favoritesCount = favorites ? favorites.length : 0;

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-danger-color text-center py-10">Error: {error}</div>
    );

  const { header } = content || {};

  return (
    <main
      className={`${isMenuOpen ? "bg-white" : "bg-transparent"} absolute top-0 left-0 w-full xl:static xl:pt-0 xl:bg-white z-50`}
    >
      {header && (
        <>
          <section className="hidden w-full justify-between items-center font-montserrat font-bold text-sm leading-6 bg-dark-background-color px-8 py-0.5 text-white xl:flex">
            <article className="flex gap-2.5">
              <a
                href={`tel:${header.telephone}`}
                className="flex gap-1.5 p-2.5 items-center hover:text-primary-color transition-colors cursor-pointer"
              >
                <Phone size={16} />
                <h6>{header.telephone}</h6>
              </a>
              <a
                href={`mailto:${header.email}`}
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
                    link: header.instagram,
                    name: "instagram",
                  },
                  { Icon: FaYoutube, link: header.youtube, name: "youtube" },
                  { Icon: FaFacebook, link: header.facebook, name: "facebook" },
                  { Icon: FaTwitter, link: header.twitter, name: "twitter" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 text-white hover:text-primary-color cursor-pointer hover:scale-110 transition-transform"
                  >
                    <item.Icon size={18} />
                  </a>
                ))}
              </div>
            </article>
          </section>
          <header className="flex justify-between font-montserrat items-center w-[80%] xl:w-[95%] mx-auto py-5 bg-transparent xl:bg-white ">
            <article className="flex items-center gap-10 xl:gap-35">
              <h1
                onClick={() => navigate("/")}
                className="font-bold text-2xl text-text-color capitalize cursor-pointer"
              >
                {header.title}
              </h1>
              <nav className="hidden gap-4 text-sm font-bold capitalize text-second-text-color items-center xl:flex">
                {header.categories.map((link) => (
                  <NavLinkHeader key={link} link={link} isMobile={false} />
                ))}
              </nav>
            </article>

            <section className="flex items-center gap-4 xl:gap-8">
              {!isMenuOpen && (
                <article className="hidden xl:flex ">
                  <SharedActions
                    header={header}
                    user={user}
                    isLoggedIn={isLoggedIn}
                    isSearchOpen={isSearchOpen}
                    setIsSearchOpen={setIsSearchOpen}
                    cartItemCount={cartItemCount}
                    favoritesCount={favoritesCount}
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
                  <Menu size={27} className="text-text-color" />
                )}
              </button>
            </section>
          </header>
          {isMenuOpen && (
            <article className="bg-white flex flex-col w-full py-10 gap-10 xl:hidden">
              <nav className="flex flex-col items-center gap-6 text-3xl capitalize text-second-text-color">
                {header.categories.map((link) => (
                  <NavLinkHeader
                    key={link}
                    link={link}
                    isMobile={true}
                    onClose={() => setIsMenuOpen(false)}
                  />
                ))}
              </nav>

              <SharedActions
                header={header}
                user={user}
                isLoggedIn={isLoggedIn}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
                isMobile={true}
                cartItemCount={cartItemCount}
                favoritesCount={favoritesCount}
              />
            </article>
          )}
        </>
      )}
    </main>
  );
};

export default Header;
