import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiSend } from "react-icons/fi";
import axios from "axios";

export default function AiChatbot() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { 
      role: "model", 
      text: `Hi ${user?.firstName}! I'm your AI study assistant. Ask me to explain concepts, debug code, or solve problems.` 
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user message to UI immediately
    const userMessage = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const BASE_URL = window.location.hostname === "localhost" 
        ? "http://localhost:4000/api/v1" 
        : "https://studynotion-backend-8bx4.onrender.com/api/v1";

      const response = await axios.post(
        "http://studynotion-backend-8bx4.onrender.com/api/v1/ai/chat", // FORCE local testing
        { prompt: userMessage.text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const aiMessage = { role: "model", text: response.data.message };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "model", text: "Sorry, I encountered an error. Please try again." }]);
    }

    setLoading(false);
  };

  return (
    <div className="relative mx-auto flex w-11/12 max-w-[1000px] flex-col gap-y-6 py-6">
      
      {/* Background Ambient Glows for the Glass Effect */}
      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-yellow-400 opacity-10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 h-64 w-64 rounded-full bg-blue-500 opacity-10 blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="z-10 flex flex-col gap-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-richblack-5 to-richblack-300 bg-clip-text text-transparent">
          AI Doubt Solver
        </h1>
        <p className="text-sm text-richblack-300">Powered by Gemini</p>
      </div>
      
      {/* Main Glassmorphic Chat Container */}
      <div className="z-10 flex h-[70vh] flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl sm:p-6">
        
        {/* Chat History Window */}
        <div className="flex flex-col gap-y-5 overflow-y-auto pr-2 mb-4 scrollbar-hide">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex w-max max-w-[80%] flex-col px-5 py-3 shadow-sm ${
                msg.role === "user" 
                  ? "self-end bg-gradient-to-br from-yellow-50 to-yellow-100 text-richblack-900 rounded-2xl rounded-tr-sm" 
                  : "self-start bg-white/10 border border-white/5 text-richblack-5 backdrop-blur-md rounded-2xl rounded-tl-sm"
              }`}
            >
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          ))}
          {loading && (
            <div className="self-start bg-white/10 border border-white/5 backdrop-blur-md rounded-2xl rounded-tl-sm px-5 py-3 flex items-center gap-2">
              <div className="h-2 w-2 bg-yellow-50 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-yellow-50 rounded-full animate-bounce delay-75"></div>
              <div className="h-2 w-2 bg-yellow-50 rounded-full animate-bounce delay-150"></div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form 
          onSubmit={handleSendMessage} 
          className="flex items-center gap-x-3 border-t border-white/10 pt-4 mt-2"
        >
          <input
            type="text"
            placeholder="Type your question here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full rounded-xl bg-richblack-800/50 border border-white/10 px-4 py-3 text-richblack-5 outline-none placeholder:text-richblack-400 focus:border-yellow-50 focus:bg-richblack-800/80 focus:ring-1 focus:ring-yellow-50/50 transition-all duration-300"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading || !prompt.trim()}
            className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-richblack-900 transition-all duration-300 hover:scale-105 hover:bg-yellow-100 hover:shadow-[0_0_20px_rgba(255,214,10,0.4)] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <FiSend className="text-xl ml-[-2px]" />
          </button>
        </form>
      </div>
    </div>
  );
}