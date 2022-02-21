import ViewAlbum from "./ViewAlbum";
import ViewApp from "./ViewApp";
import ViewList from "./ViewList";
import {useState} from "react";

/**
 * Returns JSX for the Following and Followers Content. Parent Component
 * of the ViewAlbum, ViewApp, and ViewList components.
 * @param props profile, allProfiles, updateProfile, onClick, activeCard
 * @returns {JSX.Element}
 */
const FollowerIngContent = (props) => {
    const [lastFollowersIndex, setLastFollowersIndex] = useState(50);
    const [lastFollowingIndex, setLastFollowingIndex] = useState(50);

    /**
     * Handles what happens when the user clicks on the "Load Previous Content" div.
     * Updates the lastFollowersIndex or lastFollowingIndex variables.
     * @param e event
     */
    const prevHandler = e => {
        if (props.viewChoice === 1) {
            if (props.filteredArray[0] !== undefined) {
                props.onSubButtonClicked(props.filteredArray[0]["login"]);
                const together = {
                    ...props.subtractedProfiles,
                    ...props.allProfiles,
                    ...{[props.filteredArray[0]["login"]]: true},
                };
                props.setFilteredArray(
                    props.filteredArray.filter((itemObject) => {
                        return together[itemObject["login"]] === undefined;
                    })
                );
            }
            fetchData()
        } else {
            if (props.title === "Followers") {
                e.target.parentElement.parentElement.scrollLeft = lastFollowersIndex === 100 ? 0 : e.target.parentElement.clientWidth;
                setLastFollowersIndex(lastFollowersIndex - 50);
            } else {
                e.target.parentElement.parentElement.scrollLeft = lastFollowingIndex === 100 ? 0 : e.target.parentElement.clientWidth;
                setLastFollowingIndex(lastFollowingIndex - 50);
            }
        }

    };

    /**
     * Handles what happens when the user clicks on the "Load More Content" div.
     * Updates the lastFollowersIndex or lastFollowingIndex variables.
     * @param e event
     */
    const loadHandler = e => {
        if (props.viewChoice === 1) {
            if (props.filteredArray[0] !== undefined) {
                props.onAddButtonClicked(props.filteredArray[0]["login"]);
                const together = {
                    ...props.subtractedProfiles,
                    ...props.allProfiles,
                    ...{[props.filteredArray[0]["login"]]: true},
                };
                props.setFilteredArray(
                    props.filteredArray.filter((itemObject) => {
                        return together[itemObject["login"]] === undefined;
                    })
                );
            }
            fetchData();
        } else {
            e.target.parentElement.parentElement.scrollLeft = e.target.parentElement.clientWidth;
            if (props.title === "Followers") {
                if ((lastFollowersIndex + 50) % 100 === 0 && props.profile[props.title].length <= lastFollowersIndex + 50) props.callAPI();
                setLastFollowersIndex(lastFollowersIndex + 50)
            } else {
                if ((lastFollowingIndex + 50) % 100 === 0 && props.profile[props.title].length <= lastFollowingIndex + 50) props.callAPI()
                setLastFollowingIndex(lastFollowingIndex + 50)
            }
        }
    };

    /**
     * Makes an API call when the viewAlbum filteredArray nears its end.
     * @returns {Promise<void>}
     */
    const fetchData = async () => {
        if (
            props.filteredArray.length === 90 &&
            props.profile[props.title].length % 100 === 0 &&
            props.profile["Information"][props.title.toLowerCase()] >
            props.profile[props.title].length
        ) {
            const data = await props.callAPI();
            props.setFilteredArray([...props.filteredArray, ...data]);
        }
    };

    /**
     * Parses through the list of followers or following and retrieves data
     * separated by arrays of 6 items. The arrays represent the containers
     * while the items in the array represents the cards inside the container.
     *
     * @returns {[Array[],JSX[]]}
     * FollowArray is a list of Arrays.
     * jsxArray is a list of JSX.
     */
    const getContainerAndData = () => {
        let jsxArray = [];
        let followArray = [];
        if (props.title === "Followers") {
            for (let i = Math.floor((lastFollowersIndex - 50) / 6); i < Math.floor((lastFollowersIndex) / 6); i++) {
                if (props.profile[props.title][i * 6] === undefined) break;
                followArray.push(props.profile[props.title].slice(i * 6, i * 6 + 6));
            }
            jsxArray.push(lastFollowersIndex - 50 !== 0 ?
                <div key={Math.random()} className="slide loadPrev">
                    <h3 onClick={(e) => prevHandler(e)}>
                        Click to Load Previous!
                    </h3>
                </div> : null)
        } else {
            for (let i = Math.floor((lastFollowingIndex - 50) / 6); i < Math.floor(lastFollowingIndex / 6); i++) {
                if (props.profile[props.title][i * 6] === undefined) break;
                followArray.push(props.profile[props.title].slice(i * 6, i * 6 + 6));
            }
            jsxArray.push(lastFollowingIndex - 50 !== 0 ?
                <div key={Math.random()} className="slide loadPrev">
                    <h3 onClick={(e) => prevHandler(e)}>
                        Click to Load Previous!
                    </h3>
                </div> : null)
        }
        return [followArray, jsxArray];
    }

    /**
     * Expands on the previous function plus some other changes
     * to include a load more slide.
     *
     * @param jsxArray array of JSX
     * @returns {JSX.Element}
     */
    const getExpandedJSX = (jsxArray) => {
        if (props.title === "Followers") {
            jsxArray.push(props.profile['Information']['followers'] > lastFollowersIndex ?
                <div key={Math.random()} className="slide loadMore"><h3 onClick={(e) => loadHandler(e)}>Click to Load
                    More!</h3>
                </div> :
                null)
        } else {
            jsxArray.push(props.profile['Information']['following'] > lastFollowingIndex ?
                <div key={Math.random()} className="slide loadMore"><h3 onClick={(e) => loadHandler(e)}>Click to Load
                    More!</h3>
                </div> :
                null)
        }
        return (
            <>
                {jsxArray.map((jsx) => jsx)}
            </>
        )
    }
    return (
        <>
            {props.profile['Information'][props.title.toLowerCase()] ?
                (props.viewChoice === 1 ? (
                    <ViewAlbum
                        prevHandler={prevHandler}
                        loadHandler={loadHandler}
                        filteredArray={props.filteredArray}
                    />
                ) : props.viewChoice === 2 ? (
                    <ViewApp
                        getContainerAndData={getContainerAndData}
                        getExpandedJSX={getExpandedJSX}
                        allProfiles={props.allProfiles}
                        onAddButtonClicked={(name) => props.onAddButtonClicked(name)}
                    />
                ) : (
                    <ViewList
                        getContainerAndData={getContainerAndData}
                        getExpandedJSX={getExpandedJSX}
                        allProfiles={props.allProfiles}
                        onAddButtonClicked={(name) => props.onAddButtonClicked(name)}
                    />
                )) : (<h3>Such Emptiness...</h3>)
            }
        </>
    );
};

export default FollowerIngContent;
