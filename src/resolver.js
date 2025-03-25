// this file handles function requests from the UI
//confluence client & openai client meet

import Resolver from "@forge/resolver";
import { generateResponse } from "./openaiclient"; 
import { searchDocumentsByTags } from "./confluenceclient"; 

const resolver = new Resolver();

resolver.define("chatbot-resolver", async ({ payload }) => {
  const question = payload.question;
  console.log("Received question:", question);

  // STEP 1: figure out tags
  const tags = await generateResponse(
    `What are the best tags for this question in Confluence? \n\n Question: ${question}`,
    ""
  );
  console.log("Suggested tags:", tags);

  // STEP 2: get docs from confluence 
  const documents = await searchDocumentsByTags(tags.split(","));
  console.log("Retrieved Documents:", documents);

  if (documents.length === 0) {
    return { answer: "No relevant documents found." };
  }

  // STEP 3: return docs and tags back to ai to answer
  const aiResponse = await generateResponse(question, JSON.stringify(documents));
  console.log("Final AI Response:", aiResponse);

  return { answer: aiResponse };
});

//export default resolver;
export const handler = resolver.getDefinitions();

