import React from "react";
import "./ChatRoom.css";
import useChat from "../useChat";

const ChatRoom = () => {
  const { messages, sendMessage } = useChat("Calculator");
  const [newMessage, setNewMessage] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    let result
    try {
      result = eval(newMessage)
      if (isNaN(result)) {
        result = "Invalid input"
      }
    } catch {
      result = "Invalid input"
    }

    const msg = `Calculation: ${newMessage} = ${result}`
    sendMessage(msg);
    setNewMessage("");
  };

  console.log(messages)

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Calculator Chat</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.slice(-10).map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Expression to evaluate..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Calculate
      </button>
    </div>
  );
};

export default ChatRoom;
