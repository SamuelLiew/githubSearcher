import { useState } from "react";
import axios from "axios";

const Form = (props) => {
  const [userName, setUserName] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    let alreadyExists = false;
    try {
      const resp = await axios.get(`https://api.github.com/users/${userName}`);
      for (let i of props.data) {
        if (alreadyExists) {
          break;
        }
        i["login"] === resp["data"]["login"]
          ? (alreadyExists = true)
          : (alreadyExists = false);
      }

      if (!alreadyExists) {
        props.onSubmit(resp["data"]);
      }
    } catch (err) {
      console.log("Name Doesn't Exist");
    }

    setUserName("");
  };

  return (
    <form onSubmit={submitHandler} className="userNameForm">
      <input
        required
        className="userNameInput"
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      ></input>
      <button>Submit</button>
    </form>
  );
};

export default Form;
