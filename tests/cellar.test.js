import express from 'express';
import request from 'supertest';
import { jest } from '@jest/globals';


const mockLogger = {
  log: jest.fn(),
  error: jest.fn()
};


jest.unstable_mockModule('../src/common/logger.js', () => ({
  default: mockLogger
}));


const mockGet = jest.fn();
jest.unstable_mockModule('axios', () => ({
  default: {
    get: mockGet
  }
}));


const { default: cellarRouter } = await import('../src/routes/cellar.js');

describe('Cellar Router', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/cellar', cellarRouter);
    
    // Reset mocks
    mockGet.mockClear();
    mockLogger.log.mockClear();
    mockLogger.error.mockClear();
  });

  it('GET /cellar/ingredients/available', async () => {
    mockGet.mockResolvedValue({ data: { ingredients: ['tomato', 'cheese'] } });
    
    const res = await request(app).get('/cellar/ingredients/available');
    expect(res.statusCode).toBe(200);
    expect(res.body.ingredients).toEqual(['tomato', 'cheese']);
    expect(mockLogger.log).toHaveBeenCalledWith('GET /ingredients/available called');
  });

  it('GET /cellar/movements/in', async () => {
    mockGet.mockResolvedValue({ data: { movements: ['in1', 'in2'] } });
    
    const res = await request(app).get('/cellar/movements/in');
    expect(res.statusCode).toBe(200);
    expect(res.body.movements).toEqual(['in1', 'in2']);
    expect(mockLogger.log).toHaveBeenCalledWith('GET /movements/in called');
  });

  it('GET /cellar/movements/out', async () => {
    mockGet.mockResolvedValue({ data: { movements: ['out1', 'out2'] } });
    
    const res = await request(app).get('/cellar/movements/out');
    expect(res.statusCode).toBe(200);
    expect(res.body.movements).toEqual(['out1', 'out2']);
    expect(mockLogger.log).toHaveBeenCalledWith('GET /movements/out called');
  });

  it('GET /cellar/health', async () => {
    mockGet.mockResolvedValue({ data: { status: 'healthy' } });
    
    const res = await request(app).get('/cellar/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(mockLogger.log).toHaveBeenCalledWith('GET /health called');
  });

  it('should handle errors properly for GET /ingredients/available', async () => {
    const error = new Error('Service unavailable');
    error.response = { status: 503 };
    mockGet.mockRejectedValue(error);
    
    const res = await request(app).get('/cellar/ingredients/available');
    expect(res.statusCode).toBe(503);
    expect(res.body.error).toBe('Service unavailable');
    expect(mockLogger.error).toHaveBeenCalledWith('Error fetching ingredients available: Service unavailable');
  });

  it('should handle errors properly for GET /movements/in', async () => {
    const error = new Error('Service unavailable');
    error.response = { status: 503 };
    mockGet.mockRejectedValue(error);
    
    const res = await request(app).get('/cellar/movements/in');
    expect(res.statusCode).toBe(503);
    expect(res.body.error).toBe('Service unavailable');
    expect(mockLogger.error).toHaveBeenCalledWith('Error fetching movements in: Service unavailable');
  });

  it('should handle errors properly for GET /movements/out', async () => {
    const error = new Error('Service unavailable');
    error.response = { status: 503 };
    mockGet.mockRejectedValue(error);
    
    const res = await request(app).get('/cellar/movements/out');
    expect(res.statusCode).toBe(503);
    expect(res.body.error).toBe('Service unavailable');
    expect(mockLogger.error).toHaveBeenCalledWith('Error fetching movements out: Service unavailable');
  });

  it('should handle errors properly for GET /health', async () => {
    const error = new Error('Service unavailable');
    error.response = { status: 503 };
    mockGet.mockRejectedValue(error);
    
    const res = await request(app).get('/cellar/health');
    expect(res.statusCode).toBe(503);
    expect(res.body.error).toBe('Service unavailable');
    expect(mockLogger.error).toHaveBeenCalledWith('Error fetching cellar health: Service unavailable');
  });

  it("should handle generic errors", async () => {
    const error = new Error('Generic error');
    mockGet.mockRejectedValue(error);
    
    const res = await request(app).get("/cellar/health");
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Generic error');
  });
});
