const Card = (props) => {
  return (
    <div
      className={`Card ${props.status}`}
      onClick={props.onClick}
      onTouchStart={props.onTouchStart}
    >
      {props.child}
    </div>
  );
};

export default Card;
