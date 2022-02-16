import {useState} from "react";
import APIHandler from "../../Server/APIHandler";

const Form = (props) => {
    const [userName, setUserName] = useState("");
    const handler = new APIHandler();

    const submitHandler = async (e) => {
        e.preventDefault();
        handler.addHandler(props.data, props.onSubmit, userName);
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
