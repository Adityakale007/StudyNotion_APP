import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FiSend, FiCpu, FiUser } from "react-icons/fi";
import axios from "axios";

export default function AiChatbot() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    { 
      role: "model", 
      text: `Greetings, ${user?.firstName || "Student"}. I am your AI study assistant. How may I help you decipher complex concepts or debug your code today?` 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      // You can swap this back to your dynamic BASE_URL logic if needed
      const response = await axios.post(
        "https://studynotion-backend-8bx4.onrender.com/api/v1/ai/chat",
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
      setMessages((prev) => [...prev, { role: "model", text: "I apologize, but I encountered an anomaly. Please try your request again." }]);
    }

    setLoading(false);
  };

  return (
    <div className="relative mx-auto flex w-11/12 max-w-[1050px] flex-col gap-y-8 py-10 font-inter">
      
      {/* Sophisticated Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-yellow-500/10 blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none mix-blend-screen"></div>

      {/* Header Section */}
      <div className="z-10 flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-md">
            <FiCpu className="text-2xl text-yellow-50" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold tracking-tight text-richblack-5">
              Nexus <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-50 to-yellow-200">AI</span>
            </h1>
            <p className="text-xs font-medium uppercase tracking-wider text-richblack-400">
              Advanced Study Assistant
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Chat Interface */}
      <div className="z-10 flex h-[75vh] flex-col justify-between rounded-3xl border border-white/10 bg-richblack-900/40 p-2 shadow-2xl backdrop-blur-2xl sm:p-4">
        
        {/* Chat History Window */}
        <div 
          ref={chatContainerRef}
          className="flex flex-col gap-y-6 overflow-y-auto p-4 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 transition-all"
        >
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex w-full gap-x-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatars */}
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                msg.role === "user" 
                  ? "border-yellow-100 bg-yellow-50/20 text-yellow-50" 
                  : "border-white/20 bg-white/10 text-richblack-5"
              }`}>
                {msg.role === "user" ? <FiUser className="text-sm" /> : <FiCpu className="text-sm" />}
              </div>

              {/* Message Bubbles */}
              <div 
                className={`flex max-w-[75%] flex-col px-6 py-4 shadow-sm ${
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-yellow-50 to-yellow-200 text-richblack-900 rounded-3xl rounded-tr-sm shadow-[0_4px_20px_-4px_rgba(255,214,10,0.2)]" 
                    : "bg-white/5 border border-white/10 text-richblack-25 backdrop-blur-md rounded-3xl rounded-tl-sm"
                }`}
              >
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {/* Elegant Loading State */}
          {loading && (
            <div className="flex w-full gap-x-4 flex-row">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-richblack-5">
                <FiCpu className="text-sm animate-pulse" />
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl rounded-tl-sm px-6 py-5">
                <div className="h-1.5 w-1.5 bg-richblack-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-1.5 w-1.5 bg-richblack-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-1.5 w-1.5 bg-richblack-300 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form Area */}
        <div className="pt-2">
          <form 
            onSubmit={handleSendMessage} 
            className="group relative flex items-center rounded-2xl bg-richblack-800/50 border border-white/10 p-2 backdrop-blur-md transition-all duration-300 focus-within:border-yellow-50/50 focus-within:bg-richblack-800/80 focus-within:shadow-[0_0_30px_-5px_rgba(255,214,10,0.15)]"
          >
            <input
              type="text"
              placeholder="Ask a question or request an explanation..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-transparent px-4 py-3 text-[15px] text-richblack-5 outline-none placeholder:text-richblack-400"
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !prompt.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-richblack-900 transition-all duration-300 hover:bg-yellow-100 hover:shadow-[0_0_15px_rgba(255,214,10,0.6)] disabled:opacity-30 disabled:hover:shadow-none disabled:cursor-not-allowed"
            >
              <FiSend className="text-lg ml-[-2px]" />
            </button>
          </form>
          <div className="mt-3 text-center">
             <p className="text-[11px] text-richblack-500 tracking-wide">
               AI responses may occasionally be inaccurate. Please verify important information.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}