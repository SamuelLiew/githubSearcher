import Card from "../Card/Card";

/**
 * Returns JSX for the Information Content.
 * @param props panels, miniCardHandler
 * @returns {JSX.Element}
 */
const InformationContent = (props) => {
    return (
        <div className={`miniCardContainer slide`} id={props.id}>
            {props.titles.map((title, index) => {
                return (
                    <Card
                        key={index}
                        child={<>{title}</>}
                        onClick={e => props.miniCardHandler(e.target.innerText.trim())}
                        onTouchStart={e => props.miniCardHandler(e.target.innerText.trim())}
                        status="miniCard"
                    />
                );
            })}
        </div>
    );
};

export default InformationContent;
