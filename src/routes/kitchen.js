import { Router } from 'express';
import axios from 'axios';
import logger from '../common/logger.js';
const { get, post } = axios;
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Kitchen
 *   description: Kitchen management
 */

/**
 * @swagger
 * /kitchen/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Kitchen]
 *     responses:
 *       200:
 *         description: A list of orders
 */
router.get('/orders', async (req, res) => {
  logger.log('GET /orders called');
  try {
    const response = await get(`${process.env.KITCHEN_SERVICE_URL}/kitchen/orders`);
    logger.log('Orders fetched successfully');
    res.json(response.data);
  } catch (error) {
    logger.error(`Error fetching orders: ${error.message}`);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /kitchen/orders/recipes:
 *   get:
 *     summary: Get order recipes
 *     tags: [Kitchen]
 *     responses:
 *       200:
 *         description: A list of recipes
 */
router.get('/orders/recipes', async (req, res) => {
  logger.log('GET /orders/recipes called');
  try {
    const response = await get(
      `${process.env.KITCHEN_SERVICE_URL}/kitchen/orders/recipes`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: req.body
      }
    );
    logger.log('Order recipes fetched successfully');
    res.json(response.data);
  } catch (error) {
    logger.error(`Error fetching order recipes: ${error.message}`);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /kitchen/orders/today:
 *   get:
 *     summary: Get today's orders
 *     tags: [Kitchen]
 *     responses:
 *       200:
 *         description: A list of today's orders
 */
router.get('/orders/today', async (req, res) => {
  logger.log('GET /orders/today called');
  try {
    const response = await get(
      `${process.env.KITCHEN_SERVICE_URL}/kitchen/orders/today`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        data: req.body
      }
    );
    logger.log('Today orders fetched successfully');
    res.json(response.data);
  } catch (error) {
    logger.error(`Error fetching today orders: ${error.message}`);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /kitchen/orders/{orderId}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Kitchen]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order description
 *       404:
 *         description: Order not found
 */
router.get('/orders/:orderId', async (req, res) => {
  logger.log(`GET /orders/${req.params.orderId} called`);
  try {
    const response = await get(
      `${process.env.KITCHEN_SERVICE_URL}/kitchen/orders/${req.params.orderId}`
    );
    logger.log(`Order ${req.params.orderId} fetched successfully`);
    res.json(response.data);
  } catch (error) {
    logger.error(`Error fetching order ${req.params.orderId}: ${error.message}`);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /kitchen/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Kitchen]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *     responses:
 *       201:
 *         description: The order was successfully created
 *       400:
 *         description: Invalid order
 */
router.post('/orders', async (req, res) => {
  logger.log('POST /orders called');
  try {
    const response = await post(
      `${process.env.KITCHEN_SERVICE_URL}/kitchen/orders`,
      req.body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    logger.log('Order created successfully');
    res.status(response.status).json(response.data);
  } catch (error) {
    logger.error(`Error creating order: ${error.message}`);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

export default router;