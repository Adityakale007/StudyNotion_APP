const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.askGemini = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    // Using the exact model name authorized for your API key
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return res.status(200).json({ 
        success: true, 
        message: response 
    });
    
  } catch (error) {
    console.error("AI Chatbot Error:", error);
    return res.status(500).json({ 
        success: false, 
        message: "Failed to generate AI response" 
    });
  }
};