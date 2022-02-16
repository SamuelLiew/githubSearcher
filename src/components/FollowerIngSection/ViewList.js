const ViewList = (props) => {
    let key = 0;

    const getKey = () => {
        key = key + 1;
        return key;
    };
    const addButtonHandler = (e) => {
        e.preventDefault();
        // console.log(e.target)
        if (e.target.className === "viewListCardAdd") {
            props.onAddButtonClicked(e.target.nextSibling.childNodes[1].innerText)
        } else {
            props.onAddButtonClicked(e.target.parentNode.nextSibling.childNodes[1].innerText)
        }
    };

    const viewListContent = () => {
        let jsxArray = [];
        let followArray = [];

        if (props.following === undefined) {
            if (props.followers.length % 6 === 0) {
                for (let i = 0; i < parseInt(props.followers.length / 6); i++) {
                    followArray.push(props.followers.slice(i * 6, i * 6 + 6));
                }
            } else {
                for (let i = 0; i < parseInt(props.followers.length / 6) + 1; i++) {
                    followArray.push(props.followers.slice(i * 6, i * 6 + 6));
                }
            }

        } else {
            if (props.following.length % 6 === 0) {
                for (let i = 0; i < parseInt(props.following.length / 6); i++) {
                    followArray.push(props.following.slice(i * 6, i * 6 + 6));
                }
            } else {
                for (let i = 0; i < parseInt(props.following.length / 6) + 1; i++) {
                    followArray.push(props.following.slice(i * 6, i * 6 + 6));
                }
            }
        }
        followArray.forEach((array) => {
            jsxArray.push(
                <div key={getKey()} className="slide viewListSlide">
                    {array.map(person => (
                        <div key={getKey()} className="viewListCardContainer">
                            {props.allProfiles[person['login']] === undefined && (
                                <button className="viewListCardAdd" onClick={addButtonHandler}>
                                    <ion-icon name="add-circle"/>
                                </button>
                            )}

                            <div className="viewListCard">
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
        <div className="viewList">
            <div className={`slider`}>
                {viewListContent()}
            </div>
        </div>
    )
};

export default ViewList;
