import Express from 'express';
import mongoose from 'mongoose';

const server = Express();
main().catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  console.log('database connected');
}

server.get('/', (req, res) => {
  res.json({ status: 'success' });
});

server.listen(8080, (req, res) => {
  console.log('server started');
});
