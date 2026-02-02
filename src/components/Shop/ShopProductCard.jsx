import { useNavigate } from "react-router-dom";

const ShopProductCard = ({ products, loading, isGridView }) => {
  const navigate = useNavigate();
  if (loading) return <div>Yükleniyor...</div>;

  return (
    <main className="w-full bg-white font-montserrat">
      <section className="flex flex-col py-23 px-10 gap-18">
        {products && (
          <article
            className={`mx-auto ${
              isGridView
                ? "flex flex-wrap justify-start gap-9 md:w-[82%]"
                : "flex flex-col gap-6 md:w-[82%]"
            }`}
          >
            {products?.map((product) => (
              <div
                key={product.id}
                className={
                  isGridView
                    ? "flex flex-col items-center w-full grow-0 md:w-[46%] lg:w-[30%] xl:w-[22.5%]"
                    : "flex flex-row items-center w-full border-b border-[#E8E8E8] pb-6 gap-6"
                }
              >
                <div
                  className={
                    isGridView
                      ? "flex justify-center mx-auto items-center w-full h-107 "
                      : "flex justify-center items-center w-48 h-48 shrink-0 "
                  }
                >
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0]: ""}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div
                  className={`flex flex-col gap-2 w-full capitalize font-bold leading-6 ${
                    isGridView
                      ? "items-center text-center py-7"
                      : "items-start text-start"
                  }`}
                >
                  <h5 className="text-base text-text-color">{product.title}</h5>
                  <a onClick={() => navigate(`/shop/${product.id}`)} className="text-sm text-second-text-color">
                    {product.subtitle}
                  </a>
                  <div
                    className={`flex gap-3 text-base ${
                      isGridView ? "justify-center" : "justify-start"
                    }`}
                  >
                    <span className="text-muted-color">
                      ${product.price.old}
                    </span>
                    <span className="text-second-color-1">
                      ${product.price.new}
                    </span>
                  </div>
                  <div
                    className={`flex gap-1.5 ${
                      isGridView ? "justify-center" : "justify-start"
                    }`}
                  >
                    <a className="bg-primary-color size-4 rounded-full cursor-pointer hover:scale-110 transition-transform"></a>
                    <a className="bg-second-color-1 size-4 rounded-full cursor-pointer hover:scale-110 transition-transform"></a>
                    <a className="bg-alert-color size-4 rounded-full cursor-pointer hover:scale-110 transition-transform"></a>
                    <a className="bg-dark-background-color size-4 rounded-full cursor-pointer hover:scale-110 transition-transform"></a>
                  </div>
                </div>
              </div>
            ))}
          </article>
        )}
      </section>
    </main>
  );
};

export default ShopProductCard;
