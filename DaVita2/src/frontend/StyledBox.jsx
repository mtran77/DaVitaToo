import React, {useState} from "react"
import { Box, xcss } from "@forge/react";
import ChatboxForm from "./ChatboxForm.jsx";
import DialogueBox from "./DialogueBox.jsx"
import UserDialogueBox from "./UserInputDialogueBox.jsx";


// Styles
const cardStyle = xcss({
  backgroundColor: "color.background.neutral.bold.pressed",
  padding: "space.150",
  borderColor: "color.border.focused",
  borderWidth: "border.width",
  borderStyle: "solid",
  borderRadius: "border.radius",
  width: "100%",
  height: "275px", 
});

function StyledBox() {
 
  // * ---------------
  return (
    <Box xcss={cardStyle}>
       <DialogueBox/>
      <UserDialogueBox/>
     
    
        <ChatboxForm />
    </Box>
  );
}

export default StyledBox;
