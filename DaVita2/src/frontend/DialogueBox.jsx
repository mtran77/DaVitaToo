//this will be nested inside the stylishBox.jsx
import React from "react";
import { Box, xcss } from "@forge/react";

const cardStyle = xcss({
    backgroundColor: "color.background.neutral.bold.pressed",
    padding: "space.150",
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