import { useState } from "react";
import List from "./components/Panels/List";
import Form from "./components/Form/Form";
import "./App.css";

const App = () => {
  const [data, setData] = useState({});
  const [darkMode, setDarkMode] = useState(true);

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
      setData({ ...newData, ...data });
    } else {
      let answer = {};
      for (let i in data) {
        answer[i] = data[i];
        if (i === caller) {
          answer[profileObject["login"]] = newData[profileObject["login"]];
        }
      }
      setData({ ...answer });
    }
  };

  const deleteHandler = (elementName) => {
    let placeholder = data;
    delete placeholder[elementName];
    setData({ ...placeholder });
  };

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
  };

  return (
    <div className={`bodyClass ${darkMode === true ? "dark" : ""}`}>
      <div className={`bodySlider`}>
        <div className="bodySlide header">
          {darkMode === true ? (
            <button
              onClick={() => setDarkMode(false)}
              className={"darkModeButton"}
            >
              <ion-icon name="bulb-outline" />
            </button>
          ) : (
            <button
              onClick={() => setDarkMode(true)}
              className={"darkModeButton"}
            >
              <ion-icon name="bulb-outline" />
            </button>
          )}
          <h1 className="title">Welcome!</h1>
          <Form data={data} onSubmit={addHandler} />
        </div>

        <List
          profiles={data}
          deleteHandler={deleteHandler}
          updateProfile={updateProfile}
          onAdd={addHandler}
        />
      </div>
    </div>
  );
};

export default App;
