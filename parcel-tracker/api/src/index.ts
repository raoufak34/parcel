import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import parcelRoutes from './routes/parcelRoutes';

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/parcels', parcelRoutes);

app.listen(port, () => {
  console.log(`🚚 Server running on http://localhost:${port}`);
});
