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
  const secondTitles = ["Email", "Followers", "Gists", "Github"];
  const thirdTitles = ["Twitter", "Type", "Updated"];
  const [closedEye, setClosedEye] = useState(true);
  const [titleArrays, setTitleArrays] = useState([
    firstTitles,
    secondTitles,
    thirdTitles,
  ]);

  const titleNumberPair = {};
  firstTitles.forEach((title) => {
    titleNumberPair[title] = 1;
  });
  secondTitles.forEach((title) => {
    titleNumberPair[title] = 2;
  });
  thirdTitles.forEach((title) => {
    titleNumberPair[title] = 3;
  });
  const activeOrInactive =
    props.activeCard === "information" ? "active" : "inactive";
  const clickHandler = () => {
    props.onClick();
  };

  const styleFunction = () => {
    return props.activeCard === "information" ? "visible" : "";
  };

  const eyeHandler = (e) => {
    if (!closedEye) {
      const name =
        e.target.parentNode.parentNode.parentNode.parentNode.previousSibling
          .innerText;
      const profileObject = props.profiles.filter(
        (profile) => profile["login"] === name
      )[0];

      const newFirstTitles = firstTitles.map((title) =>
        profileObject[handler.getAPICounterPart(title)] === null ||
        profileObject[handler.getAPICounterPart(title)] === ""
          ? "N/A"
          : profileObject[handler.getAPICounterPart(title)]
      );
      const newSecondTitles = secondTitles.map((title) =>
        profileObject[handler.getAPICounterPart(title)] === null ||
        profileObject[handler.getAPICounterPart(title)] === ""
          ? "N/A"
          : profileObject[handler.getAPICounterPart(title)]
      );
      const newThirdTitles = thirdTitles.map((title) =>
        profileObject[handler.getAPICounterPart(title)] === null ||
        profileObject[handler.getAPICounterPart(title)] === ""
          ? "N/A"
          : profileObject[handler.getAPICounterPart(title)]
      );
      setTitleArrays([newFirstTitles, newSecondTitles, newThirdTitles]);
    } else {
      setTitleArrays([firstTitles, secondTitles, thirdTitles]);
    }

    setClosedEye(closedEye ? false : true);

    // if (closedEye)
    console.log();
  };

  const miniCardHandler = (title, name) => {
    if (handler.getAPICounterPart(title) !== undefined) {
      const profileObject = props.profiles.filter(
        (profile) => profile["login"] === name
      )[0][handler.getAPICounterPart(title)];

      const titleSection = titleNumberPair[title];

      switch (titleSection) {
        case 1:
          firstTitles[firstTitles.indexOf(title)] =
            profileObject === null || profileObject === ""
              ? "N/A"
              : profileObject;
          break;
        case 2:
          secondTitles[secondTitles.indexOf(title)] =
            profileObject === null || profileObject === ""
              ? "N/A"
              : profileObject;
          break;
        case 3:
          thirdTitles[thirdTitles.indexOf(title)] =
            profileObject === null || profileObject === ""
              ? "N/A"
              : profileObject;
          break;
        default:
          break;
      }
      setTitleArrays([firstTitles, secondTitles, thirdTitles]);
    }
  };

  return (
    <Card
      status={activeOrInactive}
      onClick={clickHandler}
      child={
        <>
          <div className="contentHeader">
            <h3>Information</h3>
            <button onClick={eyeHandler}>
              {closedEye ? (
                <ion-icon name="eye-outline"></ion-icon>
              ) : (
                <ion-icon name="eye-off-outline"></ion-icon>
              )}
            </button>
          </div>
          <div className={`informationContent ${styleFunction()}`}>
            <div className="slider">
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
