require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Import route files
const kitchenRoutes = require('./routes/kitchen');
const cellarRoutes = require('./routes/cellar');

// Use routes
app.use('/kitchen', kitchenRoutes);
app.use('/cellar', cellarRoutes);

app.listen(process.env.PORT, () => {
  console.log(`API Gateway running on port ${process.env.PORT}`);
});