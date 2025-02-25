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
    const { handleSubmit, getFieldId } = useForm();
    const login = (data) => {
      // handle data inputs
      console.log(data);
    };
  
    return (
      <Form onSubmit={handleSubmit(login)}> 
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