import { useState } from "react";
import PanelContent from "./PanelContent";

const Panel = (props) => {
  const [style, setStyle] = useState("");

  const imgClickHandler = (e) => {
    e.stopPropagation();
    setStyle("trulyCollapse");
    const data = e.target.nextSibling.innerText;
    setTimeout(() => props.deleteHandler(data), 1500);
  };

  return (
    <div className={`bodySlide panel ${style}`}>
      <div className="imageTextHolder">
        <img src={props.imageURL} alt="profile" onClick={imgClickHandler} />
        <h2 className="userName">{props.userName}</h2>
      </div>

      <PanelContent
        profiles={props.profiles}
        arrowDirection={props.arrowDirection}
        setArrowDirection={(direction) => props.setArrowDirection(direction)}
      />
    </div>
  );
};

export default Panel;
