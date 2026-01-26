import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataInfo } from "../../store/slices/dataInfoSlice";

const ShopCard = () => {
  const dispatch = useDispatch();
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
        {shopCardSection && (
          <>
            <div className="bg-[url(public/assets/shopCard/images_1.png)] flex bg-cover mx-auto bg-no-repeat bg-center relative w-86.25 h-139 flex-1 xl:w-[612px] xl:h-[572px]">
              <div className="h-[50%] w-full bottom-0 bg-[#2D8BC0BF] z-10 absolute flex flex-col items-start justify-center gap-5 px-10 xl:w-[70%]">
                <h3 className="font-montserrat font-bold text-2xl leading-8 text-white">
                  Top Product Of the Week
                </h3>
                <button className="py-4 px-10 gap-2.5 rounded-xs text-white border border-white font-montserrat font-bold text-sm leading-6">
                  EXPLORE ITEMS
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center mx-auto gap-4 flex-1 xl:items-start xl:h-[572px] ">
              <div className="bg-[url(public/assets/shopCard/images_2.png)] bg-cover bg-no-repeat bg-center relative w-[345px] h-[398px] xl:w-full">
                <div className="h-[60%] w-full bottom-0 bg-[#2D8BC0BF] z-10 absolute flex flex-col items-start justify-center gap-5 px-10 xl:w-[70%]">
                  <h3 className="font-montserrat font-bold text-2xl leading-8 text-white">
                    Top Product Of the Week
                  </h3>
                  <button className="py-4 px-10 gap-2.5 rounded-xs text-white border border-white font-montserrat font-bold text-sm leading-6">
                    EXPLORE ITEMS
                  </button>
                </div>
              </div>
              <div className="bg-[url(public/assets/shopCard/images_3.png)] bg-cover bg-no-repeat bg-center relative w-[345px] h-[398px] xl:w-full">
                <div className="h-[60%] w-full bottom-0 bg-[#2D8BC0BF] z-10 absolute flex flex-col items-start justify-center gap-5 px-10 xl:w-[70%]">
                  <h3 className="font-montserrat font-bold text-2xl leading-8 text-white">
                    Top Product Of the Week
                  </h3>
                  <button className="py-4 px-10 gap-2.5 rounded-xs text-white border border-white font-montserrat font-bold text-sm leading-6">
                    EXPLORE ITEMS
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </article>
    </section>
  );
};

export default ShopCard;
