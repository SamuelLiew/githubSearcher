import {useState} from "react";
import Panel from "./Panel";

const List = (props) => {
    const [arrowDirection, setArrowDirection] = useState("left");
    const deleteHandler = (elementName) => {
        props.deleteHandler(elementName);
    };
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
                    deleteHandler={deleteHandler}
                />
            ))}
        </>
    );
};

export default List;
