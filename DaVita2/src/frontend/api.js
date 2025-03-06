// this calls the back end function - fixed with bridging 
import { invoke } from "@forge/bridge";

export async function fetchChatResponse(userInput) {
  try {
    const response = await invoke("chatbot-resolver", { question: userInput });

    return response.answer;
  } catch (error) {
    console.error("Error getting chat response:", error);
    return "Error getting response.";
  }
}
