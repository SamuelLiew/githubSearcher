import { useState } from "react";
import FollowerIngs from "./FollowerIngs";
import Information from "./Information";
import Repositories from "./Repositories";
import Stars from "./Stars";

const PanelContent = (props) => {
  const [whoIsActive, setWhoIsActive] = useState("information");
  const clickHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="contentContainer" onClick={clickHandler}>
      <Information
        profiles={props.profiles}
        setArrowDirection={(direction) => props.setArrowDirection(direction)}
        arrowDirection={props.arrowDirection}
        onClick={() => setWhoIsActive("information")}
        activeCard={whoIsActive}
      />
      <FollowerIngs
        onClick={() => setWhoIsActive("followerings")}
        activeCard={whoIsActive}
      />
      {/* <Followings
        onClick={() => setWhoIsActive("followings")}
        activeCard={whoIsActive}
      /> */}
      <Repositories
        onClick={() => setWhoIsActive("repositories")}
        activeCard={whoIsActive}
      />
      <Stars onClick={() => setWhoIsActive("stars")} activeCard={whoIsActive} />
    </div>
  );
};

export default PanelContent;
