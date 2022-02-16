import {useState} from "react";
import Panel from "./Panel";

const List = (props) => {
    const [arrowDirection, setArrowDirection] = useState("left");
    return (
        <>
            {Object.keys(props.profiles).map((name) => (
                <Panel
                    key={name}
                    profile={props.profiles[name]}
                    allProfiles={props.profiles}
                    onAdd={props.onAdd}
                    arrowDirection={arrowDirection}
                    setArrowDirection={(direction) => setArrowDirection(direction)}
                    updateProfile={(dataArray) => props.updateProfile(dataArray)}
                    deleteHandler={(name) => props.deleteHandler(name)}
                />
            ))}
        </>
    );
};

export default List;
