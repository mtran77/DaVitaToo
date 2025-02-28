//this will be nested inside the stylishBox.jsx
import React from "react";
import { Box, xcss } from "@forge/react";

const cardStyle = xcss({
    backgroundColor: "color.background.accent.gray.subtle.hovered", 
  padding: "space.100",
  borderRadius: "border.radius",
  marginTop: "space.100",
  color: "color.text.inverse",
  width: "100%",
  });

function DialogueBox(){
    return(
        <Box xcss={cardStyle}>
            What is kidney dialysis?
        </Box>
    );
}

export default DialogueBox