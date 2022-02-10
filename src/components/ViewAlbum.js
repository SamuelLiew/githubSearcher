const ViewAlbum = (props) => {
    const subHandler = () => {
        if (props.filteredArray[0] !== undefined) {
            props.onSubButtonClicked(props.filteredArray[0]['login']);
            const together = {...props.subtractedProfiles, ...props.allProfiles, ...{[props.filteredArray[0]['login']]: true}}
            props.setFilteredArray(props.filteredArray.filter(itemObject => {
                return (together[itemObject['login']] === undefined);
            }))
        }

    };

    const addHandler = () => {
        if (props.filteredArray[0] !== undefined) {
            props.onAddButtonClicked(props.filteredArray[0]['login']);
            const together = {...props.subtractedProfiles, ...props.allProfiles, ...{[props.filteredArray[0]['login']]: true}}
            props.setFilteredArray(props.filteredArray.filter(itemObject => {
                return (together[itemObject['login']] === undefined);
            }))
        }

    };

    const imageHandler = () => {
        if (props.filteredArray[0] !== undefined) {
            return props.filteredArray[0]['avatar_url']
        }
    }

    const divHandler = () => {
        if (props.filteredArray[0] !== undefined) {
            return props.filteredArray[0]['login']
        }
    }
    return (
        <div className="viewAlbum">
            <button onClick={subHandler}>-</button>
            <div className="albumContent">
                <img src={imageHandler()} alt={'No More!'}/>
                <div>{divHandler()}</div>
            </div>
            <button onClick={addHandler}>+</button>
        </div>
    );
};

export default ViewAlbum;
