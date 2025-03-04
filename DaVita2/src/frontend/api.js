// this calls the back end function 
export async function fetchChatResponse(userInput) {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userInput }),
    });
  
    const data = await response.json();
    return data.answer;
  }
  