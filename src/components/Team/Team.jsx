import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";

const Team = () => {
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
    <main className="w-full bg-light-gray-1">
      {teamSection && (
        <section className="flex flex-col py-40 gap-15 font-montserrat xl:py-20">
          <article className="flex flex-col items-center text-center mx-auto px-20 py-10 gap-2.5 md:w-[60%]">
            <h2 className="font-bold text-[40px] leading-13 text-text-color capitalize">
              {teamSection.title}
            </h2>
            <p className="font-normal text-sm leading-5 text-second-text-color">
              {teamSection.paragraph}
            </p>
          </article>
          <article className="flex flex-col gap-8 mx-auto w-[60%] rounded-2xl flex-wrap md:flex-row md:w-[80%]">
            {teamSection.team.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center gap-2.5 py-8 px-10 mx-auto bg-white md:w-[40%] lg:w-[30%] lg:mx-0 xl:w-[22%] xl:mx-auto"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={item.images}
                    alt={item.name}
                  />
                </div>
                <h6 className="font-bold text-sm leading-6 text-primary-color capitalize">
                  {item.position}
                </h6>
                <h5 className="font-bold text-base leading-6 text-text-color capitalize">
                  {item.name}
                </h5>
                <p className="font-normal text-sm leading-5 text-second-text-color">
                  {item.text}
                </p>
              </div>
            ))}
          </article>
        </section>
      )}
    </main>
  );
};

export default Team;
