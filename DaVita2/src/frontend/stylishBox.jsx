import React from "react";
import { Box, xcss } from "@forge/react";
import ChatboxForm from "./chatForm.jsx";
import DialogueBox from "./dialogue.jsx"

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
  return (
    <Box xcss={cardStyle}>
        <DialogueBox/>
        {/* nested component */}
        <ChatboxForm />  
    </Box>
  );
}

export default StyledBox;
