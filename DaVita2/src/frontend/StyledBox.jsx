import React, { useState } from "react";
import { Box, xcss } from "@forge/react";
import ChatboxForm from "./ChatboxForm.jsx";
import DialogueBox from "./DialogueBox.jsx";
import UserDialogueBox from "./UserInputDialogueBox.jsx";
import { fetchChatResponse } from "./api.js";

const cardStyle = xcss({
  padding: "space.150",
  width: "100%",
  height: "300%",
});

function StyledBox() {
  const [conversation, setConversation] = useState([]); // store both user and AI messages inside an array so that we can have a chat history

  const handleUserMessage = async (message) => {
    const newConversation = [...conversation, { sender: 'user', message }];
    setConversation(newConversation); 

    try {
      const response = await fetchChatResponse(message); 
      setConversation([...newConversation, { sender: 'ai', message: response }]); 
    } catch (error) {
      setConversation([...newConversation, { sender: 'ai', message: `Error fetching AI response: ${error.message}` }]);
    }
  };

  const handleReset = () => {
    setConversation([]);
  };

  return (
    <Box xcss={cardStyle}>
      {conversation.map((entry, index) => 
        entry.sender === 'user' ? (
          <UserDialogueBox key={index} message={entry.message} />
        ) : (
          <DialogueBox key={index} aiResponse={entry.message} />
        )
      )}
      <ChatboxForm handleUserMessage={handleUserMessage} handleReset={handleReset} />
    </Box>
  );
}

export default StyledBox;


