/*require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { analyzeEmail, analyzeScreenshot } = require('./services/geminiService');
const analyzeRouter = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/analyze', analyzeRouter);

// Analyze email for phishing
app.post('/analyze', async (req, res) => {
    try {
        const { emailContent } = req.body;
        if (!emailContent) {
            return res.status(400).json({ error: "Email content is required" });
        }
        const { analysis } = await analyzeScreenshot(emailContent);
        res.json({ analysis });
    } catch (error) {
        console.error("Error analyzing email:", error);
        res.status(500).json({ error: "Failed to analyze email" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const analyzeRouter = require('./routes/analyze');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/analyze', analyzeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
