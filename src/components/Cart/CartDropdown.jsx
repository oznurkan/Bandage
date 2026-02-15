import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const { cart } = useSelector((state) => state.shoppingCart);
  const totalCount = cart.reduce((acc, item) => acc + item.count, 0);

  return (
    <section className="w-85 bg-white shadow-2xl border border-light-gray-1 rounded-lg p-4 flex flex-col gap-4 animate-fadeIn">
      <h3 className="font-bold text-sm text-text-color">
        Sepetim ({totalCount} Ürün)
      </h3>

      <div className="max-h-60 overflow-y-auto space-y-3 custom-scrollbar">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-3 items-center border-b border-light-gray-1 pb-2 last:border-0"
            >
              <img
                src={item.product.images?.[0]?.url}
                className="w-12 h-12 object-contain rounded shadow-sm"
                alt={item.product.name}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate text-text-color">
                  {item.product.name}
                </p>
                <p className="text-[10px] text-second-text-color font-medium">
                  Quantity: {item.count}
                </p>
                <p className="text-xs font-bold text-secondary-color-1">
                  ${item.product.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-center text-second-text-color py-4">
            Your cart is empty
          </p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="mt-4 pt-4 border-t flex gap-2">
          <Link
            to="/cart"
            className="flex-1 text-center border border-primary-color bg-secondary-color-1 text-primary-color hover:text-text-color hover:border-text-color  py-2.5 rounded text-xs font-bold hover:bg-opacity-90 transition-all"
          >
            Go to Cart
          </Link>
          <Link
            to="/order"
            className="flex-1 text-center border bg-primary-color text-white hover:bg-text-color  py-2.5 px-2 rounded text-xs font-bold hover:bg-opacity-20 transition-all"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </section>
  );
};

export default CartDropdown;
