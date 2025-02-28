import React from "react";
import { Box, xcss } from "@forge/react";

// Styles for the dialogue box
//doesnt work
const cardStyle = xcss({
  padding: "space.150",
  width: "100%",
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
  width: "100%",
});

// * 4. user input is sent from chatForm
function UserDialogueBox({ }) {
  return <Box xcss={userMessageStyle}>Kidney dialysis is a treatment that removes waste products and excess fluid from the blood when the kidneys are unable to do so. Do you have additional questions?</Box>;
}

export default UserDialogueBox;
