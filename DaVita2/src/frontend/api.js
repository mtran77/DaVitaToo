// this calls the back end function 
export async function fetchChatResponse(userInput) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userInput }),
    });
  
    const data = await response.json();
    return data.answer;
  }
  