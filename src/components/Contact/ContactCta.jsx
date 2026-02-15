import { Redo } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";

const ContactCta = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading)
    return <div className="text-center py-10 font-bold">Loading...</div>;
  if (error)
    return <div className="text-danger-color text-center py-10">Error: {error}</div>;

  const { contactSection } = content || {};
  return (
    <main className="w-full flex bg-white">
      {contactSection && (
        <section className="flex flex-col items-center text-center justify-center mx-auto py-20 font-montserrat font-bold gap-8">
          <Redo size={75} className="rotate-45" color="#23A6F0" />
          <h5 className="text-base leading-6 text-text-color uppercase">
            {contactSection.contactCta.title}
          </h5>
          <h1 className="text-6xl leading-20 text-text-color capitalize">
            {contactSection.contactCta.subtitle}
          </h1>
          <button className="text-sm leading-6 text-white cursor-pointer py-4 px-10 rounded-md gap-2.5 bg-primary-color hover:bg-white hover:text-primary-color hover:border hover:border-primary-color">
            {contactSection.contactCta.buttonText}
          </button>
        </section>
      )}
    </main>
  );
};

export default ContactCta;
