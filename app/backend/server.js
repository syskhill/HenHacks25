require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { analyzeEmail, analyzeScreenshot } = require('./services/geminiService');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increased limit for screenshot data
app.use(express.json({ limit: '50mb' }));

// Log requests
app.use((req, res, next) => {
    console.log(`📥 ${req.method} request to ${req.path}`);
    next();
});

// Analyze email content for phishing threats
app.post('/analyze', async (req, res) => {
    try {
        const { emailContent } = req.body;
        
        if (!emailContent) {
            console.log("❌ Error: Missing email content");
            return res.status(400).json({ error: "Email content is required" });
        }
        
        console.log("✅ Processing email content...");
        const result = await analyzeEmail(emailContent);
        res.json(result);
    } catch (error) {
        console.error("❌ Error analyzing email:", error);
        res.status(500).json({ error: "Failed to analyze email: " + error.message });
    }
});

// Analyze screenshot for phishing threats
app.post('/analyzeScreenshot', async (req, res) => {
    try {
        const { image } = req.body;
        
        if (!image) {
            console.log("❌ Error: Missing screenshot data");
            return res.status(400).json({ error: "Screenshot data is required" });
        }
        
        console.log("✅ Processing screenshot...");
        const result = await analyzeScreenshot(image);
        res.json(result);
    } catch (error) {
        console.error("❌ Error analyzing screenshot:", error);
        res.status(500).json({ error: "Failed to analyze screenshot: " + error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
