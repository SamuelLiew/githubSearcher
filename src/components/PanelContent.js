import Followers from "./Followers";
import Followings from "./Followings";
import Information from "./Information";
import Repositories from "./Repositories";
import Stars from "./Stars";

const clickHandler = (e) => {
  e.stopPropagation();
};

const PanelContent = (props) => {
  const style = props.isContentExpanded === true ? "" : "collapsed";
  return (
    <div className={`contentContainer ${style}`} onClick={clickHandler}>
      <Information />
      <Followers />
      <Followings />
      <Repositories />
      <Stars />
    </div>
  );
};

export default PanelContent;
