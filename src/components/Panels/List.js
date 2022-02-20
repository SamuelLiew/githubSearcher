import Panel from "./Panel";

const List = (props) => {
  return (
    <>
      {Object.keys(props.profiles).map((name) => (
        <Panel
          key={name}
          profile={props.profiles[name]}
          allProfiles={props.profiles}
          onAdd={props.onAdd}
          updateProfile={(dataArray) => props.updateProfile(dataArray)}
          deleteHandler={(name) => props.deleteHandler(name)}
        />
      ))}
    </>
  );
};

export default List;
