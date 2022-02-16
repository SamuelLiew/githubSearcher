import {useState} from "react";
import PanelContent from "./PanelContent";

const Panel = (props) => {
    const [style, setStyle] = useState("");

    const imgClickHandler = () => {
        setStyle("trulyCollapse");
        setTimeout(() => {
            props.deleteHandler(props.profile["Information"]["login"]);
        }, 1500);
    };

    return (
        <div className={`bodySlide panel ${style}`}>
            <div className="imageTextHolder">
                <img
                    src={props.profile["Information"]["avatar_url"]}
                    alt="profile"
                    onClick={imgClickHandler}
                />
                <h2 className="userName">{props.profile["Information"]["login"]}</h2>
            </div>

            <PanelContent
                profile={props.profile}
                allProfiles={props.allProfiles}
                onAdd={props.onAdd}
                arrowDirection={props.arrowDirection}
                setArrowDirection={(direction) => props.setArrowDirection(direction)}
                updateProfile={(dataArray) => props.updateProfile(dataArray)}
            />
        </div>
    );
};

export default Panel;
