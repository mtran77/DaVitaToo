import React from "react";
import { Box, xcss, Heading } from "@forge/react";

// Styles for the dialogue box
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

// * user message is the data and sent to 
function UserDialogueBox({ message }) {
  return <Box xcss={userMessageStyle}>{message ? message : ""}</Box>;
}

export default UserDialogueBox;
