import Card from "../Card/Card";
import InformationContent from "./InformationContent";
import APIHandler from "../../Server/APIHandler";
import {useState} from "react";

/**
 * Returns JSX for the Information Section.
 * @param props profile, onClick, activeCard
 * @returns {JSX.Element}
 */
const Information = (props) => {
    const handler = new APIHandler();
    const firstTitles = ["Bio", "Blog", "Company", "Created"];
    const secondTitles = ["Email", "Followers", "Following", "Gists"];
    const thirdTitles = ["Github", "Hireable", "Location", "Name"];
    const fourthTitles = ["Repos", "Twitter", "Type", "Updated"];
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

    /**
     * Handles what happens when the user clicks on the eye button.
     */
    const eyeHandler = () => {
        if (closedEye) {
            const profileObject = props.profile;
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
                            ? `${fixedTitle}: N/A`
                            : `${fixedTitle}: ${
                                profileObject[handler.getAPICounterPart(fixedTitle)]
                            }`;
                    })
                );
            });
            setTitleArrays(newTitleArray);
        } else {
            setTitleArrays([firstTitles, secondTitles, thirdTitles, fourthTitles]);
        }

        setClosedEye(!closedEye);
    };

    /**
     * Handles what happens when the user clicks a mini card.
     * @param title
     */
    const miniCardHandler = (title) => {
        if (handler.getAPICounterPart(title) !== undefined) {
            const clickedMinicardValue =
                props.profile[handler.getAPICounterPart(title)];

            const titleSection = titleNumberPair[title];
            const originalTitleArrays = [
                firstTitles,
                secondTitles,
                thirdTitles,
                fourthTitles,
            ];
            //chosenTitles is just to speed up the search using hash map.
            let chosenTitles = originalTitleArrays[titleSection - 1];
            chosenTitles[chosenTitles.indexOf(title)] =
                clickedMinicardValue === null || clickedMinicardValue === ""
                    ? "N/A"
                    : `${clickedMinicardValue}`;
            setTitleArrays([firstTitles, secondTitles, thirdTitles, fourthTitles]);
        }
    };

    return (
        <Card
            status={activeOrInactive}
            onClick={props.onClick}
            child={
                <>
                    <div className="contentHeader">
                        <button className="button"/>
                        <h3>Information</h3>
                        <button onClick={eyeHandler} className="button">
                            {closedEye ? (
                                <ion-icon name="eye-off-outline"/>
                            ) : (
                                <ion-icon name="eye-outline"/>
                            )}
                        </button>
                    </div>
                    <div className="informationContent">
                        <div className={`slider`}>
                            {titleArrays.map((titles, index) => {
                                return (
                                    <InformationContent
                                        key={index}
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
