import { FaBookReader } from "react-icons/fa";
import { VscBook } from "react-icons/vsc";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataInfo } from "../../store/slices/dataInfoSlice";

const FeaturedProduct = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading) return <div className="text-center py-10">Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const { featuresProductSection } = content || {};

  const icons = [FaBookReader, VscBook, FaArrowTrendUp];

  return (
    <section className="flex flex-col py-20 gap-20 w-full bg-white font-montserrat">
      {featuresProductSection && (
        <>
          <article className="flex flex-col w-[62%] mx-auto text-center items-center gap-2.5">
            <h4 className="font-normal text-xl leading-8 capitalize text-second-text-color">
              {featuresProductSection.subtitle}
            </h4>
            <h3 className="font-bold text-2xl leading-8 uppercase text-text-color">
              {featuresProductSection.title}
            </h3>
            <p className="font-normal text-sm leading-5 text-second-text-color">
              {featuresProductSection.paragraph}
            </p>
          </article>
          <article className="flex flex-col w-[62%] mx-auto text-center items-center gap-8 xl:flex-row xl:items-start">
            {featuresProductSection.features.map((feature, index) => {
              const IconComponent = icons[index];

              return (
                <div 
                  key={feature.id} 
                  className="flex flex-col items-center text-center py-9 px-10 gap-5 xl:flex-1"
                >
                  {IconComponent && <IconComponent size={72} color="#23A6F0" />}
                  
                  <h3 className="font-bold text-2xl leading-8 text-text-color">
                    {feature.title}
                  </h3>
                  <p className="font-normal text-sm leading-6 text-second-text-color">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </article>
        </>
      )}
    </section>
  );
};

export default FeaturedProduct;