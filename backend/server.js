const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'QuestMap Backend is Running', timestamp: new Date() });
});

// Placeholder for future AI/Map generation routes
app.post('/api/generate-map', (req, res) => {
    const { topic } = req.body;
    res.json({
        message: `Ready to generate map for: ${topic}`,
        status: 'Feature coming soon'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export for Vercel
