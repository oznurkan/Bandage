import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../store/actions/productActions";
import { getDataInfo } from "../../store/actions/dataActions";
import ShopProductCard from "../Shop/ShopProductCard";

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { content, loading, error } = useSelector((state) => state.appData);
  const {
    productList: products,
    total,
    fetchState,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
    if (products.length === 0) {
      const initialLimit = window.innerWidth >= 768 ? 25 : 5;
      dispatch(getProducts(null, null, null, initialLimit, 0, false));
    }
  }, [dispatch, content, products.length]);

  const handleLoadMore = () => {
    dispatch(getProducts(null, null, null, 25, products.length, true));
  };

  if (loading && products.length === 0) {
    return <div className="text-center py-10 font-montserrat">Loading...</div>;
  }

  if (error)
    return (
      <div className="text-danger-color text-center py-10 font-montserrat">
        Error: {error}
      </div>
    );

  const { productCardSection } = content || {};
  const hasMore = products.length < total;
  const isFetching = fetchState === "FETCHING";

  return (
    <main className="w-full bg-white font-montserrat">
      <section className="flex flex-col py-23 px-10 gap-18">
        {productCardSection && (
          <>
            <article className="flex flex-col items-center text-center px-4 gap-3">
              <h4 className="font-normal text-xl leading-8 capitalize text-second-text-color">
                {productCardSection.subtitle}
              </h4>
              <h3 className="font-bold uppercase text-2xl leading-8 text-text-color">
                {productCardSection.title}
              </h3>
              <p className="font-normal text-sm leading-5 text-second-text-color">
                {productCardSection.paragraph}
              </p>
            </article>

            <ShopProductCard products={products} isGridView={true} />

            <article className="flex justify-center">
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  className="px-10 py-4 border border-primary-color rounded-xs text-primary-color font-montserrat font-bold text-sm uppercase leading-6 transition-all duration-300 ease-in-out hover:bg-primary-color cursor-pointer hover:text-white disabled:opacity-50"
                >
                  {isFetching ? "Loading..." : productCardSection.buttonText}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/shop")}
                  className="px-10 py-4 border border-primary-color rounded-xs text-primary-color font-montserrat font-bold text-sm uppercase leading-6 transition-all duration-300 ease-in-out hover:bg-primary-color cursor-pointer hover:text-white"
                >
                  Go Shop
                </button>
              )}
            </article>
          </>
        )}
      </section>
    </main>
  );
};

export default ProductCard;
