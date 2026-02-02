import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getDataInfo } from "../../store/slices/dataInfoSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content, loading, error } = useSelector((state) => state.appData);
  const [activeSlide, setActiveSlide] = useState(0);
 
  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  const headerSections = useMemo(() => {
    return content?.headerSection || [];
  }, [content]);

  useEffect(() => {
    if (headerSections.length <= 1) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % headerSections.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [headerSections]);

  if (loading) return <div className="text-center py-10 font-montserrat">Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const currentSlide = headerSections[activeSlide];

  return (
    <main className="flex overflow-hidden relative w-full bg-white h-screen">
      <header className={`flex w-[97%] mx-auto h-screen rounded-3xl bg-linear-to-r ${currentSlide?.bg || "from-[#96E9FB] to-[#ABECD6]"} xl:w-[90%] xl:h-[76%] transition-all duration-1000 ease-in-out`}>
        <section className="flex flex-col box-border items-center justify-center w-full h-full pt-20 xl:pt-0 xl:flex-row relative">
          
          {currentSlide && (
            <>
              <article className="w-full xl:w-1/2 flex flex-col items-center justify-center text-center gap-8 px-4 sm:px-8 xl:items-start xl:text-start xl:px-0 xl:pl-20 z-10">
                <h5 className="font-montserrat uppercase font-bold text-base leading-6 text-white animate-fadeIn">
                  {currentSlide.season}
                </h5>
                <h1 className="font-montserrat uppercase font-bold text-[40px] leading-12 text-text-color xl:text-6xl xl:leading-20">
                  {currentSlide.title}
                </h1>
                <h4 className="font-montserrat font-normal text-xl leading-8 text-second-text-color max-w-md">
                  {currentSlide.paragraph?.split(",").map((text, index) => (
                    <span key={index}>
                      {text.trim()}
                      {index === 0 && ","}
                      {index === 0 && <br className="hidden xl:block" />}
                    </span>
                  ))}
                </h4>
                <button 
                onClick={() => navigate("/shop")}
                className="uppercase rounded-sm py-4 px-10 gap-2.5 font-montserrat font-normal text-xl leading-8 text-white bg-primary-color cursor-pointer hover:scale-105 transition-transform">
                  {currentSlide.buttonText}
                </button>
              </article>
              <article className="relative w-full xl:w-1/2 flex flex-col justify-end overflow-hidden xl:overflow-visible items-center h-full xl:flex-row xl:items-start">
                <div className="absolute z-20 w-full h-full flex items-end justify-center">
                  
                  <div className="absolute left-46/100 -translate-x-1/2 bottom-[17%] w-72 h-72 bg-white rounded-full z-0 shadow-sm md:w-80 md:h-80 xl:w-105 xl:h-105 xl:top-0 xl:left-auto xl:bottom-auto xl:translate-x-0 xl:right-0" />

                  <div className="absolute left-1/2 -translate-x-48.75 top-[10%] md:top-[5%] md:-translate-x-60 xl:-translate-x-50.5 xl:top-[1%] w-12 h-12 bg-white rounded-full z-10 shadow-md xl:w-20 xl:h-20" />

                  <div className="absolute left-1/2 translate-x-38 top-[24%] xl:translate-x-90 md:top-[10%] xl:top-[12%] md:translate-x-46 w-3 h-3 bg-primary-purple rounded-full z-10 xl:w-4 xl:h-4" />

                  <div className="absolute left-1/2 -translate-x-45 bottom-[29%] md:-translate-x-57.5 md:bottom-[32%] xl:-translate-x-40 w-3 h-3 bg-primary-purple rounded-full z-30 xl:w-4 xl:h-4" />

                  <div className="absolute left-1/2 translate-x-33 bottom-[50%] md:translate-x-42 md:bottom-[60%] xl:translate-x-85 xl:bottom-[60%] w-5 h-5 bg-white rounded-full z-30 shadow-sm xl:w-8 xl:h-8" />
                  {headerSections.map((slide, index) => (
                    <img
                      key={slide.id}
                      src={slide.images}
                      alt={slide.title}
                      className={`absolute z-20 w-120 max-w-none h-full object-contain object-bottom select-none pointer-events-none md:w-150 xl:max-w-189 xl:w-245 xl:translate-x-1/8 transition-all duration-1000 ease-in-out ${
                        index === activeSlide
                          ? "opacity-100 -translate-x-1/20 scale-100"
                          : "opacity-0 translate-x-10 scale-95"
                      }`}
                    />
                  ))}
                </div>
              </article>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30 xl:left-20 xl:translate-x-0">
                {headerSections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`rounded-full transition-all duration-500 cursor-pointer ${
                      index === activeSlide
                        ? "w-10 h-2 bg-white"
                        : "w-2 h-2 bg-white bg-opacity-40 hover:bg-opacity-80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </header>
    </main>
  );
};

export default Home;