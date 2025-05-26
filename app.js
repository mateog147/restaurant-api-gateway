require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());


app.use(express.json());


const kitchenRoutes = require('./routes/kitchen');
const cellarRoutes = require('./routes/cellar');


app.use('/kitchen', kitchenRoutes);
app.use('/cellar', cellarRoutes);

app.listen(process.env.PORT, () => {
    console.log(`API Gateway running on port ${process.env.PORT}`);
});
