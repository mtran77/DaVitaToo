import React from "react";
import { Box, xcss } from "@forge/react";

// Styles for the dialogue box
//doesnt work
const cardStyle = xcss({
  padding: "space.150",
  width: "40%",
  position: "absolute",
  right: "20px",
  top: "20px",
  backgroundColor: "color.background.neutral.bold.pressed",
  borderRadius: "border.radius",
});


const userMessageStyle = xcss({
  backgroundColor: "color.background.accent.blue.subtle", 
  padding: "space.100",
  borderRadius: "border.radius",
  marginTop: "space.100",
  color: "color.text.inverse",
  width: "40%",
});

// * 4. user input is sent from chatForm
function UserDialogueBox({ message }) {
  return <Box xcss={userMessageStyle}>{message ? message : ""}</Box>;
}

export default UserDialogueBox;
