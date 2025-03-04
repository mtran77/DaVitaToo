import React, {useState} from "react"
import { Box, xcss } from "@forge/react";
import ChatboxForm from "./ChatboxForm.jsx";
import DialogueBox from "./DialogueBox.jsx"
import UserDialogueBox from "./UserInputDialogueBox.jsx";

// calling OpenAI function from openaiclient.js
import {fetchChatResponse} from "./api.js"

// Styles
const cardStyle = xcss({
  backgroundColor: "color.background.neutral.bold.pressed",
  padding: "space.150",
  borderColor: "color.border.focused",
  borderWidth: "border.width",
  borderStyle: "solid",
  borderRadius: "border.radius",
  width: "100%",
  height: "500px", 
});

function StyledBox() {
  const [userMessage, setUserMessage] = useState(""); //stores user message
  //* AI call ---------- 
  const [aiResponse, setAiResponse] = useState(""); // stores OpenAI response
  const handleUserMessage = async (message) => {
    setUserMessage(message); 

    try {
      const response = await fetchChatResponse(message, ""); // call API
      setAiResponse(response); 
    } catch (error) {
      // console.error("Error fetching AI response:", error);
      setAiResponse("Error fetching AI response:", error);
    }
  };

  return (
    <Box xcss={cardStyle}>
        {userMessage && <UserDialogueBox message={userMessage} />}
        {aiResponse && <DialogueBox aiResponse={aiResponse} />} 
        <ChatboxForm setUserMessage={handleUserMessage} />
    </Box>
  );
}

export default StyledBox;
