import { useState } from "react";
import Followers from "./Followers";
import Followings from "./Followings";
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
        onClick={() => setWhoIsActive("information")}
        activeCard={whoIsActive}
      />
      <Followers
        onClick={() => setWhoIsActive("followers")}
        activeCard={whoIsActive}
      />
      <Followings
        onClick={() => setWhoIsActive("followings")}
        activeCard={whoIsActive}
      />
      <Repositories
        onClick={() => setWhoIsActive("repositories")}
        activeCard={whoIsActive}
      />
      <Stars onClick={() => setWhoIsActive("stars")} activeCard={whoIsActive} />
    </div>
  );
};

export default PanelContent;
