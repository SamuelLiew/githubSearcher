const Card = (props) => {
  return <div className={`Card ${props.status}`}>{props.child}</div>;
};

export default Card;
