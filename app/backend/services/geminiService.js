const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const analyzeEmail = async (emailContent) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const text = `Analyze this email and classify it as None to Minimal Phishing, Liking Present Phishing, and Phishing Obviously Present. Give it a score of 1 through 10. A score of 1-3 will fit None to Minimal Phishing. A score of 4-7 will fit Likely Present Phishing. A score of 8-10 will fit Phishing Obviously Present. When giving back the response based on your analysis of the email, only respong with the singular number. Email content: "${emailContent}"`;

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
