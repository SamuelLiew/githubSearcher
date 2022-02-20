import Card from "../Card/Card";
import { useState } from "react";
import APIHandler from "../../Server/APIHandler";
import StarsContent from "./StarsContent";

const Stars = (props) => {
  const handler = new APIHandler();
  const [clicked, setClicked] = useState(false);
  const [quickData, setQuickData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const activeOrInactive = props.activeCard === "stars" ? "active" : "inactive";

  const clickHandler = async () => {
    props.onClick();
    if (!clicked) {
      const stars = await handler.starsHandler(
        props.updateProfile,
        props.profile["Information"]["login"],
        currentPage
      );
      if (stars.length === 0) {
        await setQuickData(["SuchEmpty"]);
      } else {
        await setQuickData(stars);
      }

      setClicked(true);
    }
  };
  const callAPI = async (pageNumber) => {
    const stars = await handler.starsHandler(
      props.updateProfile,
      props.profile["Information"]["login"],
      pageNumber
    );
    await setQuickData([...quickData, ...stars]);
  };

  return (
    <Card
      status={activeOrInactive}
      onClick={clickHandler}
      child={
        <>
          <div className="contentHeader">
            <h3>Starred</h3>
          </div>
          <div className="starsContent">
            <StarsContent
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

export default Stars;
