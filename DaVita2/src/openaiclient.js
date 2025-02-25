// for handling OpenAI API Calls
/* Call to run:
import { generateResponse } from './openaiclient'; 
*/
import dotenv from 'dotenv';
dotenv.config();

// import dotenv from 'dotenv';
// dotenv.config({ path: 'DAVITA2/.env' });

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
  const response = await api.fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
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
