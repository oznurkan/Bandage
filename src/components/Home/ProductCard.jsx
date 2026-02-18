import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDataInfo } from "../../store/actions/dataActions";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../store/actions/productActions";

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { content, loading, error } = useSelector((state) => state.appData);
  const { productList: products } = useSelector((state) => state.product);
  const categories = useSelector((state) => state.product.categories);

  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth >= 768 ? 12 : 5,
  );
  const getStep = () => (window.innerWidth >= 768 ? 12 : 5);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
    if (products.length === 0) dispatch(getProducts());
  }, [dispatch, content, products.length]);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth >= 768 ? 12 : 5);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoadMore = () => {
    const step = getStep();
    setVisibleCount((prevCount) => prevCount + step);
  };

  const handleProductClick = (product) => {
    const nameSlug = product.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/-+$/, "");

    const productCategory = categories.find(
      (cat) => cat.id === product.category_id,
    );

    const gender = productCategory?.gender === "k" ? "kadin" : "erkek";
    const categoryTitle = productCategory?.title || "kategori";
    const categoryId = product.category_id;
    const productNameSlug = nameSlug;
    const productId = product.id;

    const detailLink = `/shop/${gender}/${categoryTitle}/${categoryId}/${productNameSlug}/${productId}`;

    navigate(detailLink);
  };

  if (loading)
    return (
      <div className="text-center py-10 font-montserrat">Yükleniyor...</div>
    );
  if (error)
    return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const { productCardSection } = content || {};
  const hasMore = visibleCount < products.length;

  return (
    <main className="w-full bg-white font-montserrat ">
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

            <article className="flex flex-col mx-auto items-center w-full text-center gap-20 py-4 md:flex-row md:justify-start md:items-start md:flex-wrap md:gap-0 md:gap-y-17 md:w-[82%] xl:gap-8">
              {products.slice(0, visibleCount).map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center bg-white gap-15 md:flex-1/2 md:justify-start lg:flex-1/3 xl:flex-1/5 xl:gap-5"
                >
                  <div
                    onClick={() => handleProductClick(product)}
                    className="w-73.75 h-90 mx-auto lg:w-45.75 lg:h-59.5 xl:w-60 xl:h-90 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={
                        product.images?.[0]?.url || product.images?.[0] || ""
                      }
                      alt={product.name}
                      className="w-full h-full object-contain hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex flex-col gap-4 capitalize font-bold leading-6">
                    <h5 className="text-base text-text-color">
                      {product.name}
                    </h5>
                    <a
                      onClick={() => handleProductClick(product)}
                      className="text-sm cursor-pointer text-second-text-color"
                    >
                      {product.description?.substring(0, 25) || "Fashion Store"}
                    </a>
                    <div className="flex gap-3 justify-center text-base">
                      <span className="text-muted-color flex gap-1">
                        <span>${product.price}</span>
                      </span>
                      <span className="text-second-color-1 flex gap-1">
                        <span>${product.price}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </article>

            <article className="flex justify-center">
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  className="px-10 py-4 border border-primary-color rounded-xs text-primary-color font-montserrat font-bold text-sm uppercase leading-6 transition-all duration-300 ease-in-out hover:bg-primary-color cursor-pointer hover:text-white"
                >
                  {productCardSection.buttonText}
                </button>
              ) : (
                <button
                  onClick={() => navigate("/shop")}
                  className="px-10 py-4 border border-primary-color rounded-xs text-primary-color font-montserrat font-bold text-sm uppercase leading-6 transition-all duration-300 ease-in-out hover:bg-primary-color cursor-pointer hover:text-white"
                >
                  Go to Shop
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
