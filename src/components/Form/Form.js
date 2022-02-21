import {useState} from "react";
import APIHandler from "../../Server/APIHandler";

/**
 * The Form used to handle user inputs
 * @param props data, onSubmit
 * @returns {JSX.Element}
 */
const Form = (props) => {
    const [userName, setUserName] = useState("");
    const handler = new APIHandler();

    /**
     * Handles what happens when the user clicks on submit button.
     * @param e
     * @returns {Promise<void>}
     */
    const submitHandler = async (e) => {
        e.preventDefault();
        await handler.addHandler(props.data, props.onSubmit, userName);
        setUserName("");
    };

    return (
        <form onSubmit={submitHandler} className="userNameForm">
            <input
                onTouchMove={e => e.preventDefault()}
                required
                className="userNameInput"
                type="text"
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
