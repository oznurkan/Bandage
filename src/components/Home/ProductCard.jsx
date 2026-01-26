import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataInfo } from "../../store/slices/dataInfoSlice";

const ProductCard = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading) return <div className="text-center py-10">Yükleniyor...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const { productCardSection } = content || {};

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
                {productCardSection.paragraph}{" "}
              </p>
            </article>
            <article className="flex flex-col mx-auto items-center text-center gap-17 py-4 xl:flex-row xl:flex-wrap xl:w-[82%] xl:gap-8">
              {productCardSection.productsCard.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center bg-white gap-15 xl:flex-1/6 xl:gap-7"
                >
                  <div className="w-73.75 h-90 mx-auto xl:w-45.75 xl:h-59.5">
                    {" "}
                    <img src={product.images} alt={product.title} />
                  </div>
                  <div className="flex flex-col gap-4 capitalize font-bold leading-6">
                    <h5 className="text-base text-text-color">
                      {product.title}
                    </h5>
                    <a href="" className="text-sm text-second-text-color">
                      {product.subtitle}
                    </a>
                    <div className="flex gap-3 justify-center text-base">
                      <span className=" text-muted-color flex gap-1">
                        <span>${product.price.old}</span>
                      </span>
                      <span className=" text-second-color-1 flex gap-1">
                        <span>${product.price.new}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </article>
            <article className="flex justify-center">
              <button className="px-10 py-4 border border-primary-color rounded-xs text-primary-color font-montserrat font-bold text-sm uppercase leading-6">
                {productCardSection.buttonText}
              </button>
            </article>
          </>
        )}
      </section>
    </main>
  );
};

export default ProductCard;
