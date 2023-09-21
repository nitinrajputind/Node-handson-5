import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";


// const socket = io("http://localhost:4000/")
const socket = io("https://node-handson-5-xyk0.onrender.com/");

const userName = prompt("Enter your name");

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    socket.on("SENDBROADCAST", (data) => {
      setMessages([...messages, { text: data.message, sender: "server", username: data.userName }]);
    });
  }, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    socket.emit("BROADCAST", { message: inputText, userName: userName });
    setInputText(""); // Clear input field
  };

  return (
    <>
      <h2 style={{textAlign:'center'}}>{userName}</h2>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <h4> {message.username}</h4>
              {message.text}
            </div>
          ))}
        </div>

        <form className="message-input">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button type="submit" onClick={handleBroadcast}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatApp;
