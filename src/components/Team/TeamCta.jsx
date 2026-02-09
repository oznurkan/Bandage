import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const TeamCta = () => {
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
    <main className="w-full flex">
      {teamSection?.teamCta && (
        <section className="flex flex-col py-20 px-20 gap-15 mx-auto items-center text-center justify-center">
          <article className="font-montserrat flex flex-col items-center gap-8 ">
            <h2 className="font-bold text-[40px] leading-13 text-text-color">{teamSection.teamCta.title}</h2>
            <p className="font-normal text-sm leading-5 text-second-text-color">{teamSection.teamCta.paragraph}</p>
            <button className="text-sm leading-6 text-white py-4 px-10 rounded-md gap-2.5 bg-primary-color">{teamSection.teamCta.buttonText}</button>
          </article>
          <article>
            <div className="flex items-center p-2.5 gap-8">
                          {[
                            { Icon: FaTwitter, name: "twitter", link: "https://x.com/" },
                            { Icon: FaFacebook, name: "facebook", link: "https://www.facebook.com/" },
                            { Icon: FaInstagram, name: "instagram", link: "https://www.instagram.com/" },
                            { Icon: FaLinkedin, name: "linkedin", link: "https://linkedin.com/" },
                          ].map((item, idx) => (
                            <a
                              key={idx}
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              title={`go to ${item.name}`}
                              aria-label={`go to ${item.name}`}
                              className="py-1.5 text-text-color hover:text-primary-color cursor-pointer hover:scale-110 transition-transform"
                            >
                              <item.Icon size={30} />
                            </a>
                          ))}
                        </div>
          </article>
        </section>
      )}
    </main>
  );
};

export default TeamCta;
