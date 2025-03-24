import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import StyledBox from './StyledBox.jsx';

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (userMessage, aiMessage) => {
    setMessages([...messages, { user: userMessage, ai: aiMessage }]);
  };

  return (
    <>
      <StyledBox>
        <ChatboxForm onNewMessage={handleNewMessage} />
      </StyledBox>

      <div>
        <h3>Chat History</h3>
        {messages.map((msg, index) => (
          <div key={index}>
            <p><strong>User:</strong> {msg.user}</p>
            <p><strong>AI:</strong> {msg.ai}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;

