import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataInfo } from "../../store/actions/dataActions";
import { useNavigate } from "react-router-dom";

const ShopCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading) return <div className="text-center py-10">Yükleniyor...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const { shopCardSection } = content || {};

  return (
    <section className="w-full h-full">
      <article className="flex flex-col items-center w-ful h-full py-6 px-5 gap-4 mx-auto xl:w-[82%] xl:flex-row ">
        {shopCardSection && shopCardSection.shopCards.length > 0 && (
          <>
            <div className="flex-1 mx-auto flex  ">
              <div
                style={{
                  backgroundImage: `url(${shopCardSection.shopCards[0].images})`,
                }}
                aria-label="shop-card images"
                className="flex bg-cover bg-no-repeat bg-center relative w-86.25 h-139 flex-1 md:w-135 lg:w-200 xl:w-153 xl:h-143"
              >
                <div className="h-[50%] w-full bottom-0 bg-[#2D8BC0BF] z-10 absolute flex flex-col items-start justify-center gap-5 px-10 xl:w-[70%]">
                  <h3 className="font-montserrat font-bold text-2xl leading-8 capitalize text-white">
                    {shopCardSection.shopCards[0].text}
                  </h3>
                  <button
                    onClick={() => navigate("/shop")}
                    className="py-4 px-10 gap-2.5 uppercase cursor-pointer rounded-xs text-white border border-white font-montserrat font-bold transition-all duration-300 ease-in-out hover:bg-white hover:text-text-color text-sm leading-6"
                  >
                    {shopCardSection.shopCards[0].buttonText}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center mx-auto gap-4 flex-1 xl:items-start xl:h-143 ">
              {shopCardSection.shopCards.slice(1).map((shop) => (
                <div
                  key={shop.id}
                  style={{ backgroundImage: `url(${shop.images})` }}
                  className="bg-cover bg-no-repeat bg-center relative w-86.25 h-99.5 md:w-135 lg:w-200 xl:w-full"
                >
                  <div className="h-[60%] w-full bottom-0 bg-[#2D8BC0BF] z-10 absolute flex flex-col items-start justify-center gap-5 px-10 xl:w-[70%]">
                    <h3 className="font-montserrat capitalize font-bold text-2xl leading-8 text-white">
                      {shop.text}
                    </h3>
                    <button
                      onClick={() => navigate("/shop")}
                      className="py-4 px-10 gap-2.5 uppercase cursor-pointer rounded-xs text-white border border-white font-montserrat font-bold text-sm leading-6 transition-all duration-300 ease-in-out hover:bg-white hover:text-text-color"
                    >
                      {shop.buttonText}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </article>
    </section>
  );
};

export default ShopCard;
