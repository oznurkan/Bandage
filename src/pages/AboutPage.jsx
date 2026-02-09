import AboutContent from "../components/About/AboutContent";
import AboutHeader from "../components/About/AboutHeader";
import Contact from "../components/About/Contact";
import AboutStats from "../components/About/AboutStats";
import AboutVideos from "../components/About/AboutVideos";
import Team from "../components/Team/Team";
import Client from "../components/Home/Client";

const AboutPage = () => {
    return(
        <>
          <AboutHeader/>
          <AboutContent/>
          <AboutStats/>
          <AboutVideos/>
          <Team/>
          <Client/>
          <Contact/>
        </>
    )
}

export default AboutPage;