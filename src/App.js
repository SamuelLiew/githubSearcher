import { useState } from "react";
import ProfilesList from "./components/ProfilesList";
import Form from "./components/Form";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(false);

  const showFollowersHandler = (e) => {
    if (data.length !== 0) {
      setDisplay(true);
    } else {
      console.log("Please Add a Person First");
    }
  };

  const submitHandler = (profilesObject) => {
    setData([profilesObject, ...data]);
  };

  const deleteHandler = (elementName) => {
    setData(
      data.filter((i) => {
        return i["login"] !== elementName;
      })
    );
  };

  const updateProfile = (updatedObject) => {
    const objectToChange = data.filter((i) => {
      return i["login"] === updatedObject["login"];
    });
    const updatedData = data;
    updatedData[data.indexOf(objectToChange)] = updatedObject;

    setData(updatedData);
  };
  return (
    <div className="container">
      <h1 className="title">Welcome!</h1>
      <Form data={data} onSubmit={submitHandler}></Form>
      <ProfilesList
        profiles={data}
        deleteHandler={deleteHandler}
        updateProfile={updateProfile}
      />
      {/* <button onClick={showFollowersHandler}>List the Followers</button> */}
      {/* {display && <ProfilesList profile={data[0]["followers_url"]} />} */}
    </div>
  );
};

export default App;
