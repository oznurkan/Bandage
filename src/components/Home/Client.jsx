import {
  FaRedditAlien,
  FaStripe,
  FaAws,
  FaPiedPiperHat,
  FaLyft,
  FaHooli,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Client = () => {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <main className={`w-full ${isAboutPage ? "bg-thin-white" : "bg-white"}`}>
      <section className="flex flex-col py-10 gap-15">
        {isAboutPage && (
          <article className="flex flex-col items-center text-center justify-center gap-8 px-15 font-montserrat">
            <h2 className="font-bold text-[40px] leading-13 text-text-color">
              Big Companies Are Here
            </h2>
            <p className="font-normal text-sm leading-5 text-second-text-color">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics{" "}
            </p>
          </article>
        )}
        <article className="flex flex-col items-center mx-auto gap-12 sm:flex-row sm:gap-0 sm:py-50 flex-wrap xl:pt-5 xl:gap-1 xl:w-[70%]">
          <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7">
            <FaHooli className="size-37 xl:size-25" color="#737373" />
          </span>
          <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7">
            <FaLyft className="size-37 xl:size-25" color="#737373" />
          </span>
          <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7">
            <FaPiedPiperHat className="size-37 xl:size-25" color="#737373" />
          </span>
          <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7">
            <FaStripe className="size-37 xl:size-25" color="#737373" />
          </span>
          <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7">
            <FaAws className="size-37 xl:size-25" color="#737373" />
          </span>
          <span className="sm:flex-1/2 flex justify-center lg:flex-1/3 xl:flex-1/7">
            <FaRedditAlien className="size-37 xl:size-25" color="#737373" />
          </span>
        </article>
      </section>
    </main>
  );
};

export default Client;
