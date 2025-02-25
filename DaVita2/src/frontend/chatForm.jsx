import React from 'react';
import {
    Form,
    TextArea,
    FormSection,
    FormFooter,
    Label,
    Button,
    useForm
  } from "@forge/react";

  function ChatboxForm (){
    const { handleSubmit, getFieldId } = useForm();
    const login = (data) => {
      // handle data inputs
      console.log(data);
    };
  
    return (
      <Form onSubmit={handleSubmit(login)}> 
        <FormSection >
          <Label labelFor={getFieldId("userQuery")}>
            User Label Here
          </Label>
          <TextArea placeholder="Start Chatting" />
        </FormSection>
        <FormFooter>
          <Button appearance="primary" type="submit">
            Submit
          </Button>
        </FormFooter>
      </Form>
    );
  }
  
  export default ChatboxForm