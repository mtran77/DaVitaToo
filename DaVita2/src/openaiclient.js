// for handling OpenAI API Calls
/* Call to run:
import { generateResponse } from './openaiclient'; 
*/

import api from '@forge/api';


export async function generateResponse(question, context) {
  // Combine user input + docs and create a prompt for OpenAI
  const prompt = `User question: ${question}\n\nRelevant documents:\n${context}\n\nProvide a detailed answer with references.`;
  // add more detailed prompting as we go
  
  //Chat Completion endpoint.
  const payload = {
    model: 'gpt-4o',
    //TO DO: verify model
    messages: [
      { role: 'system', content: 'You are a helpful assistant that provides clear answers based on provided context.' },
      // add more context for prompting later
      { role: 'user', content: prompt }
    ]
  };

  // call POST request to OpenAI's API - payload
    // openaI key: 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
  const response = await api.fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //TO DO: store as an environment variable
      'Authorization': 'Bearer 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' 
    },
    body: JSON.stringify(payload)
  });

  // if call fails
  if (!response.ok) {
    console.error('there was an error calling OpenAI API:', response.status, response.statusText);
    throw new Error(`Error calling OpenAI API: ${response.status}`);
  }

  const data = await response.json();
  //return generated info from the first choice
  return data.choices[0].message.content;
}
