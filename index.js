import express from 'express';
import mongoose from 'mongoose';
import { createProduct } from './controller/Product';

const server = express();

// middleware's

server.use(express.json()); // to parse req.body

main().catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/E-commerce');
  console.log('database connected');
}

server.get('/', (req, res) => {
  res.json({ status: 'success' });
});
server.post('/products', createProduct);

server.listen(8080, (req, res) => {
  console.log('server started');
});
