import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";

const Contact = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading)
    return <div className="text-center py-10 font-bold">Yükleniyor...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">Hata: {error}</div>;

  const { contactSection } = content || {};

  return (
    <main className="w-full bg-hover-color">
      {contactSection && (
        <section className="flex xl:flex-row">
          <article className="font-montserrat text-white flex flex-col mx-auto justify-center items-center text-center px-21 gap-6 py-35 xl:flex-1 xl:items-start xl:text-start xl:pr-40">
            <h5 className="font-bold text-base leading-6 uppercase">
              {contactSection.title}
            </h5>
            <h2 className="font-bold text-[40px] leading-12 capitalize">
              {contactSection.subtitle}
            </h2>
            <p className="font-normal text-sm leading-5">
              {contactSection.paragraph}{" "}
            </p>
            <button className="font-bold text-sm leading-5.5 text-light-gray-1 capitalize rounded-md cursor-pointer py-4 px-10 gap-2.5 border border-light-gray-1">
              {contactSection.buttonText}
            </button>
          </article>
          <article
            className={`hidden bg-cover bg-center bg-no-repeat min-h-150 h-full w-[40%] xl:flex`}
            style={{ backgroundImage: `url(${contactSection.images})` }}
          ></article>
        </section>
      )}
    </main>
  );
};

export default Contact;
