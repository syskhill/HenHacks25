const express = require('express');
const router = express.Router();
const { analyzeEmail } = require('./geminiService');

router.post('/', async (req, res) => {
    try {
        const { emailContent } = req.body;
        if (!emailContent) {
            console.log("❌ Error: Missing email content.");
            return res.status(400).json({ error: "Email content is required" });
        }

        console.log("✅ Sending request to Gemini API...");
        const result = await analyzeEmail(emailContent);
        res.json(result);

    } catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({ error: "Failed to analyze email" });
    }
});

module.exports = router;
