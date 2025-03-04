import React from "react";
import { Form, TextArea, FormSection, Button, useForm, Box, LinkButton } from "@forge/react";
 
// const buttonStyling = xcss({
//   marginLeft: "space.50", 
//   marginRight: "space.50"
// })

function ChatboxForm({ handleUserMessage, handleReset  }) { 
  const { handleSubmit, register, reset } = useForm();

  const userQuery = (data) => { //2. recieves user input and puts it into userQuery(data)
    handleUserMessage (data.userInput); //3. using function handleUserMessage from parent component StyledBox.jsx
  };

  const resetPage = () => {
    handleReset(); //works 
    reset(); //does not work
  };

  return (
    // 1. onSubmit starts the user input reading
    <Form onSubmit={handleSubmit(userQuery)}> 
    <FormSection>
      <TextArea placeholder="Start Chatting" {...register("userInput")} />
      <Box xcss={{ marginTop: "space.100" }} />
        <Button appearance="primary" type="submit" >
            ➤ 
        </Button>
        
        <Button appearance="warning" type="button" onClick={resetPage} >
                    Reset
        </Button>
    </FormSection>
    </Form>
  );
}
export default ChatboxForm