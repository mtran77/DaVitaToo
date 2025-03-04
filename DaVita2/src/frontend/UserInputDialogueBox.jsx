import React from "react";
import { Box, xcss } from "@forge/react";

// Styles for the dialogue box
const userMessageStyle = xcss({
  backgroundColor: "color.background.accent.blue.subtle", 
  padding: "space.100",
  borderRadius: "border.radius",
  marginTop: "space.100",
  marginBottom:"space.100",
  color: "color.text.inverse",
  width: "100%",
  
});

// * 4. user input is sent from chatForm
function UserDialogueBox({ message }) {
  return <Box xcss={userMessageStyle}>{message ? message : ""}</Box>;
}

export default UserDialogueBox;
