const ViewAlbum = (props) => {
    const subHandler = () => {
        if (props.filteredArray[0] !== undefined) {
            props.onSubButtonClicked(props.filteredArray[0]['login']);
            const together = {...props.subtractedProfiles, ...props.allProfiles, ...{[props.filteredArray[0]['login']]: true}}
            props.setFilteredArray(props.filteredArray.filter(itemObject => {
                return (together[itemObject['login']] === undefined);
            }))
        }
        fetchData();
    };

    const addHandler = () => {
        if (props.filteredArray[0] !== undefined) {
            props.onAddButtonClicked(props.filteredArray[0]['login']);
            const together = {...props.subtractedProfiles, ...props.allProfiles, ...{[props.filteredArray[0]['login']]: true}}
            props.setFilteredArray(props.filteredArray.filter(itemObject => {
                return (together[itemObject['login']] === undefined);
            }))
        }
        fetchData();

    };
    const fetchData = async () => {
        if ((props.filteredArray.length === 90 && props.profile[props.title].length % 100 === 0)
            && props.profile["Information"][props.title.toLowerCase()] > props.profile[props.title].length) {
            const data = await props.callAPI();
            props.setFilteredArray([...props.filteredArray, ...data])
        }
    }

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
            <button onClick={subHandler}>
                <ion-icon name="close-circle-outline"/>
            </button>
            <div className="albumContent">
                <img src={imageHandler()} alt={'No More!'}/>
                <div>{divHandler()}</div>
            </div>
            <button onClick={addHandler}>
                <ion-icon name="add-circle-outline"/>
            </button>
        </div>
    );
};

export default ViewAlbum;
