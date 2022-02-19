const ViewApp = (props) => {
    const addButtonHandler = (e) => {
        e.preventDefault();
        props.onAddButtonClicked(e.target.className === "viewAppCardAdd"
            ? e.target.nextSibling.childNodes[1].innerText
            : e.target.parentNode.nextSibling.childNodes[1].innerText);
    };

    const viewAppContent = () => {
        let followArray, jsxArray;
        [followArray, jsxArray] = props.getContainerAndData();
        followArray.forEach((array, index) => {
            jsxArray.push(
                <div key={index} className="slide viewAppSlide">
                    {array.map((person, index) => (
                        <div key={index} className="viewAppCardContainer">
                            {props.allProfiles[person['login']] === undefined && (
                                <button className="viewAppCardAdd" onClick={addButtonHandler}>
                                    <ion-icon name="add-circle"/>
                                </button>
                            )}
                            <div className="viewAppCard">
                                <img src={person['avatar_url']} alt="profile"/>
                                <div>
                                    {person['login']}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        })
        return props.getExpandedJSX(jsxArray);
    }

    return (
        <div className="viewApp">
            <div className={`slider`}>
                {viewAppContent()}
            </div>
        </div>
    )
};

export default ViewApp;
