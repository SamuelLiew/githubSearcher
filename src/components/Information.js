import Card from "./Card";
import InformationContent from "./InformationContent";
import APIHandler from "../APIHandler";
import { useState } from "react";
const Information = (props) => {
  let key = 0;

  const getKey = () => {
    key = key + 1;
    return key;
  };

  const handler = new APIHandler();
  const firstTitles = ["Bio", "Blog", "Company", "Created"];
  const secondTitles = ["Email", "Followers", "Following", "Gists"];
  const thirdTitles = ["Github", "Name", "Twitter", "Type"];
  const fourthTitles = ["Updated"];
  const everyTitle = [
    ...firstTitles,
    ...secondTitles,
    ...thirdTitles,
    ...fourthTitles,
  ];
  const [closedEye, setClosedEye] = useState(true);
  const [titleArrays, setTitleArrays] = useState([
    firstTitles,
    secondTitles,
    thirdTitles,
    fourthTitles,
  ]);

  const titleNumberPair = {};

  for (let i = 0; i < everyTitle.length; i++) {
    titleNumberPair[everyTitle[i]] = Math.ceil((i + 1) / 4);
  }
  const activeOrInactive =
    props.activeCard === "information" ? "active" : "inactive";
  const clickHandler = () => {
    props.onClick();
  };

  const styleFunction = () => {
    return props.activeCard === "information" ? "visible" : "";
  };

  const eyeHandler = (e) => {
    if (closedEye) {
      const name = (
        e.target.childElementCount === 0
          ? e.target.parentNode.parentNode.parentNode.parentNode.previousSibling
              .innerText
          : e.target.parentNode.parentNode.parentNode.previousSibling.innerText
      ).trim();

      const profileObject = props.profiles.filter(
        (profile) => profile["login"] === name
      )[0];
      const newTitleArray = [];
      let counter = 0;
      titleArrays.forEach((titles) => {
        newTitleArray.push(
          titles.map((title) => {
            let fixedTitle = title;
            if (handler.getAPICounterPart(title) === undefined) {
              fixedTitle = everyTitle[counter];
            }
            counter = counter + 1;

            return profileObject[handler.getAPICounterPart(fixedTitle)] ===
              null ||
              profileObject[handler.getAPICounterPart(fixedTitle)] === ""
              ? "N/A"
              : profileObject[handler.getAPICounterPart(fixedTitle)];
          })
        );
      });
      setTitleArrays(newTitleArray);
    } else {
      setTitleArrays([firstTitles, secondTitles, thirdTitles, fourthTitles]);
    }

    setClosedEye(closedEye ? false : true);
  };

  const arrowHandler = () => {
    props.setArrowDirection(props.arrowDirection === "up" ? "left" : "up");
  };

  const miniCardHandler = (title, name) => {
    if (handler.getAPICounterPart(title) !== undefined) {
      const profileObject = props.profiles.filter(
        (profile) => profile["login"] === name
      )[0][handler.getAPICounterPart(title)];

      const titleSection = titleNumberPair[title];
      const originalTitleArrays = [
        firstTitles,
        secondTitles,
        thirdTitles,
        fourthTitles,
      ];
      let chosenTitles = originalTitleArrays[titleSection - 1];
      chosenTitles[chosenTitles.indexOf(title)] =
        profileObject === null || profileObject === "" ? "N/A" : profileObject;
      setTitleArrays([firstTitles, secondTitles, thirdTitles, fourthTitles]);
    }
  };

  return (
    <Card
      status={activeOrInactive}
      onClick={clickHandler}
      onTouchStart={clickHandler}
      child={
        <>
          <div className="contentHeader">
            <button onClick={arrowHandler} className="button">
              {props.arrowDirection === "up" ? (
                <ion-icon name="arrow-up-outline"></ion-icon>
              ) : (
                <ion-icon name="arrow-back-outline"></ion-icon>
              )}
            </button>
            <h3>Information</h3>
            <button onClick={eyeHandler} className="button">
              {closedEye ? (
                <ion-icon name="eye-off-outline"></ion-icon>
              ) : (
                <ion-icon name="eye-outline"></ion-icon>
              )}
            </button>
          </div>
          <div className={`informationContent ${styleFunction()}`}>
            <div className={`slider ${props.arrowDirection}`}>
              {titleArrays.map((titles) => {
                return (
                  <InformationContent
                    key={getKey()}
                    titles={titles}
                    miniCardHandler={miniCardHandler}
                  />
                );
              })}
            </div>
          </div>
        </>
      }
    />
  );
};

export default Information;
