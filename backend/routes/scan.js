const express = require('express');
const axios = require('axios');
const Scan = require('../models/Scan');

const router = express.Router();

router.post('/scan', async (req, res) => {
  try {
    const { url } = req.body;

    // 1️⃣ Validate input
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Valid URL is required' });
    }

    // 2️⃣ Call AI service (Render-safe)
    const flaskResponse = await axios.post(
      process.env.AI_API_URL,
      { url },
      {
        timeout: 60000, // 60s for Render cold start
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const { result, confidence } = flaskResponse.data;

    // 3️⃣ Save scan result to MongoDB
    const scan = new Scan({
      url,
      result,
      confidence
    });

    await scan.save();

    // 4️⃣ Send response to frontend
    res.status(200).json({
      result,
      confidence
    });

  } catch (error) {
    // 🔥 Proper production logs (VERY IMPORTANT)
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ AI service timeout (cold start)');
    } else if (error.response) {
      console.error(
        '❌ AI service error:',
        error.response.status,
        error.response.data
      );
    } else {
      console.error('❌ Scan failed:', error.message);
    }

    res.status(500).json({
      error: 'AI service unavailable. Please try again.'
    });
  }
});

module.exports = router;
