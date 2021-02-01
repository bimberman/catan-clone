import React from "react";
import { Link } from "react-router-dom";


const Room = (props) => {
  const [roomName, setRoomName] = React.useState("");
  const [username, setUsername] = React.useState("");

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        className="text-input-field"
      />
      <Link
        to={`/${roomName}`}
        onClick={sendInfo}
        className="enter-room-button">
        Join room
      </Link>
    </div>
  );
};

const handleUsernameChange = (event) => {
  setUsername(event.target.value);
};

const handleRoomNameChange = (event) => {
  setRoomName(event.target.value);
};

const sendInfo = () => {
  props.setRoomId(roomName);
  props.setUsername(username);
}

export default Room;
