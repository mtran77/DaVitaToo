import React from 'react';
import {
    Form,
    TextArea,
    FormSection,
    FormFooter,
    Button,
    useForm
  } from "@forge/react";

  function ChatboxForm (){
    const { handleSubmit } = useForm();
    const userQuery = (data) => {
      // handle data inputs
      console.log(data);
    };
  
    return (
      <Form onSubmit={handleSubmit(userQuery)}> 
        <FormSection >
          <TextArea placeholder="Start Chatting" />
          <Button appearance="primary" type="submit">
            Submit
          </Button>
        </FormSection>
        {/* <FormFooter>
        </FormFooter> */}
      </Form>
    );
  }
  
  export default ChatboxForm