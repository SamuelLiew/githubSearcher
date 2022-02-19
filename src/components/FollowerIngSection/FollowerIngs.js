import {useState} from "react";
import APIHandler from "../../Server/APIHandler";
import Card from "../Card/Card";
import FollowerIngContent from "./FollowerIngContent";

const FollowerIngs = (props) => {
    const views = {
        1: <ion-icon name="albums-outline"/>,
        2: <ion-icon name="apps-outline"/>,
        3: <ion-icon name="list-outline"/>,
    };
    const handler = new APIHandler();
    const [viewChoice, setViewChoice] = useState(1);
    const [title, setTitle] = useState("Following");
    const [clicked, setClicked] = useState(false);
    const [currentFollowingPage, setCurrentFollowingPage] = useState(1);
    const [currentFollowersPage, setCurrentFollowersPage] = useState(1);
    const [subtractedProfiles, setSubtractedProfiles] = useState({});
    const [filteredArray, setFilteredArray] = useState([]);
    const activeOrInactive =
        props.activeCard === "followerings" ? "active" : "inactive";

    const clickHandler = async () => {
        props.onClick();
        if (clicked === false) {
            const following = await handler.followingHandler(
                props.updateProfile,
                props.profile["Information"]["login"],
                1
            )
            await setFilteredArray(following.filter((dataItem) => {
                return props.allProfiles[dataItem['login']] === undefined;
            }))

            await handler.followersHandler(
                props.updateProfile,
                props.profile["Information"]["login"],
                1
            )
            setClicked(true);
        }
    };

    const viewHandler = () => {
        const together = {...props.allProfiles, ...subtractedProfiles}
        setFilteredArray([...props.profile[title].filter((dataItem) => {
            return together[dataItem['login']] === undefined;
        })])
        setViewChoice(viewChoice === 3 ? 1 : viewChoice + 1);
    };

    const switchHandler = (e) => {
        e.stopPropagation();
        const holder = title === "Following" ? "Followers" : "Following";

        const together = {...props.allProfiles, ...subtractedProfiles}
        setFilteredArray([...props.profile[holder].filter((dataItem) => {
            return together[dataItem['login']] === undefined;
        })])

        setTitle(holder);
    };

    const onAddButtonClickedHandler = (name) => {
        handler.addHandler(props.allProfiles, props.onAdd, name, props.profile["Information"]["login"]).then()
    };

    const onSubButtonClickedHandler = (name) => {
        setSubtractedProfiles(prevState => ({
            ...prevState,
            [name]: true
        }))
    };


    const callAPI = async () => {
        let data;
        if (title === "Following") {
            data = await handler.followingHandler(
                props.updateProfile,
                props.profile["Information"]["login"],
                currentFollowingPage + 1
            )
            setCurrentFollowingPage(currentFollowingPage + 1)
        } else {
            data = await handler.followersHandler(
                props.updateProfile,
                props.profile["Information"]["login"],
                currentFollowersPage + 1
            )
            setCurrentFollowersPage(currentFollowersPage + 1)
        }
        console.log(data)
        return data;
    };

    return (
        <Card
            status={activeOrInactive}
            onClick={clickHandler}
            child={
                <>
                    <div className="contentHeader">
                        <button onClick={viewHandler} className="button">
                            {views[viewChoice]}
                        </button>
                        <h3>{title}</h3>
                        <button onClick={switchHandler} className="button">
                            <ion-icon name="swap-vertical-outline"/>
                        </button>
                    </div>
                    <div className="followerIngContent">
                        <FollowerIngContent
                            profile={props.profile}
                            callAPI={callAPI}
                            viewChoice={viewChoice}
                            title={title}
                            filteredArray={filteredArray}
                            setFilteredArray={(array) => setFilteredArray(array)}
                            allProfiles={props.allProfiles}
                            subtractedProfiles={subtractedProfiles}
                            onAddButtonClicked={(name) => onAddButtonClickedHandler(name)}
                            onSubButtonClicked={(name) => onSubButtonClickedHandler(name)}
                        />
                    </div>
                </>
            }
        />
    );
};

export default FollowerIngs;
