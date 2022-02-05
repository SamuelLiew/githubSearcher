import Card from "./Card";

const Followings = (props) => {
  const activeOrInactive =
    props.activeCard === "followings" ? "active" : "inactive";
  return (
    <Card
      status={activeOrInactive}
      onClick={props.onClick}
      child={
        <>
          <div className="contentHeader">
            <h3>Followings</h3>
          </div>
        </>
      }
    />
  );
};

export default Followings;
