const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const analyzeEmail = async (emailContent) => {
    try {
        // Create model with configuration
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.4,
                topP: 0.95,
                maxOutputTokens: 2048,
            }
        });
        
        console.log("✅ Processing email content with Gemini API...");
        
        const prompt = `
        Analyze this email content for phishing indicators.
        
        Email Content:
        """
        ${emailContent}
        """
        
        Determine if this email shows signs of a phishing attempt. 
        Give it a score from 1-10, where:
        - 1-3: Safe, no or minimal phishing indicators
        - 4-7: Suspicious, some phishing indicators present
        - 8-10: Dangerous, obvious phishing attempt
        
        Respond with ONLY the number score, nothing else.
        `;

        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysisText = response.text().trim();
        
        console.log("✅ Gemini response:", analysisText);
        
        // Try to extract just the number if the model provided additional text
        const numberMatch = analysisText.match(/\b([1-9]|10)\b/);
        const analysis = numberMatch ? numberMatch[0] : analysisText;
        
        return { analysis };
    } catch (error) {
        console.error("❌ Error analyzing email:", error);
        console.error("Error details:", error.message);
        throw new Error("Failed to analyze email: " + error.message);
    }
};

const analyzeScreenshot = async (imageBase64) => {
    try {
        // Remove the data URL prefix if present (e.g., "data:image/jpeg;base64,")
        const base64Data = imageBase64.includes('base64,') 
            ? imageBase64.split('base64,')[1] 
            : imageBase64;
            
        // Create a model that supports image input
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.4,
                topP: 0.95,
                maxOutputTokens: 8192,
            }
        });

        // Convert base64 to FileObject that Gemini expects
        const imageData = {
            inlineData: {
                data: base64Data,
                mimeType: "image/jpeg" // Assuming JPEG, adjust as needed
            }
        };

        console.log("✅ Processing image with Gemini API...");
        
        // Create parts array with image and text prompt
        const parts = [
            {
                text: "Analyze this screenshot of an email and determine if it contains phishing elements. Give it a score from 1-10, where 1-3 means safe, 4-7 means suspicious, and 8-10 means highly dangerous. Respond with only the number score."
            },
            imageData
        ];
        
        // Generate content with the multimodal input
        const result = await model.generateContent({
            contents: [{ role: "user", parts }]
        });
        
        const response = await result.response;
        const analysisText = response.text().trim();
        
        console.log("✅ Gemini response:", analysisText);
        
        // Try to extract just the number if the model provided additional text
        const numberMatch = analysisText.match(/\b([1-9]|10)\b/);
        const analysis = numberMatch ? numberMatch[0] : analysisText;
        
        return { analysis };
    } catch (error) {
        console.error("❌ Error analyzing screenshot:", error);
        console.error("Error details:", error.message);
        throw new Error("Failed to analyze screenshot: " + error.message);
    }
};

module.exports = { analyzeEmail, analyzeScreenshot };
