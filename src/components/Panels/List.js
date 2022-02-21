import Panel from "./Panel";

/**
 * Maps through the profiles data and returns JSX
 * @param props profiles, onAdd, deleteHandler
 * @returns {JSX.Element}
 */
const List = (props) => {
    return (
        <>
            {Object.keys(props.profiles).map((name) => (
                <Panel
                    key={name}
                    profile={props.profiles[name]}
                    allProfiles={props.profiles}
                    onAdd={props.onAdd}
                    deleteHandler={(name) => props.deleteHandler(name)}
                />
            ))}
        </>
    );
};

export default List;
