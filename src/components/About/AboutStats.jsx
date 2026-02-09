import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";

const AboutStats = () => {
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
        <main className="w-full bg-white">
            {
            aboutSection && (
                <section className="flex flex-col items-center text-center justify-center py-38 gap-25 xl:flex-row">
                    {
                        aboutSection.aboutStats.map( item => (
                            <div key={item.id} className="flex flex-col">
                                <h1 className="font-bold text-6xl leading-20 text-text-color">{item.name}</h1>
                                <h5 className="font-bold text-base leading-6 text-second-text-color">{item.text}</h5>

                            </div>
                        ))

                    }


                </section>
            )}
        </main>

    )
}

export default AboutStats;