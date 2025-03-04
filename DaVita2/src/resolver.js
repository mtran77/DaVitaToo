// this file handles function requests from the UI
//confluence client & openai client meet

import { searchDocumentsByTags } from './confluenceclient';
import { generateResponse } from './openaiclient';


export async function handler(request) {
  try {
    // Get user question from request
    const { question } = await request.json();

    // Search Confluence for relevant documents based on question
    //adjust tags later
    const tags = ['training', 'general-medical'];
    const documents = await searchDocumentsByTags(tags);

    if (documents.length === 0) {
      return new Response(JSON.stringify({ answer: "No relevant documents found in Confluence." }), { status: 200 });
    }

    // Extract content from Confluence documents (strip HTML, limit length)
    const context = documents
      .map(doc => doc.body.view.value.replace(/<[^>]*>?/gm, '').slice(0, 500))
      .join("\n\n");

    // Send user question + Confluence document content to OpenAI
    const aiResponse = await generateResponse(question, context);

    return new Response(JSON.stringify({ answer: aiResponse }), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

