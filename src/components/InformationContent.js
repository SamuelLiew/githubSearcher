import Card from "./Card";

const InformationContent = (props) => {
  let key = 0;

  const getKey = () => {
    key = key + 1;
    return key;
  };
  const miniCardHandler = (e) => {
    props.miniCardHandler(e.target.innerText.trim());
  };
  return (
    <div className={`miniCardContainer slide`} id={props.id}>
      {props.titles.map((title) => {
        return (
          <Card
            key={getKey()}
            child={<>{title}</>}
            onClick={miniCardHandler}
            onTouchStart={miniCardHandler}
            status="miniCard"
          />
        );
      })}
    </div>
  );
};

export default InformationContent;
