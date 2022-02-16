import {useState} from "react";

const RepositoryContent = (props) => {
    const [lastIndex, setLastIndex] = useState(50);


    const jsxHandler = () => {
        let jsxArray = [];
        for (let i = lastIndex - 50; i < lastIndex; i++) {
            if (props.data[i] === undefined) break;
            jsxArray.push(
                <div className="slide" key={props.data[i]['id']}>
                    <div className={"repoSlideContent"}>
                        <a className={`repoTitle`} href={props.data[i]['html_url']} target="_blank"
                           rel="noreferrer">{props.data[i]["name"]}</a>
                        <div className={`repoDescription`}>{props.data[i]['description']}</div>
                        <div className={`numericalHolder`}>
                            <div>Stars: {props.data[i]['stargazers_count']}</div>
                            <div>Issues: {props.data[i]['open_issues']}</div>
                            <div>Forks: {props.data[i]['forks_count']}</div>
                        </div>

                        <div>Language: {props.data[i]['language'] === null ? "N/A" : props.data[i]['language']}</div>
                        <div>License: {props.data[i]['license'] === null ? "N/A" : props.data[i]['license']['name']}</div>
                        <div>Created: {props.data[i]['created_at']}</div>
                        <div>Updated: {props.data[i]['updated_at']}</div>
                        <div className={`availabilityContainer`}>
                            <div className={`archived`}>
                                <div
                                    id={`archivedBackground`}>{props.data[i]['archived'] === false ? "FALSE" : "TRUE"}
                                </div>
                                Archived
                            </div>
                            <div className={`disabled`}>
                                <div
                                    id={`disabledBackground`}>{props.data[i]['disabled'] === false ? "FALSE" : "TRUE"}
                                </div>
                                Disabled
                            </div>
                        </div>
                        {props.data[i]['topics'].length !== 0 &&
                            <div className={`repoTopicsContainer`}>
                                {props.data[i]['topics'].map((topic, index) => <a
                                    key={index}
                                    href={`https://github.com/topics/${topic}`} target="_blank"
                                    rel="noreferrer"
                                    className={`repoTopics`}>{topic}</a>)}
                            </div>}

                    </div>
                </div>)
        }
        return (
            <>
                {jsxArray.map(jsx => jsx)}
            </>
        );
    }

    const loadHandler = (e) => {
        e.target.parentElement.parentElement.scrollLeft = e.target.parentElement.clientWidth;
        if ((lastIndex + 50) % 100 === 0 && props.data.length <= lastIndex + 50) {
            props.callAPI(props.currentPage + 1);
            props.setCurrentPage(props.currentPage + 1)
        }
        setLastIndex(lastIndex + 50)
    };

    const prevHandler = e => {
        if (lastIndex === 100) {
            e.target.parentElement.parentElement.scrollLeft = 0;
        } else {
            e.target.parentElement.parentElement.scrollLeft = e.target.parentElement.clientWidth;

        }
        setLastIndex(lastIndex - 50);
    };

    return (
        <div className="slider">
            {!props.clicked && <div className="slide loading"><h3>Loading...</h3></div>}
            {(props.clicked && lastIndex - 50 !== 0) &&
                <div className="slide loadPrev"><h3 onClick={(e) => prevHandler(e)}>Click to Load Previous!</h3></div>}
            {props.clicked && jsxHandler()}
            {props.profile['Information']['public_repos'] > lastIndex &&
                <div className="slide loadMore"><h3 onClick={(e) => loadHandler(e)}>Click to Load More!</h3></div>}

        </div>
    )
}

export default RepositoryContent;