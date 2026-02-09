import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";

const AboutContent = () => {

  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading)
    return <div className="text-center py-10 font-bold">Yükleniyor...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const { aboutSection } = content || {};

    return(
        <main className="w-full h-full overflow-hidden relative bg-white">
            {
            aboutSection && (
            <section className="flex flex-col w-full h-full font-montserrat mx-auto py-20 px-15 gap-15 xl:flex-row xl:w-[80%] ">
                <article className="flex flex-col items-center justify-center text-center gap-6 lg:px-80 xl:flex-2 xl:items-start xl:text-start xl:px-0">
                    <h2 className="font-normal text-sm leading-5 text-danger-color">
                      {aboutSection.aboutContent.title}
                    </h2>
                    <h3 className="font-bold text-2xl leading-8 text-text-color">
                      {aboutSection.aboutContent.subtitle}
                    </h3>
                </article>
                <article className="flex items-center justify-center flex-3">
                    <p className="font-normal text-sm leading-5 text-second-text-color">
                      {aboutSection.aboutContent.paragraph?.split(",").map((text, index) => (
                            <span key={index}>
                              {text.trim()}
                              {index === 0 && ","}
                              {index === 0 && <br className="hidden xl:block" />}
                            </span>
                          ))}
                    </p>
                </article>
            </section>
        )}
        </main>
    )
}


export default AboutContent;