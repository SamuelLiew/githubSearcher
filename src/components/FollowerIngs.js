import { useState } from "react";
import Card from "./Card";
import FollowerContent from "./FollowerContent";
import FollowingContent from "./FollowingContent";

const FollowerIngs = (props) => {
  const views = {
    1: <ion-icon name="albums-outline"></ion-icon>,
    2: <ion-icon name="apps-outline"></ion-icon>,
    3: <ion-icon name="list-outline"></ion-icon>,
  };
  const [viewChoice, setViewChoice] = useState(1);
  const [title, setTitle] = useState("Following");
  const activeOrInactive =
    props.activeCard === "followerings" ? "active" : "inactive";

  const clickHandler = (e) => {
    props.onClick();
  };

  const viewHandler = () => {
    setViewChoice(viewChoice === 3 ? 1 : viewChoice + 1);
  };

  const switchHandler = () => {
    setTitle(title === "Following" ? "Followers" : "Following");
  };

  /**
   * This Component will manage the Followers and Followings
   * There will be a Following array that stores all the Followings
   *
   * The problem is that there will be multiple panels and each of them
   * have their own followers and followings...
   *
   * which means that the List component must manage the Followers and Followings
   * Using a Dictionary
   * {panel_name:Followers:[array of followers], Following: [array of following]}, next_panel:...}
   *
   * If this is the case, then we might as well combine the original array with the new dictionary
   * {panel_name:{Information:[array of information], Followers:[array of followers],
   *              Following: [array of following]}, next_panel:...}
   *
   * There will be a Followers array that stores all the Followers
   *
   */

  return (
    <Card
      status={activeOrInactive}
      onClick={(e) => clickHandler(e)}
      child={
        <>
          <div className="contentHeader">
            <button onClick={viewHandler} className="button">
              {views[viewChoice]}
            </button>
            <h3>{title}</h3>
            <button onClick={switchHandler} className="button">
              <ion-icon name="swap-vertical-outline"></ion-icon>
            </button>
          </div>
          <div className="followerIngContent">
            {title === "Following" ? (
              <FollowingContent viewChoice={viewChoice} />
            ) : (
              <FollowerContent viewChoice={viewChoice} />
            )}
            {/* Allow three different views, all of them having the ability to slide
            First View is the Album Outline Second View is the App Outline Third
            View is the List Outline */}
          </div>
        </>
      }
    />
  );
};

export default FollowerIngs;
