/**
 * Returns the Album View Option Content.
 * Child Component of the FollowerIngContent Component.
 * @param props prevHandler, loadHandler, filteredArray
 * @returns {JSX.Element}
 */
const ViewAlbum = (props) => {
    return (
        <div className="viewAlbum">
            {props.filteredArray[0] === undefined
                ? <h3>Such Empty... or Not?</h3>
                : <>
                    <button onClick={props.prevHandler}>
                        <ion-icon name="close-circle-outline"/>
                    </button>
                    <div className="albumContent">
                        <img src={props.filteredArray[0]["avatar_url"]} alt={"Profile"}/>
                        <p>{props.filteredArray[0]["login"]}</p>
                    </div>
                    <button onClick={props.loadHandler}>
                        <ion-icon name="add-circle-outline"/>
                    </button>
                </>
            }
        </div>
    );
};

export default ViewAlbum;
