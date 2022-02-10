import {useState} from "react";
import List from "./components/List";
import Form from "./components/Form";
import "./App.css";

const App = () => {
    const [data, setData] = useState({});

    const addHandler = (profileObject) => {
        let newData = {};
        newData[profileObject["login"]] = {
            Information: profileObject,
            Following: [],
            Followers: [],
            Repositories: [],
            Stars: [],
        };
        setData({...data, ...newData});
    };

    const deleteHandler = (elementName) => {
        let placeholder = data;
        delete placeholder[elementName];
        setData({...placeholder});
    };

    const updateProfile = (dataArray) => {
        console.log(data)
        const [loginName, titleToBeUpdated, theData] = dataArray;

        setData(prevState => ({
                ...prevState,
                [loginName]: {
                    ...prevState[loginName],
                    [titleToBeUpdated]: [...theData]
                }
            }
        ))
        // let updatedData = {...data};
        // updatedData[loginName][titleToBeUpdated] = theData;
        // setData({...updatedData});
    };

    return (
        <div className="bodySlider">
            <div className="bodySlide header">
                <h1 className="title">Welcome!</h1>
                <Form data={data} onSubmit={addHandler}/>
            </div>

            <List
                profiles={data}
                deleteHandler={deleteHandler}
                updateProfile={updateProfile}
                onAdd={addHandler}
            />
        </div>
    );
};

export default App;
