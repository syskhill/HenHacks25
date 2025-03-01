require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=" + GEMINI_API_KEY;

export async function analyzeEmailWithGemini(emailContent) {
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: {
                    text: `Analyze this email for phishing indicators and return a risk level (low, medium, high) with an explanation: ${emailContent}`
                }
            })
        });

        const data = await response.json();
        return data?.candidates?.[0]?.output || "Unable to analyze the email.";
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Error analyzing the email.";
    }
}
