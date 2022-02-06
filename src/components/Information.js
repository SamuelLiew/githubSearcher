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
  const [arrowDirection, setArrowDirection] = useState("up");
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
      const name =
        e.target.childElementCount === 0
          ? e.target.parentNode.parentNode.parentNode.parentNode.previousSibling
              .innerText
          : e.target.parentNode.parentNode.parentNode.previousSibling.innerText;
      console.log(name);
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
    setArrowDirection(arrowDirection === "up" ? "left" : "up");
  };

  const miniCardHandler = (title, name) => {
    console.log(name);

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
      console.log(chosenTitles);
      chosenTitles[chosenTitles.indexOf(title)] =
        profileObject === null || profileObject === "" ? "N/A" : profileObject;
      setTitleArrays([firstTitles, secondTitles, thirdTitles, fourthTitles]);
      console.log(titleArrays);
    }
  };

  // Failed To Implement Horizontal Scrolling... Ask the user to press shift while scrolling or
  // click on the mouse wheel.
  // const wheelHandler = (e) => {
  //   // console.log(e);
  //   e.preventDefault();
  //   if (arrowDirection === "left") {
  //     const container = document.querySelector(".left");
  //     const containerScrollPosition = container.scrollLeft;
  //     const miniCardScroll = document.querySelector(".miniCard");
  //     console.log(miniCardScroll);
  //     miniCardScroll.scrollTo({
  //       left: miniCardScroll.scrollLeft + e.deltaY,
  //     });
  //   }
  // };

  return (
    <Card
      status={activeOrInactive}
      onClick={clickHandler}
      onTouchStart={clickHandler}
      child={
        <>
          <div className="contentHeader">
            <button onClick={arrowHandler} className="button">
              {arrowDirection === "up" ? (
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
            <div className={`slider ${arrowDirection}`}>
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
