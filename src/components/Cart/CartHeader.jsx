import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/actions/shoppingCartActions";
import { useNavigate } from "react-router-dom";

const CartHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.shoppingCart);

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      dispatch(clearCart());
    }
  };

  return (
    <main className="w-full bg-thin-white">
      <article className="flex justify-between items-center py-10 mx-auto w-[90%]">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 cursor-pointer text-primary-blue border border-primary-blue rounded-lg hover:bg-blue-50 transition-all"
        >
          Go Back
        </button>
        <button
          onClick={handleClearCart}
          className={`px-4 py-2 cursor-pointer text-red-500 border border-red-500 rounded-lg hover:bg-red-50 transition-all
            ${cart.length === 0 ? "hidden" : "flex"}`}
        >
          Clear Cart
        </button>
      </article>
    </main>
  );
};

export default CartHeader;
