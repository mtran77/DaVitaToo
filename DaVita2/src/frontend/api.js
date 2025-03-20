// // this calls the back end function 
// export async function fetchChatResponse(userInput) {
//   console.log('before the fetch')
//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
      
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ question: userInput }),
//     });
//     console.log('after the fetch')

//     const data = await response.json();
//     return data.answer;
//   }
  
import { invoke } from "@forge/bridge"; // Importing correctly

export async function fetchChatResponse(userInput) {
  console.log("before the fetch");

  try {
    // Make sure this matches exactly the function name defined in the resolver
    const response = await invoke("fetchChatResponse", { question: userInput });
    console.log("after the fetch");

    return response;  // Return the AI-generated response
  } catch (error) {
    console.error("Error invoking function:", error);
  }
}

