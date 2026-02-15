import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";
import { Play } from "lucide-react";

const AboutVideos = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading)
    return <div className="text-center py-10 font-bold">Loading...</div>;
  if (error)
    return <div className="text-danger-color text-center py-10">Error: {error}</div>;

  const { aboutSection } = content || {};

  return (
    <main className="w-full bg-white">
      {aboutSection && (
        <article className="py-20 px-10">
          <div
            style={{
              backgroundImage: `url(${aboutSection.aboutVideos})`,
            }}
            aria-label="shop-card images"
            className="flex relative bg-cover bg-no-repeat bg-center rounded-4xl mx-auto w-77 h-80 flex-1 md:w-135 lg:w-200 xl:w-253 xl:h-143"
          >
            <button className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-6 bg-primary-color">
              <Play color="#ffffff" fill="#ffffff" />
            </button>
          </div>
        </article>
      )}
    </main>
  );
};

export default AboutVideos;
