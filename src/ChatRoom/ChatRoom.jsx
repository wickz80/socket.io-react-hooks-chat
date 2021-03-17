import React from "react";
import "./ChatRoom.css";
import useChat from "../useChat";

const ChatRoom = () => {
  const { messages, sendMessage } = useChat("Calculator");
  const [newMessage, setNewMessage] = React.useState("");
  const [isValidInput, setIsValidInput] = React.useState(false)
  
  // Sanitize inputs
  const re = new RegExp(/^[-+/*\d+\.]+/gm)
  
  const handleNewMessageChange = (event) => {
    if (re.test(event.target.value)) {
      setIsValidInput(true)
    } else {
      setIsValidInput(false)
    }
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    let sanitizedMessage = "Invalid input"
    try {
      
      if (re.test(newMessage)) {
        sanitizedMessage = eval(newMessage)
      }
      
      if (isNaN(sanitizedMessage)) {
        sanitizedMessage = "Invalid input"
      }
    } catch {}

    if (isNaN(sanitizedMessage)) {
      sanitizedMessage = "Invalid input"
    }

    const msg = `Calculation: ${newMessage} = ${sanitizedMessage}`
    sendMessage(msg);
    setNewMessage("");
  };

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
        placeholder="Expression to evaluate...   1+(2*3)"
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button" 
      disabled={!isValidInput} 
      style={{
        background: !isValidInput ? "gray" : undefined
      }}
      >
        Calculate
      </button>
    </div>
  );
};

export default ChatRoom;
