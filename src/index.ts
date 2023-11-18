import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api/v1/api.js';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

dotenv.config();

const app = express();
const port = 3005;

// app config
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(api);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
