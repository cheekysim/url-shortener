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
  if (!verifyToken(req.headers.authorization)) {
    res.sendStatus(403);
    return;
  }
  const urls = await db.read('urls');
  res.send(JSON.stringify(urls));
});

router.post('/data', async (req, res) => {
  if (!verifyToken(req.headers.authorization)) {
    res.sendStatus(403);
    return;
  }
  const { long, short } = req.body;
  const data = await db.write('urls', { long, short });
  res.send(data);
});

export default router;

function verifyToken(bearerHeader: string): boolean {
  if (typeof bearerHeader === 'undefined') return false;
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  if (bearerToken !== process.env.API_TOKEN) return false;
  return true;
}
