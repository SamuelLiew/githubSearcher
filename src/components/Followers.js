import Card from "./Card";

const Followers = (props) => {
  const activeOrInactive =
    props.activeCard === "followers" ? "active" : "inactive";

  // const handler = new APIHandler();

  // const targetHandler = async (target) => {
  //   const targetObject = props.profiles.filter((i) => {
  //     return i["login"] === target;
  //   })[0];
  //   if (targetObject["followers_url"].length > 30) {
  //     const updatedObject = await handler.getUpdatedObject(targetObject);
  //     props.updateProfile(updatedObject);
  //   }
  // };
  return (
    <Card
      status={activeOrInactive}
      onClick={props.onClick}
      child={
        <>
          <div className="contentHeader">
            <h3>Followers</h3>
          </div>
        </>
      }
    />
  );
};

export default Followers;
