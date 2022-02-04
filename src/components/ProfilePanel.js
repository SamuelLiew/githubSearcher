import { useState } from "react";
import APIHandler from "../APIHandler";
import Panel from "./Panel";
const ProfilePanel = (props) => {
  const handler = new APIHandler();
  const [display, setDisplay] = useState(false);

  const receiveStyle = (style) => {
    setTimeout(() => {
      style === "expanded" ? setDisplay(false) : setDisplay(true);
    }, 1500);
  };

  const deleteHandler = (elementName) => {
    props.deleteHandler(elementName);
  };
  const targetHandler = async (target) => {
    const targetObject = props.profiles.filter((i) => {
      return i["login"] === target;
    })[0];
    if (targetObject["followers_url"].length > 30) {
      const updatedObject = await handler.getUpdatedObject(targetObject);
      props.updateProfile(updatedObject);
    }
  };
  return (
    <>
      <Panel
        type="profile"
        imageURL={props.imageURL}
        userName={props.userName}
        targetHandler={targetHandler}
        deleteHandler={deleteHandler}
        styleReceiver={receiveStyle}
        displayContent={display}
        // panelContent={<PanelContent />}
      />
    </>
  );
};

export default ProfilePanel;
