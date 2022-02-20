const ViewList = (props) => {
  const addButtonHandler = (e) => {
    e.preventDefault();
    props.onAddButtonClicked(
      e.target.className === "viewListCardAdd"
        ? e.target.nextSibling.childNodes[1].innerText
        : e.target.parentNode.nextSibling.childNodes[1].innerText
    );
  };

  const viewListContent = () => {
    let followArray, jsxArray;
    [followArray, jsxArray] = props.getContainerAndData();
    followArray.forEach((array, index) => {
      jsxArray.push(
        <div key={index} className="slide viewListSlide">
          {array.map((person, index) => (
            <div key={index} className="viewListCardContainer">
              {props.allProfiles[person["login"]] === undefined && (
                <button className="viewListCardAdd" onClick={addButtonHandler}>
                  <ion-icon name="add-circle" />
                </button>
              )}

              <div className="viewListCard">
                <img src={person["avatar_url"]} alt="profile" />
                <p>{person["login"]}</p>
              </div>
            </div>
          ))}
        </div>
      );
    });
    return props.getExpandedJSX(jsxArray);
  };

  return (
    <div className="viewList">
      <div className={`slider`}>{viewListContent()}</div>
    </div>
  );
};

export default ViewList;
