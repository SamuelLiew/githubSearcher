import {useState} from "react";
import FollowerIngs from "./FollowerIngs";
import Information from "./Information";
import Repositories from "./Repositories";
import Stars from "./Stars";

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
                repositories={props.profile["Repositories"]}
                updateProfile={(dataArray) => props.updateProfile(dataArray)}
                onClick={() => setWhoIsActive("repositories")}
                activeCard={whoIsActive}
            />
            <Stars
                stars={props.profile["Stars"]}
                updateProfile={(dataArray) => props.updateProfile(dataArray)}
                onClick={() => setWhoIsActive("stars")}
                activeCard={whoIsActive}
            />
        </div>
    );
};

export default PanelContent;
