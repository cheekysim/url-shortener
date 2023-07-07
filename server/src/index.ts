import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api/v1/api.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { MongoDB } from './db.js';
import path from 'path';

dotenv.config();

const __dirname = path.dirname(import.meta.url);

const app = express();
const port = process.env.PORT || 3000;

// app config
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(morgan('common'));
app.use(api);

// Configure MongoDB
const db = new MongoDB(
  process.env.MONGO_IP,
  process.env.MONGO_DB,
  process.env.MONGO_USER,
  process.env.MONGO_PASS
);

// Handle 404 requests
app.all('*', (req, res) => {
  // Redirect the user to the homepage if the request is not an API request
  if (!req.path.includes('/api/')) {
    db.read('urls', { short: req.path.slice(1) }).then((data) => {
      if (data.length) {
        res.redirect(data[0].long);
      } else {
        console.log(path.join(__dirname, '../client/dist', 'index.html'));
        res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
      }
    });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
