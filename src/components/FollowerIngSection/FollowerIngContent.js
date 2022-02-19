import ViewAlbum from "./ViewAlbum";
import ViewApp from "./ViewApp";
import ViewList from "./ViewList";
import {useState} from "react";

const FollowerIngContent = (props) => {
    const [lastFollowersIndex, setLastFollowersIndex] = useState(50);
    const [lastFollowingIndex, setLastFollowingIndex] = useState(50);

    const prevHandler = e => {
        if (props.title === "Followers") {
            e.target.parentElement.parentElement.scrollLeft = lastFollowersIndex === 100 ? 0 : e.target.parentElement.clientWidth;
            setLastFollowersIndex(lastFollowersIndex - 50);
        } else {
            e.target.parentElement.parentElement.scrollLeft = lastFollowingIndex === 100 ? 0 : e.target.parentElement.clientWidth;
            setLastFollowingIndex(lastFollowingIndex - 50);
        }
    };

    const loadHandler = e => {
        e.target.parentElement.parentElement.scrollLeft = e.target.parentElement.clientWidth;
        if (props.title === "Followers") {
            if ((lastFollowersIndex + 50) % 100 === 0 && props.profile[props.title].length <= lastFollowersIndex + 50) props.callAPI();
            setLastFollowersIndex(lastFollowersIndex + 50)
        } else {
            if ((lastFollowingIndex + 50) % 100 === 0 && props.profile[props.title].length <= lastFollowingIndex + 50) props.callAPI()
            setLastFollowingIndex(lastFollowingIndex + 50)
        }
    };

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
                        filteredArray={props.filteredArray}
                        setFilteredArray={(array) => props.setFilteredArray(array)}
                        profile={props.profile}
                        title={props.title}
                        callAPI={props.callAPI}
                        allProfiles={props.allProfiles}
                        subtractedProfiles={props.subtractedProfiles}
                        onAddButtonClicked={(name) => props.onAddButtonClicked(name)}
                        onSubButtonClicked={(name) => props.onSubButtonClicked(name)}
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
