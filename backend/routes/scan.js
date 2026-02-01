const express = require('express');
const axios = require('axios');
const Scan = require('../models/Scan');

const router = express.Router();

router.post('/scan', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // 🔥 IMPORTANT: timeout added for Render cold start
    const flaskResponse = await axios.post(
      process.env.AI_API_URL,
      { url },
      {
        timeout: 60000 // 60 seconds
      }
    );

    const { result, confidence } = flaskResponse.data;

    // Save to MongoDB
    const scan = new Scan({
      url,
      result,
      confidence
    });

    await scan.save();

    res.json({ result, confidence });

  } catch (error) {
    // 🔥 Better error logs
    console.error(
      'Scan error:',
      error.response?.data || error.message
    );

    res.status(500).json({
      error: 'Failed to scan URL'
    });
  }
});

module.exports = router;
