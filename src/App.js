import {createContext, useEffect, useState} from "react";
import List from "./components/Panels/List";
import Form from "./components/Form/Form";
import "./App.css";
import APIHandler from "./Server/APIHandler";

/**
 * Used to store the updateProfile function
 * @type {React.Context<null>}
 */
export const UpdateProfile = createContext(null)

/**
 * The GitHub Searcher searches for the inputted username
 * using the GitHub API. Which, in a User Friendly way,
 * shows the data retrieved.
 *
 * @author Woon Liew <hengliew4@gmail.com>
 * @returns {JSX.Element}
 */
const App = () => {
    /**
     * FUTURE IMPROVEMENTS:
     * Integrate OAuth.
     * Make use of session storage.
     * Remove unnecessary variables.
     * Set up a Settings area for users' preference.
     */

    const [data, setData] = useState({});
    const [darkMode, setDarkMode] = useState(true);
    const [rateLimit, setRateLimit] = useState(0);
    const handler = new APIHandler();

    /**
     * Gets the rateLimit
     * @returns {Promise<void>}
     */
    const fetchData = async () => {
        const data = await handler.getRateLimit()
        setRateLimit(data);
    }

    /**
     * Used to update the rateLimit on first start.
     */
    useEffect(() => {
        fetchData();
    })
    /**
     * Decides what happens when a user is requested to be added.
     * @param profileObject
     * @param caller
     */
    const addHandler = (profileObject, caller) => {
        let newData = {};
        newData[profileObject["login"]] = {
            Information: profileObject,
            Following: [],
            Followers: [],
            Repositories: [],
            Stars: [],
        };

        if (caller === undefined) {
            setData({...newData, ...data});
        } else {
            let answer = {};
            for (let i in data) {
                answer[i] = data[i];
                if (i === caller) {
                    answer[profileObject["login"]] = newData[profileObject["login"]];
                }
            }
            setData({...answer});
        }
        fetchData();

    };
    /**
     * Deletes the selected Element
     * @param elementName
     */
    const deleteHandler = (elementName) => {
        let placeholder = data;
        delete placeholder[elementName];
        setData({...placeholder});
    };

    /**
     * Updates the data with new data.
     * @param dataArray
     */
    const updateProfile = (dataArray) => {
        const [loginName, titleToBeUpdated, theData] = dataArray;

        setData((prevState) => ({
            ...prevState,
            [loginName]: {
                ...prevState[loginName],
                [titleToBeUpdated]: [
                    ...prevState[loginName][titleToBeUpdated],
                    ...theData,
                ],
            },
        }));
        fetchData();
    };

    return (
        <div className={`bodySlider ${darkMode === true ? "dark" : ""}`}>
            <div className="bodySlide header">
                <span className={'titleButtonContainer'}>
                    <div className={'rateLimit'}>{rateLimit}</div>
                    <h1 className="title">Welcome!</h1>
                    {darkMode === true ? (
                        <button
                            onClick={() => setDarkMode(false)}
                            className={"darkModeButton"}
                        >
                            <ion-icon name="bulb-outline"/>
                        </button>
                    ) : (
                        <button
                            onClick={() => setDarkMode(true)}
                            className={"darkModeButton"}
                        >
                            <ion-icon name="bulb-outline"/>
                        </button>
                    )}
                </span>
                <Form data={data} onSubmit={addHandler}/>
            </div>
            {Object.keys(data).length === 0
                ? <span className={'introductionSection'}>
                    <h3>Such Emptiness...</h3>
                    <p>Learn more about a GitHub user by typing the
                        username in the search bar.</p>
                    <p>On Laptop: Shift + Scroll to move Horizontally.</p>
                    <p>For Now, the limit is 60 requests. Use them sparingly.
                        The Remainder is tracked in the counter to the left of the Title.
                        The rate limit will effectively be negligible once I implement
                        Oauth in the future.</p>
                </span> :

                <UpdateProfile.Provider value={updateProfile}>
                    <List
                        profiles={data}
                        deleteHandler={deleteHandler}
                        onAdd={addHandler}
                    />
                </UpdateProfile.Provider>
            }
        </div>
    );
};

export default App;
