import React from "react";
import { Form, TextArea, FormSection, Button, useForm } from "@forge/react";

  function ChatboxForm({ setUserMessage }) {
    const { handleSubmit, register } = useForm();
  
    const userQuery = (data) => {
      setUserMessage(data.userInput);
    };
  
    return (
      <Form onSubmit={handleSubmit(userQuery)}>
        <FormSection>
          <TextArea placeholder="Start Chatting" {...register("userInput")} />
          <Button appearance="primary" type="submit">
            Submit
          </Button>
        </FormSection>
      </Form>
    );
  }
  
  
  export default ChatboxForm