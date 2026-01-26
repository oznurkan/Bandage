import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataInfo } from "../../store/slices/dataInfoSlice";

const Content = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading) return <div className="text-center py-10 font-bold">Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const { contentSection } = content || {};

  return (
    <section className="w-full flex flex-col py-20 px-5 gap-13 font-montserrat xl:flex-row-reverse xl:px-0 xl:w-[73%] xl:mx-auto xl:items-center">
      {contentSection && (
        <>
          <article className="flex flex-col gap-4 w-full md:w-[70%] mx-auto xl:flex-1 xl:px-10 text-start">
            <h5 className="font-bold text-base leading-6 text-primary-color">
              {contentSection.subtitle}
            </h5>
            <h2 className="font-bold text-3xl md:text-[40px] leading-tight text-text-color">
              {contentSection.title}
            </h2>
            
            <div className="flex flex-col gap-4 text-second-text-color text-sm leading-5">
              {Object.values(contentSection.paragraph).map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </article>
          <article className="flex w-full gap-3 px-3 xl:flex-1">
            <div className="flex-1 h-90.75 xl:h-124.5 overflow-hidden rounded-lg">
              <img 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                src={contentSection.images_1} 
                alt="Content Visual 1" 
              />
            </div>
            <div className="flex-1 h-90.75 xl:h-124.5 overflow-hidden rounded-lg">
              <img 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                src={contentSection.images_2} 
                alt="Content Visual 2" 
              />
            </div>
          </article>
        </>
      )}
    </section>
  );
};

export default Content;