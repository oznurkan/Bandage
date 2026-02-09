import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";

const TeamHeader = () => {
  const dispatch = useDispatch();

  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading)
    return <div className="text-center py-10 font-bold">Yükleniyor...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const { teamSection } = content || {};

  return (
    <main className="w-full">
      {teamSection?.teamHeader &&
        teamSection.teamHeader.length > 0 &&
        (() => {
          const [firstImg, ...otherImages] = teamSection.teamHeader;

          return (
            <section className="flex flex-col xl:flex-row w-full gap-4 min-h-150">
              <article className="flex-2 h-100 xl:h-auto overflow-hidden rounded-lg">
                <img
                  src={firstImg}
                  alt="Main Team"
                  className="w-full h-full object-cover"
                />
              </article>
              <article className="flex-2 flex flex-wrap gap-4">
                {otherImages.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="flex-1 min-w-[45%] h-50 xl:h-[calc(50%-0.5rem)] overflow-hidden rounded-lg"
                  >
                    <img
                      src={imgUrl}
                      alt={`Team ${index}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </article>
            </section>
          );
        })()}
    </main>
  );
};

export default TeamHeader;
