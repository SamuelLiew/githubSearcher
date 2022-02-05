import Card from "./Card";

const Repositories = (props) => {
  const activeOrInactive =
    props.activeCard === "repositories" ? "active" : "inactive";
  return (
    <Card
      status={activeOrInactive}
      onClick={props.onClick}
      child={
        <>
          <div className="contentHeader">
            <h3>Repositories</h3>
          </div>
        </>
      }
    />
  );
};

export default Repositories;
