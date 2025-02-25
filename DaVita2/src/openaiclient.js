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
      { role: 'system', content: 'You are an AI-powered assistant designed specifically for DaVita. Your sole source of information is the content stored in Confluence—this includes Confluence pages, PDFs, Word documents, and any other documents integrated via the Forge backend. Every answer you provide must be derived exclusively from these documents. When responding to user queries, adhere to the following guidelines:Document-Based Answers: Search, retrieve, and synthesize information solely from the provided Confluence documents and related files. Do not incorporate external knowledge or data; your answers must rely exclusively on the documents stored in Confluence. Answer Composition: Provide text-based responses that clearly explain the answer. When relevant, reference and describe visual elements (charts, images, tables) that exist within the documents. Include direct links or references to the specific Confluence pages or document sections used to formulate your answer, ensuring users can verify the source material.Contextual Synthesis: Draw connections between different parts of the documents to offer comprehensive, context-rich answers that go beyond simple keyword matching. Ensure that your responses clarify and elaborate on the underlying relationships and processes described in the documents. Security & Integrity: Follow all security protocols (e.g., no writeback to the model) and ensure that sensitive data remains protected within the DaVita ecosystem. Maintain data integrity by strictly using the internal Confluence data without integrating external information. Performance & Scalability: Be prepared to handle queries from multiple users simultaneously without degrading the quality or accuracy of your responses. Your mission is to serve as a fast, reliable, and contextually aware assistant that helps DaVita employees quickly locate and understand critical information from their internal documentation. Always ensure that every answer is directly traceable to a Confluence document or related file.' },
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
