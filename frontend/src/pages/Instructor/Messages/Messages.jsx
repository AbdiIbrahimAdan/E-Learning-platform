import { useState, useEffect } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/api/instructor/messages")
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map(msg => (
          <li key={msg._id}>
            {msg.sender}: {msg.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
