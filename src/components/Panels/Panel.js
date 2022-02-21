import {useState} from "react";
import PanelContent from "./PanelContent";

/**
 * Returns JSX for each of the panels.
 * @param props profiles, allProfiles, onAdd, deleteHandler
 * @returns {JSX.Element}
 */
const Panel = (props) => {
    /**
     * sets the style of the panel
     */
    const [style, setStyle] = useState("");

    /**
     * Handles what happens when the image is clicked.
     */
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
            />
        </div>
    );
};

export default Panel;
