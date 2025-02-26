import React from "react";
import { Box, xcss } from "@forge/react";
import ChatboxForm from "./chatForm.jsx";

// Styles
const cardStyle = xcss({
  backgroundColor: "color.background.neutral.bold.pressed",
  padding: "space.200",
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
        {/* nested component */}
        <ChatboxForm />  
    </Box>
  );
}

export default StyledBox;
