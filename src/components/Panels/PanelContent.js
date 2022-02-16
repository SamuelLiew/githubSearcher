import {useState} from "react";
import FollowerIngs from "../FollowerIngSection/FollowerIngs";
import Information from "../InformationSection/Information";
import Repositories from "../RepositorySection/Repositories";
import Stars from "../StarsSection/Stars";

const PanelContent = (props) => {
    const [whoIsActive, setWhoIsActive] = useState("information");
    return (
        <div className="contentContainer">
            <Information
                profile={props.profile["Information"]}
                setArrowDirection={(direction) => props.setArrowDirection(direction)}
                arrowDirection={props.arrowDirection}
                onClick={() => setWhoIsActive("information")}
                activeCard={whoIsActive}
            />
            <FollowerIngs
                profile={props.profile}
                allProfiles={props.allProfiles}
                onAdd={props.onAdd}
                updateProfile={(dataArray) => props.updateProfile(dataArray)}
                onClick={() => setWhoIsActive("followerings")}
                activeCard={whoIsActive}
            />
            <Repositories
                profile={props.profile}
                updateProfile={(dataArray) => props.updateProfile(dataArray)}
                onClick={() => setWhoIsActive("repositories")}
                activeCard={whoIsActive}
            />
            <Stars
                profile={props.profile}
                updateProfile={(dataArray) => props.updateProfile(dataArray)}
                onClick={() => setWhoIsActive("stars")}
                activeCard={whoIsActive}
            />
        </div>
    );
};

export default PanelContent;
