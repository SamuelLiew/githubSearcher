import ViewAlbum from "./ViewAlbum";
import ViewApp from "./ViewApp";
import ViewList from "./ViewList";

const FollowingContent = (props) => {
  return (
    <>
      {props.viewChoice === 1 ? (
        <ViewAlbum />
      ) : props.viewChoice === 2 ? (
        <ViewApp />
      ) : (
        <ViewList />
      )}
    </>
    // <viewAlbum />
  );
};

export default FollowingContent;
