// // this file handles function requests from the UI
// //confluence client & openai client meet

// import { searchDocumentsByTags } from './confluenceclient';
// import { generateResponse } from './openaiclient';

// export async function handler(request) {
//   try {
//     // Get user question from request
//     const { question } = await request.json();

//     // Search Confluence for relevant documents based on question
//     //adjust tags later
//     const tags = ['training', 'general-medical'];
//     const documents = await searchDocumentsByTags(tags);

//     if (documents.length === 0) {
//       return new Response(JSON.stringify({ answer: "No relevant documents found in Confluence." }), { status: 200 });
//     }

//     // Extract content from Confluence documents (strip HTML, limit length)
//     const context = documents
//       .map(doc => doc.body.view.value.replace(/<[^>]*>?/gm, '').slice(0, 500))
//       .join("\n\n");

//     // Send user question + Confluence document content to OpenAI
//     const aiResponse = await generateResponse(question, context);

//     return new Response(JSON.stringify({ answer: aiResponse }), { status: 200 });
//   } catch (error) {
//     console.error("Error processing request:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
//   }
// }

import api from "@forge/api";
import Resolver from "@forge/resolver";

const resolver = new Resolver();

resolver.define("fetchChatResponse", async ({ payload }) => {
  const userInput = payload.question;

  try {
    const response = await api.fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`, // Replace with your actual API key
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4", // Specify the model you want
        messages: [{ role: "user", content: userInput }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;  // Adjust based on OpenAI response structure
  } catch (error) {
    console.error("Error fetching from OpenAI API:", error);
    throw new Error("Error with OpenAI API");
  }
});

export default resolver;

