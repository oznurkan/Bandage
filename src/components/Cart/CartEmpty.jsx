import { useNavigate } from "react-router-dom";

const CartEmpty = () => {
  const navigate = useNavigate();
  return (
    <main className="w-full">
      <article className="min-h-screen flex flex-col items-center justify-center gap-4 py-20">
        <h2 className="text-2xl font-bold text-text-color">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-3 bg-primary-color cursor-pointer hover:bg-text-color text-white rounded-lg hover:bg-opacity-90 transition-all"
        >
          Continue Shopping
        </button>
      </article>
    </main>
  );
};

export default CartEmpty;
