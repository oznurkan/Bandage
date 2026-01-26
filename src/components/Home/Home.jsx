import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDataInfo } from "../../store/slices/dataInfoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading) return <div className="text-center py-10">Yükleniyor...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const { headerSection } = content || {};

  return (
    <main className="flex overflow-hidden relative w-full bg-white h-screen">
      <header className="flex w-[97%] mx-auto h-screen rounded-3xl bg-linear-to-r from-[#96E9FB] to-[#ABECD6] xl:w-[90%] xl:h-[76%] ">
        <section className="flex flex-col items-center justify-center w-full h-full pt-20 xl:pt-0 xl:flex-row">
          {headerSection && (
            <> 
              <article className="flex flex-1 flex-col items-center justify-center text-center gap-8 px-13 xl:items-start xl:text-start xl:px-0 xl:pl-20">
                <h5 className="font-montserrat uppercase font-bold text-base leading-6 text-white hover:text-hover-text-colors">
                  {headerSection.season}
                </h5>
                <h1 className="font-montserrat uppercase font-bold text-[40px] leading-12 text-text-color xl:text-6xl xl:leading-20">
                  {headerSection.title}
                </h1>
                <h4 className="font-montserrat font-normal text-xl leading-8 text-second-text-color">
                  {headerSection.paragraph.split(",").map((text, index) => (
                    <span key={index}>
                      {text.trim()}
                      {index === 0 && ","}
                      {index === 0 && <br className="hidden xl:block" />}
                    </span>
                  ))}
                </h4>

                <button className="uppercase rounded-sm py-4 px-10 gap-2.5 font-montserrat font-normal text-xl leading-8 text-white bg-primary-color ">
                  {headerSection.buttonText}
                </button>
              </article>
              <article className="relative flex-1 flex flex-col justify-end w-full overflow-hidden xl:overflow-visible items-center h-full xl:flex-row xl:items-start ">
                <div className="absolute left-47/100 -translate-x-1/2 bottom-[17%] w-74 h-74 bg-white rounded-full z-0 shadow-sm md:w-80 md:h-80 xl:w-125 xl:h-125 xl:top-0 xl:left-auto xl:bottom-auto xl:translate-x-0 xl:right-0" />
                <div className="absolute left-1/2 -translate-x-48.75 top-[10%] md:top-[5%] md:-translate-x-60 xl:-translate-x-62.5 xl:top-[1%] w-12 h-12 bg-white rounded-full z-10 shadow-md xl:w-20 xl:h-20" />
                <div className="absolute left-1/2 translate-x-38 top-[24%] xl:translate-x-85 md:top-[10%] xl:top-[15%] md:translate-x-46  w-3 h-3 bg-primary-purple rounded-full z-10 xl:w-4 xl:h-4" />
                <div className="absolute left-1/2 -translate-x-45 bottom-[29%] md:-translate-x-57.5 md:bottom-[32%]  xl:-translate-x-50 w-3 h-3 bg-primary-purple rounded-full z-30 xl:w-4 xl:h-4" />
                <div className="absolute left-1/2 translate-x-33 bottom-[50%] md:translate-x-42 md:bottom-[60%] xl:translate-x-75 xl:bottom-[60%] w-5 h-5 bg-white rounded-full z-30 shadow-sm xl:w-8 xl:h-8 " />

                <img
                  src={headerSection.images}
                  alt="Header Product"
                  className="absolute 
                                      z-20
                                      w-120
                                      max-w-none
                                      -translate-x-1/20
                                      xl:max-w-199 
                                      h-full 
                                      object-contain 
                                      object-bottom 
                                      select-none 
                                      pointer-events-none
                                      md:w-150
                                      xl:w-255
                                      xl:translate-x-1/6 "
                />
              </article>
            </>
          )}
        </section>
      </header>
    </main>
  );
};

export default Home;
