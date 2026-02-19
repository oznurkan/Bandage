import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShopProductCard from "../components/Shop/ShopProductCard";
import { HeartOff, ChevronLeft } from "lucide-react";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.product.favoritesList);
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white font-montserrat py-10 px-4 md:px-10">
      <section className="max-w-7xl mx-auto mb-10">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 my-10 flex cursor-pointer text-primary-blue border border-primary-blue rounded-lg hover:bg-blue-50 transition-all"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-bold text-sm uppercase">Go Back</span>
        </button>

        <div className="flex items-baseline gap-4 border-b border-gray-100 pb-6">
          <h2 className="text-3xl font-bold text-text-color">My Favorites</h2>
          <span className="text-second-text-color font-medium bg-gray-100 px-3 py-1 rounded-full text-sm">
            {favorites.length} {favorites.length === 1 ? "Item" : "Items"}
          </span>
        </div>
      </section>
      <section className="max-w-7xl mx-auto">
        {favorites.length > 0 ? (
          <div className="flex flex-col gap-8">
            <ShopProductCard products={favorites} isGridView={true} />
          </div>
        ) : (
          <article className="flex flex-col items-center justify-center py-32 text-center gap-6">
            <div className="bg-gray-50 p-10 rounded-full text-gray-300">
              <HeartOff size={80} strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-text-color">
                Your list is empty
              </h3>
              <p className="text-second-text-color max-w-sm mx-auto">
                You haven't added any products to your favorites yet. Start
                exploring our collection!
              </p>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="mt-4 px-12 py-4 bg-primary-color text-white font-bold rounded-lg hover:shadow-xl hover:bg-blue-600 transition-all active:scale-95 cursor-pointer uppercase text-sm tracking-wider"
            >
              Start Shopping
            </button>
          </article>
        )}
      </section>
    </main>
  );
};

export default FavoritesPage;
