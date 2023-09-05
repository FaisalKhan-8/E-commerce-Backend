import express from 'express';
import {
  createOrder,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
} from '../controller/Order';

const router = express.Router();
//  /orders is already added in base path
router
  .post('/', createOrder)
  .get('/', fetchOrdersByUser)
  .delete('/:id', deleteOrder)
  .patch('/:id', updateOrder);

export default router;
