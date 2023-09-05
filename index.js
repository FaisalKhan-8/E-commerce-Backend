import express from 'express';
const server = express();
import mongoose from 'mongoose';
import cors from 'cors';

// Routes imports
import productRouter from './routes/Products';
import categoriesRouter from './routes/Category';
import brandsRouter from './routes/Brands';
import userRouter from './routes/Users';
import authRouter from './routes/Auth';
import cartRouter from './routes/Cart';
import ordersRouter from './routes/Order';

// middleware's
server.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
);
server.use(express.json()); // to parse req.body

server.use('/products', productRouter);
server.use('/categories', categoriesRouter);
server.use('/brands', brandsRouter);
server.use('/users', userRouter);
server.use('/auth', authRouter);
server.use('/cart', cartRouter);
server.use('/orders', ordersRouter);

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

server.listen(8080, (req, res) => {
  console.log('server started');
});
