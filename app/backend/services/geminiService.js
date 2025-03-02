const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const analyzeEmail = async (emailContent) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const text = `Analyze this email and classify it as None to Minimal Phishing, Likely Present Phishing, or Phishing Obviously Present. Give it a score of 1 through 10. A score of 1-3 indicates None to Minimal Phishing, 4-7 indicates Likely Present Phishing, and 8-10 indicates Phishing Obviously Present. Respond with only the singular number. Email content: "${emailContent}"`;

        const result = await model.generateContent(text);
        const response = await result.response;
        const analysis = response.text() || "No valid response from Gemini";
        return { analysis };
        
    } catch (error) {
        console.error("❌ Error analyzing email:", error);
        throw new Error("Failed to analyze email");
    }
};

const analyzeScreenshot = async (image) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const text = `Analyze this screenshot and determine if it contains a phishing email. Screenshot: "${image}"`;
        const result = await model.generateContent(text);
        const response = await result.response;
        const analysis = response.text() || "No valid response from Gemini";
        return { analysis };
        
    } catch (error) {
        console.error("❌ Error analyzing screenshot:", error);
        throw new Error("Failed to analyze screenshot");
    }
};

module.exports = { analyzeEmail, analyzeScreenshot };
