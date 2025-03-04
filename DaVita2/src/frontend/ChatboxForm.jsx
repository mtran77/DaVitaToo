import React from "react";
import { Form, TextArea, FormSection, Button, useForm, Box } from "@forge/react";
 
function ChatboxForm({ handleUserMessage  }) { 
  const { handleSubmit, register } = useForm();
  const userQuery = (data) => { //2. recieves user input and puts it into userQuery(data)
    handleUserMessage (data.userInput); //3. using function handleUserMessage from parent component StyledBox.jsx
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