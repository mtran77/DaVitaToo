// for testing openai connection
// npm install dotenv

import { generateResponse } from "./openaiclient.js";

// added because I couldnt tell if it was running
console.log("Starting test...");
//console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);


//edited the test script to log
async function test() {
  const sampleQuestion = "What is the capital of France? please only give a one word answer.";
  const sampleContext = "Relevant context: Paris is the capital city.";
  
  try {
    const answer = await generateResponse(sampleQuestion, sampleContext);
    console.log("Danny Davita Response:", answer);
  } catch (error) {
    console.error("Error calling generateResponse:", error);
  }
}

test();