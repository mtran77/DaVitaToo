import React from "react";
import { Form, TextArea, FormSection, Button, useForm, Box } from "@forge/react";
 
  function ChatboxForm({ setUserMessage }) { //2. recieves user input (setUserMessage) from StyledBox
    const { handleSubmit, register } = useForm();
    const userQuery = (data) => {
      setUserMessage(data.userInput); //3. sends the user input to userInputDialogue.jsx
      
    };
    return (
      // 1. onSubmit starts the user input reading
      <Form onSubmit={handleSubmit(userQuery)}> 
      <FormSection>
      <TextArea placeholder="Start Chatting" {...register("userInput")} />
      <Box xcss={{ marginTop: "space.100" }} />
        <Button appearance="primary" type="submit" >
                    Submit
        </Button>
        
        <Button appearance="warning" type="submit">
                    Reset
        </Button>
      
      </FormSection>
      </Form>
    );
  }
  export default ChatboxForm