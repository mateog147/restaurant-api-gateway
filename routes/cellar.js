const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/ingredients/available', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.CELLAR_SERVICE_URL}/cellar/ingredients/available`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});


router.get('/movements/in', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.CELLAR_SERVICE_URL}/cellar/movements/in`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

router.get('/movements/out', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.CELLAR_SERVICE_URL}/cellar/movements/out`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

module.exports = router;