import Card from "../Card/Card";
import {useState} from "react";
import RepositoryContent from "./RepositoryContent";
import APIHandler from "../../Server/APIHandler";

const Repositories = (props) => {
    const handler = new APIHandler();
    const [clicked, setClicked] = useState(false);
    const [quickData, setQuickData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const activeOrInactive =
        props.activeCard === "repositories" ? "active" : "inactive";

    const clickHandler = async () => {
        props.onClick();
        if (!clicked) {
            const repositories = await handler.repositoryHandler(
                props.updateProfile,
                props.profile["Information"]["login"],
                currentPage
            )
            await setQuickData(repositories);
            setClicked(true);
        }
    };

    const callAPI = async pageNumber => {
        const repositories = await handler.repositoryHandler(
            props.updateProfile,
            props.profile["Information"]["login"],
            pageNumber
        )
        await setQuickData([...quickData, ...repositories])
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
                        <RepositoryContent profile={props.profile} clicked={clicked} data={quickData}
                                           currentPage={currentPage}
                                           callAPI={(pageNumber) => callAPI(pageNumber)}
                                           setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}/>
                    </div>
                </>
            }
        />
    );
};

export default Repositories;
