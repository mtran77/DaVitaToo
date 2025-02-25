//this will be nested inside the stylishBox.jsx
import React from "react";
import { Box, xcss } from "@forge/react";

const cardStyle = xcss({
    backgroundColor: "color.background.neutral.bold.pressed",
    padding: "space.200",
    borderColor: "color.border.focused",
    borderWidth: "border.width",
    borderStyle: "solid",
    borderRadius: "border.radius",
    width: "40%",
  });

//   color.text.inverse

const headingStyle = xcss({
    color: "red", // Change color
    fontSize: "32px", // Change size
  });
  

function DialogueBox(){
    return(
        <Box xcss={cardStyle}>
            <h4 xcss={headingStyle}>
                Ignorant branched humanity led now marianne too strongly entrance. 
                Rose to shew bore no ye of paid rent form. Old design are dinner better nearer silent excuse. 
                She which are maids boy sense her shade.
                Considered reasonable we affronting on expression in.
            </h4>
        </Box>
    );
}

export default DialogueBox