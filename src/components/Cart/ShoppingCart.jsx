import {
  Box,
  ChevronRight,
  Info,
  Minus,
  Plus,
  Tag,
  Trash2,
  Van,
} from "lucide-react";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItem,
  toggleCartItem,
} from "../../store/actions/shoppingCartActions";
import useProductNavigate from "../Product/useProductNavigate";

const ShoppingCart = ({ cart, isFreeShipping }) => {
  const dispatch = useDispatch();

  const goToProductDetail = useProductNavigate();

  const handleIncrease = (productId) => {
    const item = cart.find((item) => item.product.id === productId);
    if (item) {
      dispatch(updateCartItem(productId, item.count + 1));
    }
  };

  const handleDecrease = (productId) => {
    const item = cart.find((item) => item.product.id === productId);
    if (item && item.count > 1) {
      dispatch(updateCartItem(productId, item.count - 1));
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleToggle = (productId) => {
    dispatch(toggleCartItem(productId));
  };

  return (
    <main className="w-full lg:py-5 bg-thin-white">
      <section className="w-full flex flex-col mx-auto gap-15">
        {cart.map((item) => (
          <article
            key={item.product.id}
            className={`w-full max-w-md mx-auto shadow-2xl font-montserrat border-2 flex flex-col overflow-hidden rounded-2xl md:max-w-none
            ${
              item.checked
                ? "border-2 border-primary-color"
                : "border-2 border-second-text-color"
            }`}
          >
            <div className="bg-thin-white w-full flex flex-col justify-between xl:flex-row">
              <div className="flex justify-start items-center text-center font-bold text-sm p-2 gap-2 flex-1">
                <div className="text-second-text-color">Satıcı </div>
                <button className="flex items-center gap-2 cursor-pointer">
                  <span className="text-text-color">KAOF AYakkabı</span>
                  <div className="py-1 px-3 bg-green-800 rounded-2xl text-white font-normal text-sm">
                    9.7
                  </div>
                  <ChevronRight size={24} color="#252B42" />
                  <div className="hidden border rounded-sm items-center text-sm font-normal border-blue-900 xl:flex p-1 gap-2">
                    <h6>Kurumsal</h6>
                    <Info size={22} color="#252B42" />
                  </div>
                </button>
              </div>
              <div className="flex justify-between py-1.5 px-2 items-center text-base font-normal border rounded-sm text-text-color border-second-text-color bg-orange-200">
                <div className="flex gap-2 justify-center items-center">
                  <Tag size={22} color="#252B42" />
                  <h6>3 adet ve üzeri 50 tl </h6>
                </div>
                <button className="flex cursor-pointer gap-1 justify-center items-center">
                  <h5>Tüm ürünler</h5>
                  <ChevronRight />
                </button>
              </div>
            </div>
            {isFreeShipping && item.checked && (
              <div className="bg-green-300 border border-green-900 w-full flex rounded-sm text-base font-normal text-text-color justify-start items-center py-1.5 px-2 gap-2">
                <Box size={22} color="#252B42" />
                <h6>Kargo bedava</h6>
              </div>
            )}

            <div className="flex flex-col gap-5 p-4 pl-7 md:pl-4 md:flex-row md:items-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggle(item.product.id)}
                className="w-6 h-6 text-primary-color focus:ring-primary-color border-gray-300 rounded cursor-pointer"
              />
              <div className="w-full h-60 border-second-text-color flex mx-auto md:mx-0 md:w-40 md:h-40 xl:w-30 xl:h-30">
                <img
                  className="w-full h-full object-contain"
                  src={
                    item.product.images?.[0]?.url ||
                    item.product.image ||
                    "/placeholder.jpg"
                  }
                  alt={item.product.name}
                />
              </div>
              <div className="flex flex-col gap-3 flex-1 ">
                <div className="flex flex-col text-start gap-1.5">
                  <button
                    className="flex flex-col text-start "
                    onClick={() => goToProductDetail(item.product)}
                  >
                    <h2 className="text-text-color cursor-pointer font-bold text-base">
                      {item.product.name}
                    </h2>
                  </button>
                  <h3 className="text-second-text-color font-normal text-base line-clamp-2">
                    {item.product.description?.substring(0, 55)}...
                  </h3>
                </div>
                <h4 className="text-start font-normal text-base text-text-color">
                  38 beden
                </h4>
                <div className="hidden gap-2 font-normal text-sm text-text-color items-center xl:flex ">
                  <Van size={22} color="#252B42" />
                  <h5>39 dakika içinde verirsen en geç yarın kapıda</h5>
                </div>
              </div>
              <div className="flex justify-center items-center shrink-0 text-center gap-3 md:gap-5">
                <div className="flex flex-2 justify-start xl:flex-1">
                  <button
                    onClick={() => handleDecrease(item.product.id)}
                    className="px-5 py-3 cursor-pointer text-center bg-primary-color border rounded-l-xl border-light-gray-2 text-text-color md:px-2.5"
                  >
                    <Minus size={20} color="#252B42" />
                  </button>
                  <h3 className="px-5 py-3 text-center text-base font-bold bg-white border border-light-gray-2 text-text-color md:px-4">
                    {item.count}
                  </h3>
                  <button
                    onClick={() => handleIncrease(item.product.id)}
                    className="px-5 py-3 cursor-pointer text-center bg-primary-color border rounded-r-xl border-light-gray-2 text-text-color md:px-2.5"
                  >
                    <Plus size={20} color="#252B42" />
                  </button>
                </div>
                <h4 className="flex-1 flex justify-center text-primary-color whitespace-nowrap font-bold text-base">
                  {parseFloat(item.product.price).toFixed(2)} ₺
                </h4>
                <button
                  onClick={() => handleRemove(item.product.id)}
                  className="flex-1 flex justify-center cursor-pointer"
                >
                  <Trash2 className="w-8 h-8 md:w-5 md:h-5 text-danger-color" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default ShoppingCart;
