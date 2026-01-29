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

    // Call Flask API
    const flaskResponse = await axios.post('http://127.0.0.1:5000/predict', {
      url: url
    });

    const { result, confidence } = flaskResponse.data;

    // Save to MongoDB
    const scan = new Scan({
      url,
      result,
      confidence
    });

    await scan.save();

    // Return result
    res.json({
      result,
      confidence
    });
  } catch (error) {
    console.error('Scan error:', error);
    res.status(500).json({ 
      error: 'Failed to scan URL',
      message: error.message 
    });
  }
});

module.exports = router;
