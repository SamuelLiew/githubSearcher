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
                    filteredArray={props.filteredArray}
                    title={props.title}
                    allProfiles={props.allProfiles}
                    followers={props.followers}
                    onAddButtonClicked={(name) => props.onAddButtonClicked(name)}
                />
            ) : (
                <ViewList
                    followers={props.followers}
                    onAddButtonClicked={(name) => props.onAddButtonClicked(name)}
                />
            )}
        </>
    );
};

export default FollowerContent;
