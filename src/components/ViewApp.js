const ViewApp = (props) => {
    let key = 0;

    const getKey = () => {
        key = key + 1;
        return key;
    };
    const addButtonHandler = (e) => {
        e.preventDefault();
        if (e.target.className === "viewAppCardAdd") {
            props.onAddButtonClicked(e.target.nextSibling.childNodes[1].innerText)
        } else {
            props.onAddButtonClicked(e.target.parentNode.nextSibling.childNodes[1].innerText)
        }

        // console.log(e.target.parentNode.nextSibling.children[1].innerText)
        // console.log(e.target.parentNode.nextSibling)
        // props.onAddButtonClicked();
    };

    const viewAppContent = () => {
        let jsxArray = [];
        let followArray = [];

        if (props.following === undefined) {
            if (props.followers.length % 100 === 0) {
                for (let i = 0; i < parseInt(props.followers.length / 6); i++) {
                    followArray.push(props.followers.slice(i * 6, i * 6 + 6));
                }
            } else {
                for (let i = 0; i < parseInt(props.followers.length / 6) + 1; i++) {
                    followArray.push(props.followers.slice(i * 6, i * 6 + 6));
                }
            }

        } else {
            if (props.following.length % 100 === 0) {
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
                {/*<div className={'slide'}>*/}

                {/*</div>*/}
                {/*{props.following !== undefined && props.following.map(person => (*/}
                {/*    <div>{person['login']}</div>*/}
                {/*))}*/}
                {/*{props.followers !== undefined && props.followers.map(person => (*/}
                {/*    <div>{person['login']}</div>*/}
                {/*))}*/}
            </div>
        </div>
    )
};

export default ViewApp;
