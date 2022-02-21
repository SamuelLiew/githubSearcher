import Card from "../Card/Card";
import {useContext, useState} from "react";
import RepositoryContent from "./RepositoryContent";
import APIHandler from "../../Server/APIHandler";
import {UpdateProfile} from "../../App";

/**
 * Returns JSX for the Repositories Section
 * @param props profile, onClick, activeCard
 * @returns {JSX.Element}
 */
const Repositories = (props) => {
    /**
     * Variables to keep track of clicks and current
     * page as well as access to quick data.
     */
    const handler = new APIHandler();
    const [clicked, setClicked] = useState(false);
    const [quickData, setQuickData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const updateProfile = useContext(UpdateProfile);
    const activeOrInactive =
        props.activeCard === "repositories" ? "active" : "inactive";

    /**
     * Handles what happens when the Repository Title is clicked.
     * @returns {Promise<void>}
     */
    const clickHandler = async () => {
        props.onClick();
        if (!clicked) {
            const repositories = await handler.repositoryHandler(
                updateProfile,
                props.profile["Information"]["login"],
                currentPage
            );
            await setQuickData(repositories);
            setClicked(true);
        }
    };

    /**
     * Calls the API and sets the quick data
     * @param pageNumber
     * @returns {Promise<void>}
     */
    const callAPI = async (pageNumber) => {
        const repositories = await handler.repositoryHandler(
            updateProfile,
            props.profile["Information"]["login"],
            pageNumber
        );
        await setQuickData([...quickData, ...repositories]);
    };

    return (
        <Card
            status={activeOrInactive}
            onClick={clickHandler}
            child={
                <>
                    <div className="contentHeader">
                        <h3>Repositories</h3>
                    </div>
                    <div className="repositoriesContent">
                        <RepositoryContent
                            profile={props.profile}
                            clicked={clicked}
                            data={quickData}
                            currentPage={currentPage}
                            callAPI={(pageNumber) => callAPI(pageNumber)}
                            setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
                        />
                    </div>
                </>
            }
        />
    );
};

export default Repositories;
