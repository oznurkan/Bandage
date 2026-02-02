import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataInfo } from "../../store/slices/dataInfoSlice";
import { useNavigate } from "react-router-dom";

const BestsellerProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { content, loading, error } = useSelector((state) => state.appData || {});

  useEffect(() => {
    if (!content) {
      dispatch(getDataInfo());
    }
  }, [dispatch, content]);

  if (loading) return <div className="text-center py-20 font-montserrat">Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center py-20 font-montserrat">Hata: {error}</div>;

  const productsRaw = content?.productCardSection?.productsCard;
  const products = Array.isArray(productsRaw) ? productsRaw : [];

  const bestsellers = [...products]
    .sort((a, b) => {
      const reviewA = parseInt(a?.reviews || 0, 10);
      const reviewB = parseInt(b?.reviews || 0, 10);
      return reviewB - reviewA;
    })
    .slice(0, 3);

  return (
    <section className="w-full bg-thin-white flex flex-col items-center mx-auto font-montserrat py-20">
      <article className="flex flex-col items-center mx-auto font-montserrat xl:w-[82%] xl:items-start">
         <h3 className="font-bold text-2xl leading-8 text-text-color uppercase tracking-tight ">
        BESTSELLER PRODUCTS
      </h3>
      <hr className="w-[80%] my-8 border-gray-200" />
      
      {bestsellers.length > 0  && (
        <article className="flex flex-wrap justify-center py-10 px-8 gap-8 w-full max-w-7xl xl:px-0">
          {bestsellers.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/shop/${product.id}`)}
              className="flex flex-col items-center bg-white gap-4 cursor-pointer w-[94%] group hover:shadow-xl transition-all duration-300 sm:w-[70%] md:w-[30%] xl:w-[31%] border border-gray-100 rounded-lg"
            >
              <div className="flex justify-center items-center w-full overflow-hidden bg-white md:h-48 xl:h-110">
                <img
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  src={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : ""}
                  alt={product.title || "Product"}
                />
              </div>
              <div className="flex flex-col py-5 gap-3 text-center capitalize font-bold leading-6 w-full">
                <h5 className="text-base text-text-color truncate w-full px-2">
                  {product.title}
                </h5>
                <p className="text-sm text-second-text-color font-medium">
                  {product.subtitle}
                </p>
                
                <div className="flex gap-3 justify-center text-base">
                  <span className="text-muted-color line-through font-normal">
                    ${product.price?.old || "0.00"}
                  </span>
                  <span className="text-second-color-1">
                    ${product.price?.new || "0.00"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </article>
      )}

      </article>
     
    </section>
  );
};

export default BestsellerProduct;