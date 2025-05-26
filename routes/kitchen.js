const express = require('express');
const axios = require('axios');
const router = express.Router();


router.get('/orders', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.KITCHEN_SERVICE_URL}/kitchen/orders`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});


router.get('/orders/:orderId', async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.KITCHEN_SERVICE_URL}/kitchen/orders/${req.params.orderId}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});


router.post('/orders', async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.KITCHEN_SERVICE_URL}/kitchen/orders`,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});


router.get('/orders/recipes', async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.KITCHEN_SERVICE_URL}/kitchen/orders/recipes`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: req.body
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});


router.get('/orders/today', async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.KITCHEN_SERVICE_URL}/kitchen/orders/today`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: req.body
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

module.exports = router;