import { NavLink } from "react-router-dom";

const TeamNavbar = () => {
  return (
    <section className="w-full py-40 bg-white xl:py-10">
      <article className="flex flex-col mx-auto items-center text-center px-10 font-montserrat font-bold text-text-color xl:w-[86%] xl:gap-12">
        <h5 className="text-base leading-6 text-second-text-color">
          WHAT WE DO
        </h5>
        <h2 className="text-[40px] leading-13">Innovation tailored for you</h2>
        <nav className="flex py-2.5 gap-4 text-sm leading-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-text-color"
                  : "text-second-text-color hover:text-primary-color"
              }`
            }
          >
            Home
          </NavLink>
          <div className="text-muted-color">{">"}</div>
          <NavLink
            to="/team"
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-text-color"
                  : "text-second-text-color hover:text-primary-color"
              }`
            }
          >
            Team
          </NavLink>
        </nav>
      </article>
    </section>
  );
};

export default TeamNavbar;
