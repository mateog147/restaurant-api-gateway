import express from "express";
import request from "supertest";
import { jest } from "@jest/globals";

const mockLogger = {
  log: jest.fn(),
  error: jest.fn(),
};

jest.unstable_mockModule("../src/common/logger.js", () => ({
  default: mockLogger,
}));

const mockGet = jest.fn();
const mockPost = jest.fn();
jest.unstable_mockModule("axios", () => ({
  default: {
    get: mockGet,
    post: mockPost,
  },
}));

const { default: kitchenRouter } = await import("../src/routes/kitchen.js");

describe("Kitchen Router", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/kitchen", kitchenRouter);
    
    // Reset mocks
    mockGet.mockClear();
    mockPost.mockClear();
    mockLogger.log.mockClear();
    mockLogger.error.mockClear();
  });

  it("GET /kitchen/orders", async () => {
    mockGet.mockResolvedValue({ data: { url: "/kitchen/orders" } });
    
    const res = await request(app).get("/kitchen/orders");
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toContain("orders");
    expect(mockLogger.log).toHaveBeenCalledWith('GET /orders called');
  });

  it("GET /kitchen/orders/:orderId", async () => {
    mockGet.mockResolvedValue({ data: { url: "/kitchen/orders/123" } });
    
    const res = await request(app).get("/kitchen/orders/123");
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toContain("orders/123");
    expect(mockLogger.log).toHaveBeenCalledWith('GET /orders/123 called');
  });

  it("POST /kitchen/orders", async () => {
    mockPost.mockResolvedValue({ 
      status: 201,
      data: { url: "/kitchen/orders", body: { item: "pizza" } } 
    });
    
    const res = await request(app)
      .post("/kitchen/orders")
      .send({ item: "pizza" });
    expect(res.statusCode).toBe(201);
    expect(res.body.url).toContain("orders");
    expect(res.body.body.item).toBe("pizza");
    expect(mockLogger.log).toHaveBeenCalledWith('POST /orders called');
  });

  it("GET /kitchen/orders/recipes", async () => {
    mockGet.mockResolvedValue({ data: { url: "/kitchen/orders/recipes" } });
    
    const res = await request(app).get("/kitchen/orders/recipes");
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toContain("orders/recipes");
    expect(mockLogger.log).toHaveBeenCalledWith('GET /orders/recipes called');
  });

  it("GET /kitchen/orders/today", async () => {
    mockGet.mockResolvedValue({ data: { url: "/kitchen/orders/today" } });
    
    const res = await request(app).get("/kitchen/orders/today");
    expect(res.statusCode).toBe(200);
    expect(res.body.url).toContain("orders/today");
    expect(mockLogger.log).toHaveBeenCalledWith('GET /orders/today called');
  });

  it("should handle errors properly for GET /orders", async () => {
    const error = new Error('Kitchen service unavailable');
    error.response = { status: 503 };
    mockGet.mockRejectedValue(error);
    
    const res = await request(app).get("/kitchen/orders");
    expect(res.statusCode).toBe(503);
    expect(res.body.error).toBe('Kitchen service unavailable');
    expect(mockLogger.error).toHaveBeenCalledWith('Error fetching orders: Kitchen service unavailable');
  });

  it("should handle errors properly for GET /orders/:orderId", async () => {
    const error = new Error('Order not found');
    error.response = { status: 404 };
    mockGet.mockRejectedValue(error);
    
    const res = await request(app).get("/kitchen/orders/404");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Order not found');
    expect(mockLogger.error).toHaveBeenCalledWith('Error fetching order 404: Order not found');
  });

  it("should handle errors properly for POST /orders", async () => {
    const error = new Error('Invalid order');
    error.response = { status: 400 };
    mockPost.mockRejectedValue(error);
    
    const res = await request(app)
      .post("/kitchen/orders")
      .send({ item: "invalid" });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid order');
    expect(mockLogger.error).toHaveBeenCalledWith('Error creating order: Invalid order');
  });

  it("should handle errors properly for GET /orders/recipes", async () => {
    const error = new Error('Recipes not found');
    error.response = { status: 404 };
    mockGet.mockRejectedValue(error);
    
    const res = await request(app).get("/kitchen/orders/recipes");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Recipes not found');
    expect(mockLogger.error).toHaveBeenCalledWith('Error fetching order recipes: Recipes not found');
  });

  it("should handle errors properly for GET /orders/today", async () => {
    const error = new Error('Today orders not found');
    error.response = { status: 404 };
    mockGet.mockRejectedValue(error);
    
    const res = await request(app).get("/kitchen/orders/today");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Today orders not found');
    expect(mockLogger.error).toHaveBeenCalledWith('Error fetching today orders: Today orders not found');
  });

  it("should handle generic errors", async () => {
    const error = new Error('Generic error');
    mockGet.mockRejectedValue(error);
    
    const res = await request(app).get("/kitchen/orders");
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Generic error');
  });
});
