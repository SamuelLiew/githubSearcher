import Card from "./Card";

const Stars = (props) => {
  const activeOrInactive = props.activeCard === "stars" ? "active" : "inactive";
  return (
    <Card
      status={activeOrInactive}
      onClick={props.onClick}
      child={
        <>
          <div className="contentHeader">
            <h3>Stars</h3>
          </div>
        </>
      }
    />
  );
};

export default Stars;
