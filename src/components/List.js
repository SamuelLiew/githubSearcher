import Panel from "./Panel";
const List = (props) => {
  const deleteHandler = (elementName) => {
    props.deleteHandler(elementName);
  };
  const updateProfile = (updatedObject) => {
    props.updateProfile(updatedObject);
  };
  return (
    <>
      {props.profiles.map((profile) => (
        <Panel
          key={profile["id"]}
          imageURL={profile["avatar_url"]}
          userName={profile["login"]}
          profiles={props.profiles}
          updateProfile={updateProfile}
          deleteHandler={deleteHandler}
        />
      ))}
    </>
  );
};

export default List;
