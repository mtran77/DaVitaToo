//this will be nested inside the stylishBox.jsx
import React from "react";
import { Box, xcss, Stack, Heading } from "@forge/react";


const cardStyle = xcss({
    backgroundColor: "color.background.neutral.bold.pressed",
    padding: "space.150",
    width: "40%",
  });

//   color.text.inverse

//* does not work
const headingStyle = xcss({
    color: "Neutral1000", // Use a valid color token
});


function DialogueBox(){
    return(
        <Box xcss={cardStyle}>
            <Heading as="h5" xcss={headingStyle}>
                Ignorant branched humanity led now marianne too strongly entrance. 
                Rose to shew bore no ye of paid rent form. Old design are dinner better nearer silent excuse. 
                She which are maids boy sense her shade.
                Considered reasonable we affronting on expression in
            </Heading>
        </Box>
    );
}

export default DialogueBox