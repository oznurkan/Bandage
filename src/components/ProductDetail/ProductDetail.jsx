import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
} from "lucide-react";

import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../store/actions/productActions";
import { addToCart } from "../../store/actions/shoppingCartActions";
import { ADD_TO_FAVORITES } from "../../store/actions/actionTypes";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = useSelector((state) => state.product.selectedProduct);
  const fetchState = useSelector((state) => state.product.fetchState);
  const favorites = useSelector((state) => state.product.favoritesList);
  const isFavorite = favorites?.some((fav) => fav.id === product?.id);
  const user = useSelector((state) => state.client.user);
  const isLoggedIn = user && user.email;

  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, [dispatch, productId]);

  if (fetchState === "FETCHING") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  const images = Array.isArray(product.images) ? product.images : [];

  const handleAction = (iconName, productData) => {
    if (iconName === "Heart" && !isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    switch (iconName) {
      case "Heart":
        dispatch({ type: ADD_TO_FAVORITES, payload: productData });
        break;
      case "ShoppingCart":
        dispatch(addToCart(productData));
        break;
      default:
        break;
    }
  };

  return (
    <main className="w-full bg-thin-white">
      <section className="flex flex-col mx-auto gap-10 pt-10 pb-20 w-[86%] xl:flex-row">
        <article className="flex flex-col gap-10 xl:flex-1">
          <div className="relative h-110 w-full mx-auto group xl:h-120">
            {images.length > 0 && (
              <>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1,
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-1 hover:scale-110 transition-transform"
                >
                  <ChevronLeft size={70} color="#ffffff" />
                </button>
                <div className="h-full w-full overflow-hidden rounded-lg xl:w-full">
                  <img
                    className="w-full h-full object-contain object-top"
                    src={images[activeImageIndex]?.url}
                    alt={product.name}
                  />
                </div>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer p-1 hover:scale-110 transition-transform"
                >
                  <ChevronRight size={70} color="#ffffff" />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-25 h-20 rounded-2xl cursor-pointer transition-opacity ${
                    idx === activeImageIndex
                      ? "opacity-100 border-2 border-primary-color"
                      : "opacity-50"
                  }`}
                >
                  <img
                    className="w-full h-full object-contain"
                    src={img.url}
                    alt="images"
                  />
                </div>
              ))}
            </div>
          )}
        </article>
        <article className="font-montserrat flex flex-col gap-7 px-4 xl:flex-1">
          <h4 className="font-normal text-xl leading-8 text-text-color">
            {product.name}
          </h4>
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <FaStar size={19} color="#F3CD03" />
              <FaStar size={19} color="#F3CD03" />
              <FaStar size={19} color="#F3CD03" />
              <FaStarHalfAlt size={19} color="#F3CD03" />
              <CiStar size={22} color="#F3CD03" />
            </div>
            <h6 className="font-bold text-sm leading-6 text-second-text-color">
              {product.rating}
            </h6>
            <h6 className="font-bold text-sm leading-6 text-second-text-color border-l pl-3">
              {product.sell_count} Sales
            </h6>
          </div>
          <h5 className="font-bold text-2xl leading-8 text-text-color">
            ${product.price}
          </h5>
          <div className="flex gap-2.5">
            <h6 className="font-bold text-sm leading-6 text-second-text-color">
              Availability :
            </h6>
            <h6 className="font-bold text-sm leading-6 text-primary-color">
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </h6>
          </div>
          <p className="font-normal text-sm leading-6 text-custom-gray">
            {product.description}
          </p>
          <hr />
          <div className="flex justify-start gap-2.5">
            <a className="bg-primary-color size-8 rounded-4xl"></a>
            <a className="bg-second-color-1 size-8 rounded-4xl"></a>
            <a className="bg-alert-color size-8 rounded-4xl"></a>
            <a className="bg-dark-background-color size-8 rounded-4xl"></a>
          </div>
          <div className="flex gap-5 py-8">
            <button
              onClick={() => handleAction("ShoppingCart", product)}
              className="flex items-center justify-center gap-3 py-3 px-10 cursor-pointer rounded-md border border-primary-blue bg-primary-blue hover:bg-blue-600 text-white transition-all shadow-md active:scale-95"
            >
              <ShoppingCart size={18} />
              <span className="font-bold capitalize text-sm">Add to Cart</span>
            </button>
            <div className="flex justify-center items-center gap-2">
              {[
                {
                  icon: Heart,
                  name: "Heart",
                  color: isFavorite ? "red" : "currentColor",
                  fill: isFavorite ? "red" : "none",
                },
                { icon: ShoppingCart, name: "ShoppingCart" },
                { icon: Eye, name: "Eye" },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAction(item.name, product)}
                  className="rounded-full w-10 cursor-pointer h-10 border border-[#E8E8E8] bg-white flex items-center justify-center hover:bg-gray-100 transition-all shadow-sm active:scale-90"
                >
                  <item.icon
                    size={20}
                    color={item.name === "Heart" ? item.color : "currentColor"}
                    fill={item.name === "Heart" ? item.fill : "none"}
                  />
                </button>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default ProductDetail;
