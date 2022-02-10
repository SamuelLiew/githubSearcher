import {useState} from "react";
import APIHandler from "../APIHandler";

const Form = (props) => {
    const [userName, setUserName] = useState("");
    const handler = new APIHandler();

    const submitHandler = async (e) => {
        e.preventDefault();
        let alreadyExists = false;

        handler.addHandler(props.data, props.onSubmit, userName, alreadyExists);
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
            />
            <button>Submit</button>
        </form>
    );
};

export default Form;
