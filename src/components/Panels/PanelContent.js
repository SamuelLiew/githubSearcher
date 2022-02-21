import {useState} from "react";
import FollowerIngs from "../FollowerIngSection/FollowerIngs";
import Information from "../InformationSection/Information";
import Repositories from "../RepositorySection/Repositories";
import Stars from "../StarsSection/Stars";

/**
 * Returns JSX for the content for the Panels
 * @param props profile, allProfiles, onAdd
 * @returns {JSX.Element}
 */
const PanelContent = (props) => {
    const [whoIsActive, setWhoIsActive] = useState("information");
    return (
        <div className="contentContainer">
            <Information
                profile={props.profile["Information"]}
                onClick={() => setWhoIsActive("information")}
                activeCard={whoIsActive}
            />
            <FollowerIngs
                profile={props.profile}
                allProfiles={props.allProfiles}
                onAdd={props.onAdd}
                onClick={() => setWhoIsActive("followerings")}
                activeCard={whoIsActive}
            />
            <Repositories
                profile={props.profile}
                onClick={() => setWhoIsActive("repositories")}
                activeCard={whoIsActive}
            />
            <Stars
                profile={props.profile}
                onClick={() => setWhoIsActive("stars")}
                activeCard={whoIsActive}
            />
        </div>
    );
};

export default PanelContent;
