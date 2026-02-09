import Team from "../components/Team/Team";
import TeamCta from "../components/Team/TeamCta";
import TeamHeader from "../components/Team/TeamHeader";
import TeamNavbar from "../components/Team/TeamNavbar";

const TeamPage = () => {

    return(
        <>
        <TeamNavbar/>
        <TeamHeader/>
        <Team/>
        <TeamCta/>
        </>

    )
}

export default TeamPage;