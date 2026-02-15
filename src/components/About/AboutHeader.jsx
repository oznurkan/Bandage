import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";

const AboutHeader = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading)
    return <div className="text-center py-10 font-bold">Loading...</div>;
  if (error)
    return (
      <div className="text-danger-color text-center py-10">Error: {error}</div>
    );

  const { aboutSection } = content || {};
  return (
    <main className="w-full h-full overflow-hidden relative bg-white">
      {aboutSection && (
        <section className="flex flex-col w-full h-full pt-40 pb-10 xl:flex-row xl:pt-10">
          <article className="flex flex-col items-center justify-center text-center gap-10 px-19 font-montserrat lg:px-80 xl:flex-1 xl:items-start xl:text-start xl:px-37">
            <h5 className="hidden font-bold text-base leading-6 text-text-color xl:flex">
              {aboutSection.aboutHeader.subtitle}
            </h5>
            <h2 className="font-bold text-[40px] leading-13 text-text-color uppercase xl:text-6xl xl:leading-20">
              {aboutSection.aboutHeader.title}
            </h2>
            <h4 className="font-normal text-xl leading-8 text-second-text-color">
              {aboutSection.aboutHeader.paragraph
                ?.split(",")
                .map((text, index) => (
                  <span key={index}>
                    {text.trim()}
                    {index === 0 && ","}
                    {index === 0 && <br className="hidden xl:block" />}
                  </span>
                ))}
            </h4>
            <button
              onClick={() => {
                document
                  .getElementById("details")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm leading-6 text-white py-4 px-10 cursor-pointer rounded-md gap-2.5 bg-primary-color hover:bg-white hover:text-primary-color hover:border hover:border-primary-color"
            >
              {aboutSection.aboutHeader.buttonText}
            </button>
          </article>
          <article className="relative w-full xl:w-1/2 flex flex-col justify-end overflow-hidden xl:overflow-hidden items-center h-130 xl:flex-row xl:items-start xl:h-150">
            <div className="absolute z-20 w-full h-full flex items-end justify-center">
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[17%] w-72 h-72 bg-light-pink rounded-full z-0 shadow-sm md:w-80 md:h-80 xl:w-120 xl:h-120" />

              <div className="absolute left-1/2 -translate-x-48.75 top-[30%] md:top-[5%] md:-translate-x-60 xl:-translate-x-72 xl:top-0 w-12 h-12 bg-light-pink rounded-full z-10 shadow-md xl:w-20 xl:h-20" />

              <div className="absolute left-1/2 translate-x-40 top-[38%] xl:translate-x-65 md:top-[10%] xl:top-[12%] md:translate-x-46 w-3 h-3 bg-primary-purple rounded-full z-10 xl:w-4 xl:h-4" />

              <div className="absolute left-1/2 -translate-x-35 bottom-[19%] md:-translate-x-57.5 md:bottom-[32%] xl:-translate-x-70 w-3 h-3 bg-primary-purple rounded-full z-30 xl:w-4 xl:h-4" />

              <div className="absolute left-1/2 translate-x-37 bottom-[40%] md:translate-x-42 md:bottom-[60%] xl:translate-x-62 xl:bottom-[58%] w-5 h-5 bg-light-pink rounded-full z-30 shadow-sm xl:w-8 xl:h-8" />
              <img
                src={aboutSection.aboutHeader.images}
                alt={aboutSection.aboutHeader.title}
                className="absolute z-20 w-150 max-w-none left-1/2 -translate-x-1/2 h-full object-contain object-bottom overflow-hidden select-none pointer-events-none md:w-150 xl:max-w-[200%] xl:object-cover xl:w-250 transition-all duration-1000 ease-in-out"
              />
            </div>
          </article>
        </section>
      )}
    </main>
  );
};

export default AboutHeader;
