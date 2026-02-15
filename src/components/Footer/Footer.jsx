import { RiFacebookCircleFill } from "react-icons/ri";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../../store/actions/dataActions";

const Footer = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { content, loading, error } = useSelector((state) => state.appData);

  useEffect(() => {
    if (!content) dispatch(getDataInfo());
  }, [dispatch, content]);

  if (loading)
    return <div className="text-center py-10 font-montserrat">Loading...</div>;
  if (error)
    return (
      <div className="text-danger-color text-center py-10 font-montserrat">
        Error: {error}
      </div>
    );

  const { footer } = content || {};
  if (!footer) return null;

  const socialIcons = [RiFacebookCircleFill, FaInstagram, FaTwitter];

  return (
    <footer className="w-full font-montserrat">
      <section className="bg-thin-white">
        <article className="flex flex-col gap-3 py-15 px-5 mx-auto md:w-[80%] md:flex-row md:justify-between xl:w-[73%] xl:px-0">
          <h3 className="font-bold text-2xl text-bold-blue">{footer.title}</h3>
          <div className="flex gap-5">
            {socialIcons.map((Icon, idx) => (
              <Icon
                key={idx}
                size={24}
                color="#23A6F0"
                className="cursor-pointer hover:opacity-80"
              />
            ))}
          </div>
        </article>
      </section>
      <section className="bg-white border-y border-gray-100">
        <article className="flex flex-col py-18 px-5 gap-8 mx-auto  md:w-[80%] xl:flex-row xl:w-[73%] xl:px-0">
          {footer.information.map((info) => (
            <div key={info.id} className="flex flex-col gap-5 xl:flex-1">
              <h5 className="font-bold text-base text-bold-blue capitalize">
                {info.title}
              </h5>
              <nav className="flex flex-col text-sm font-bold capitalize text-second-text-color gap-2.5">
                {info.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={`#${link}`}
                    className="hover:text-primary-blue"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          ))}
          <div className="flex flex-col gap-5 xl:flex-2">
            <h5 className="font-bold text-bold-blue capitalize">
              {footer.form.title}
            </h5>
            <form className="flex flex-col gap-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="sgrow bg-[#F9F9F9] border border-gray-200 rounded-l-md px-6 py-4 text-sm outline-none"
                  placeholder="Your Email"
                />
                <button className="bg-primary-color text-white px-6 py-4 text-sm font-bold rounded-r-md hover:bg-opacity-90 transition-all">
                  {footer.form.buttonText}
                </button>
              </div>
              <span className="text-xs text-second-text-color italic">
                {email ? `Yazdığınız: ${email}` : "Lütfen bir email giriniz."}
              </span>
            </form>
          </div>
        </article>
      </section>
      <section className="bg-thin-white py-10">
        <h6 className="w-[73%] mx-auto font-bold text-sm text-second-text-color text-center md:w-[80%] md:text-start xl:w-[73%] capitalize">
          {footer.text}
        </h6>
      </section>
    </footer>
  );
};

export default Footer;
