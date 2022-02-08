const ViewAlbum = (props) => {
  const titles = [
    "Name",
    "Company",
    "Repos",
    "Blog",
    "Following",
    "Followers",
    "Email",
  ];
  return (
    <div className="viewAlbum">
      <button></button>
      <div className="albumContent">
        <div className="imageAndText">
          <img
            src="https://avatars.githubusercontent.com/u/1095842?v=4"
            alt="profile"
          ></img>
          <div>take</div>
        </div>
        <div className="firstRow">
          {titles.map((title) => {
            return <div>{title}</div>;
          })}
          {/* <div>Blog:</div> */}
          {/* <div>Name:</div> */}
        </div>
        {/* <div className="secondRow">
          <div>Followers:</div>
          <div>Following:</div>
        </div>
        <div className="thirdRow">
          <div>Repositories:</div>
          <div>Company:</div>
        </div>
        <div className="fourthRow">
          <div>Blog:</div>
          <div>Email:</div>
        </div> */}
      </div>
      <button></button>
    </div>
  );
};

export default ViewAlbum;
