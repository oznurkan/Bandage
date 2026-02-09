import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../store/actions/productActions";

const BestsellerProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productList:products, fetchState } = useSelector((state) => state.product);


  useEffect(() => {
      if (products.length === 0 && fetchState === "NOT_FETCHED") {
        dispatch(getProducts());
      }
    }, [dispatch, products.length, fetchState]);
 

  const bestsellers = [...products]
    .sort((a, b) => (b.sell_count || 0) - (a.sell_count || 0))
    .slice(0, 8);

  return (
    <section className="w-full bg-thin-white flex flex-col items-center mx-auto font-montserrat py-20">
      <article className="flex flex-col items-center mx-auto font-montserrat xl:w-[78%] xl:items-start">
         <h3 className="font-bold text-2xl leading-8 text-text-color uppercase tracking-tight ">
        BESTSELLER PRODUCTS
      </h3>
      <hr className="w-full my-8 mx-auto border-gray-200" />
      
      {bestsellers.length > 0  && (
        <article className="flex flex-wrap justify-center py-10 px-8 gap-8 mx-auto w-full max-w-7xl xl:px-0" >
          {bestsellers.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/shop/${product.id}`)}
              className="flex flex-col items-center bg-white gap-4 cursor-pointer w-[94%] group hover:shadow-xl transition-all duration-300 sm:w-[70%] md:w-[30%] xl:w-[22.5%] border border-gray-100 rounded-lg"
            >
              <div className="flex justify-center items-center w-full overflow-hidden bg-white md:h-48 xl:h-110">
                <img
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  src={product.images?.[0]?.url || ""}
                  alt={product.name || "Product"}
                />
              </div>
              <div className="flex flex-col py-5 gap-3 text-center capitalize font-bold leading-6 w-full">
                <h5 className="text-base text-text-color truncate w-full px-2">
                  {product.name}
                </h5>
                <p className="text-sm text-second-text-color font-medium">
                  {product.name}
                </p>
                
                <div className="flex gap-3 justify-center text-base">
                  <span className="text-muted-color line-through font-normal">
                    ${product.price || "0.00"}
                  </span>
                  <span className="text-second-color-1">
                    ${product.price || "0.00"}
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