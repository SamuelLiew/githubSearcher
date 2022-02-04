import { useState } from "react";
import PanelContent from "./PanelContent";

const Panel = (props) => {
  const [style, setStyle] = useState("");
  const [expanded, toggleExpanded] = useState(false);

  const divClickHandler = (e) => {
    if (props.type === "profile") {
      props.targetHandler(e.target.childNodes[1].outerText);
      expandHandler();
    } else {
    }
  };

  const imgClickHandler = (e) => {
    if (props.type === "profile") {
      e.stopPropagation();
      setStyle("trulyCollapse");
      setTimeout(() => {
        props.deleteHandler(e.target.nextSibling.outerText);
      }, 1500);
    } else {
    }
  };

  // When clicked, shows the current state of the div element
  const expandHandler = () => {
    props.styleReceiver(style);
    if (expanded) {
      setStyle("");
      toggleExpanded(false);
    } else {
      setStyle("expanded");
      toggleExpanded(true);
    }
  };

  //   const deleteHandler = (e) => {};

  return (
    <div className={`panel ${style}`} onClick={divClickHandler}>
      <div className="imageTextHolder">
        <img src={props.imageURL} alt="profile" onClick={imgClickHandler} />
        <p className="userName">{props.userName}</p>
      </div>
      {props.displayContent && <PanelContent isContentExpanded={expanded} />}
    </div>
  );
};

export default Panel;
