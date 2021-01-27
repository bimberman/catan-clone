// Chat inspired by code from Jakub Kozak: https://github.com/pixochi/socket.io-react-hooks-chat

import React from "react";
import useChat from "./useChat";

const Chat = (props) => {
  const { roomId, username } = props; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId, username); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header-block">
        <h1 className="room-name">Room: {roomId}</h1>
        <h1 className="user-name">User: {username}</h1>
      </div>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}>
              <h4 className="message-header username">
                {message.username}
              </h4>
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default Chat;
