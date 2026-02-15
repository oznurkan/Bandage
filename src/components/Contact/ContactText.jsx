import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";
import { MapPin, Phone, Send } from "lucide-react";

const ContactText = () => {
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);
  const icons = [Phone, MapPin, Send];

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading)
    return <div className="text-center py-10 font-bold">Loading...</div>;
  if (error)
    return (
      <div className="text-danger-color text-center py-10">Error: {error}</div>
    );

  const { contactSection } = content || {};
  return (
    <main className="flex w-full bg-light-gray-1 xl:bg-white">
      {contactSection && (
        <section className="flex flex-col items-center justify-center text-center font-montserrat font-bold mx-auto py-20 gap-15 xl:gap-20">
          <article className="flex flex-col gap-8 mx-auto px-10 md:px-40 lg:px-60 xl:px-0 xl:w-[60%]">
            <h6 className="text-sm leading-6 text-text-color">
              {contactSection.contactText.title}
            </h6>
            <h2 className="text-[40px] leading-13 text-text-color">
              {contactSection.contactText.subtitle}
            </h2>
          </article>
          <article className="flex flex-col gap-8 xl:flex-row">
            {contactSection.contactText.contact.map((item) => {
              const IconComponent = icons[item.id - 1];
              return (
                <div
                  key={item.id}
                  className={`flex flex-col items-center p-10 gap-5 w-80 md:w-150 xl:w-80 transition-all duration-300 ${
                    item.id % 2 === 0
                      ? "bg-[#252B42] text-white py-15"
                      : "bg-white text-[#252B42]"
                  }`}
                >
                  <div className="text-primary-color">
                    <IconComponent size={72} strokeWidth={1} />
                  </div>
                  <div className="flex flex-col items-center font-bold text-sm leading-6">
                    <a
                      href={`mailto:${item.link1}`}
                      className="hover:underline"
                    >
                      {item.link1}
                    </a>
                    <a
                      href={`mailto:${item.link2}`}
                      className="hover:underline"
                    >
                      {item.link2}
                    </a>
                  </div>
                  <h5 className="font-bold text-base leading-6">{item.text}</h5>

                  <button 
                  onClick={() => window.location.href = `mailto:info@example.com?subject=Contact US`}
                  className="px-5 py-2.5 cursor-pointer border border-primary-color text-primary-color rounded-2xl font-bold text-sm leading-6 hover:bg-primary-color hover:text-white transition-colors">
                    {item.buttonText}
                  </button>
                </div>
              );
            })}
          </article>
        </section>
      )}
    </main>
  );
};

export default ContactText;
