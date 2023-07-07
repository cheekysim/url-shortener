import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { MongoDB } from '../../../db.js';

dotenv.config();

// Configure API routes
const __dirname = path.dirname(import.meta.url);
const router = express.Router({ mergeParams: true });
const apiPath = '/' + __dirname.split(/[\\/]/g).slice(-2).join('/');
router.use(apiPath, router);
console.log(apiPath);

// Configure MongoDB
const db = new MongoDB(
  process.env.MONGO_IP,
  process.env.MONGO_DB,
  process.env.MONGO_USER,
  process.env.MONGO_PASS
);

// API routes
router.get('/data', async (req, res) => {
  const urls = await db.read('urls');
  res.send(urls);
});

router.post('/create', async (req, res) => {
  const { long, short } = req.body;
  const data = await db.write('urls', { long, short });
  res.send(data);
});
export default router;
