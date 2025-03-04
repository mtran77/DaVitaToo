import React from 'react';
import {
    Form,
    TextArea,
    FormSection,
    FormFooter,
    Label,
    Button,
  } from "@forge/react";
import { fetchChatResponse } from './api.js';


function ChatboxForm (){
  const [userQuery, setUserQuery] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const handleQueryChange = (event) => {
      setUserQuery(event.target.value);
  };

  const handleQuerySubmit = async (event) => {
    event.preventDefault();

    if (!userQuery.trim()) return; // Prevent empty submissions

    try {
      const response = await fetchChatResponse(userQuery); // Call API
      setChatResponse(response); // Store response in state
    } catch (error) {
      console.error("Error fetching chat response:", error);
    }

    setUserQuery(""); // Clear input after submission
  };

  return (
    <Form onSubmit={handleQuerySubmit}> 
        <FormSection>
            <Label>Chat:</Label>
            <TextArea 
                placeholder="Start Chatting" 
                value={userQuery} 
                onChange={handleQueryChange} 
            />
        </FormSection>
        <FormFooter>
            <Button appearance="primary" type="submit">
                Submit
            </Button>
        </FormFooter>
          {chatResponse && (
        <FormSection>
          <Label>Response:</Label>
          <p>{chatResponse}</p>
        </FormSection>
          )}
    </Form>
  );
}

export default ChatboxForm