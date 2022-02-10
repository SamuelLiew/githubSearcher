import ViewAlbum from "./ViewAlbum";
import ViewApp from "./ViewApp";
import ViewList from "./ViewList";

const FollowerContent = (props) => {


    return (
        <>
            {props.viewChoice === 1 ? (
                <ViewAlbum
                    filteredArray={props.filteredArray}
                    setFilteredArray={(array) => props.setFilteredArray(array)}
                    allProfiles={props.allProfiles}
                    subtractedProfiles={props.subtractedProfiles}
                    onAddButtonClicked={(name) => props.onAddButtonClicked(name)}
                    onSubButtonClicked={(name) => props.onSubButtonClicked(name)}
                />
            ) : props.viewChoice === 2 ? (
                <ViewApp
                    following={props.following}
                    followers={props.followers}
                    onAddButtonClicked={(name) => props.onAddButtonClicked(name)}
                />
            ) : (
                <ViewList
                    following={props.following}
                    followers={props.followers}
                    onAddButtonClicked={(name) => props.onAddButtonClicked(name)}
                />
            )}
        </>
    );
};

export default FollowerContent;
