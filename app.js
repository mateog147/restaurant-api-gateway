import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import kitchenRoutes from './src/routes/kitchen.js';
import cellarRoutes from './src/routes/cellar.js';
import swaggerUi from 'swagger-ui-express';
import specs from './src/swagger.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/kitchen', kitchenRoutes);
app.use('/cellar', cellarRoutes);

app.listen(process.env.PORT, () => {
    console.log(`API Gateway running on port ${process.env.PORT}`);
});
