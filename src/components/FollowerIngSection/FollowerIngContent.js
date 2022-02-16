import ViewAlbum from "./ViewAlbum";
import ViewApp from "./ViewApp";
import ViewList from "./ViewList";

const FollowerIngContent = (props) => {
    const getFollowersData = () => {
        return props.title === "Following" ? undefined : props.data;
    }

    const getFollowingData = () => {
        return props.title === "Followers" ? undefined : props.data;
    }
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
                    allProfiles={props.allProfiles}
                    following={getFollowingData()}
                    followers={getFollowersData()}
                    title={props.title}
                    onAddButtonClicked={(name) => props.onAddButtonClicked(name)}
                />
            ) : (
                <ViewList
                    allProfiles={props.allProfiles}
                    followers={getFollowersData()}
                    following={getFollowingData()}
                    title={props.title}
                    onAddButtonClicked={(name) => props.onAddButtonClicked(name)}
                />
            )}
        </>
    );
};

export default FollowerIngContent;
