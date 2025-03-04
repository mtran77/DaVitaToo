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

function DialogueBox({aiResponse}){
    return(
        <Box xcss={cardStyle}>
            {aiResponse ? aiResponse : ""} 
        </Box>
    );
}

export default DialogueBox