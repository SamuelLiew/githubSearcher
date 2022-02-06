const Card = (props) => {
  return (
    <div className={`Card ${props.status}`} onClick={props.onClick}>
      {props.child}
    </div>
  );
};

export default Card;
