// for handling OpenAI API Calls
//_______________________
//local testing purposes
//import fetch from 'node-fetch';
//____________________________


import dotenv from 'dotenv';
dotenv.config();

import api from '@forge/api';

export async function generateResponse(question, context) {
  console.log("Waiting 5 seconds before calling OpenAI...");
  await wait(5000); // Add a 5-second delay before making the API call
  // Combine user input + docs and create a prompt for OpenAI
  const prompt = `User question: ${question}\n\nRelevant documents:\n${context}\n\nProvide a detailed answer with references.`;
  // add more detailed prompting as we go
  
  //Chat Completion endpoint.
  const payload = {
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that provides clear answers based on provided context.' },
      { role: 'user', content: prompt }
    ]
  };

  // call POST request to OpenAI's API - payload
  try {
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
    return data.choices[0]?.message?.content || "I couldn't generate a response. Check error logs.";
  } 
  catch (error) {
    console.error("OpenAI API request failed:", error);
    return "There was an issue retrieving a response.";
  }
}