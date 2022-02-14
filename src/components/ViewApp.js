const ViewApp = (props) => {
    let key = 0;

    const getKey = () => {
        key = key + 1;
        return key;
    };
    const addButtonHandler = (e) => {
        e.preventDefault();
        props.onAddButtonClicked(e.target.className === "viewAppCardAdd"
            ? e.target.nextSibling.childNodes[1].innerText
            : e.target.parentNode.nextSibling.childNodes[1].innerText);
    };

    const viewAppContent = () => {
        let jsxArray = [];
        let followArray = [];

        if (props.following === undefined) {
            for (let i = 0; i < Math.ceil(props.followers.length / 6); i++) {
                followArray.push(props.followers.slice(i * 6, i * 6 + 6));
            }
        } else {
            for (let i = 0; i < Math.ceil(props.following.length / 6); i++) {
                followArray.push(props.following.slice(i * 6, i * 6 + 6));
            }
        }
        followArray.forEach((array) => {
            jsxArray.push(
                <div key={getKey()} className="slide viewAppSlide">
                    {array.map(person => (
                        <div key={getKey()} className="viewAppCardContainer">
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
        return (
            <>
                {jsxArray.map((jsx) => jsx)}
            </>
        )
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
