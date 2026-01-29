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

    // ✅ USE ENV VARIABLE (IMPORTANT)
    const flaskResponse = await axios.post(
      process.env.AI_API_URL,
      { url }
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
    console.error('Scan error:', error.message);
    res.status(500).json({
      error: 'Failed to scan URL'
    });
  }
});

module.exports = router;
