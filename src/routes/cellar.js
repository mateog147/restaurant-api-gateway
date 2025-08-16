import { Router } from "express";
import axios from "axios";
import logger from "../common/logger.js";
const { get } = axios;
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cellar
 *   description: Cellar management
 */

/**
 * @swagger
 * /cellar/ingredients/available:
 *   get:
 *     summary: Get available ingredients
 *     tags: [Cellar]
 *     responses:
 *       200:
 *         description: A list of available ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get("/ingredients/available", async (req, res) => {
  logger.log("GET /ingredients/available called");
  try {
    const response = await get(
      `${process.env.CELLAR_SERVICE_URL}/cellar/ingredients/available`
    );
    logger.log("Ingredients available fetched successfully");
    res.json(response.data);
  } catch (error) {
    logger.error(`Error fetching ingredients available: ${error.message}`);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /cellar/movements/in:
 *   get:
 *     summary: Get ingredient input movements
 *     tags: [Cellar]
 *     responses:
 *       200:
 *         description: A list of input movements
 */
router.get("/movements/in", async (req, res) => {
  logger.log("GET /movements/in called");
  try {
    const response = await get(
      `${process.env.CELLAR_SERVICE_URL}/cellar/movements/in`
    );
    logger.log("Movements in fetched successfully");
    res.json(response.data);
  } catch (error) {
    logger.error(`Error fetching movements in: ${error.message}`);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /cellar/movements/out:
 *   get:
 *     summary: Get ingredient output movements
 *     tags: [Cellar]
 *     responses:
 *       200:
 *         description: A list of output movements
 */
router.get("/movements/out", async (req, res) => {
  logger.log("GET /movements/out called");
  try {
    const response = await get(
      `${process.env.CELLAR_SERVICE_URL}/cellar/movements/out`
    );
    logger.log("Movements out fetched successfully");
    res.json(response.data);
  } catch (error) {
    logger.error(`Error fetching movements out: ${error.message}`);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /cellar/health:
 *   get:
 *     summary: Get cellar health status
 *     tags: [Cellar]
 *     responses:
 *       200:
 *         description: The health status of the cellar
 */
router.get("/health", async (req, res) => {
  logger.log("GET /health called");
  try {
    const response = await get(
      `${process.env.CELLAR_SERVICE_URL}/cellar/health`
    );
    logger.log("Cellar health fetched successfully");
    res.json(response.data);
  } catch (error) {
    logger.error(`Error fetching cellar health: ${error.message}`);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

export default router;
