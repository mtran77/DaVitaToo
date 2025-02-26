// React UI code similar to chatgpt

// import React, { useState } from "react";
// import { fetchChatResponse } from "./api";

// const ChatInterface = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages([...messages, userMessage]);

//     // Get AI response from the backend
//     const aiResponse = await fetchChatResponse(input);
//     const botMessage = { role: "assistant", content: aiResponse };

//     setMessages([...messages, userMessage, botMessage]);
//     setInput("");
//   };

//   return (
//     <div className="chat-container">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={msg.role === "user" ? "user-message" : "bot-message"}>
//             {msg.content}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Ask me anything..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatInterface;
