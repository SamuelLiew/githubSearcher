/**
 * Returns JSX that wraps around other elements/components.
 * @param props status, onClick, onTouchStart, child
 * @returns {JSX.Element}
 */
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
