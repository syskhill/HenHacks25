const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const analyzeEmail = async (emailContent) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const text = `Analyze this email and classify it as 'Phishing' or 'Not Phishing'. Email content: "${emailContent}"`;

        const result = await model.generateContent(text);

        const response = await result.response;
        const analysis = response.text() || "No valid response from Gemini";
        return { analysis };
        
    } catch (error) {
        console.error("❌ Error analyzing email:", error);
        throw new Error("Failed to analyze email");
    }
};

module.exports = { analyzeEmail };
