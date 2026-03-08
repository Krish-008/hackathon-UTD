const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'QuestMap Backend is Running', timestamp: new Date() });
});

// Generate knowledge map
app.post('/api/generate-map', async (req, res) => {
    const { topic, skill_level } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a learning curriculum designer. 
  Create a comprehensive knowledge map for learning "${topic}" at a "${skill_level || 'beginner'}" level.
  The map should have 6-8 logical nodes representing sub-topics and edges representing the learning path.

  Return ONLY valid JSON. Do not include markdown formatting, backticks, or any explanatory text.
  
  Format exactly like this:
  {
    "nodes": [
      {"id": "1", "label": "Foundations of X", "description": "Short overview of the basics"}
    ],
    "edges": [
      {"source": "1", "target": "2"}
    ]
  }`;

    try {
        console.log(`[${new Date().toISOString()}] Request received for topic: "${topic}"`);
        const result = await model.generateContent(prompt);
        console.log(`[${new Date().toISOString()}] Gemini response received.`);

        let text = result.response.text();

        // Clean up response in case Gemini adds markdown blocks
        text = text.replace(/```json|```/g, '').trim();

        const json = JSON.parse(text);
        console.log(`[${new Date().toISOString()}] Success: Map generated.`);
        res.json(json);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Gemini Error:`, error.message);
        res.status(500).json({ error: 'Failed to generate map', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;