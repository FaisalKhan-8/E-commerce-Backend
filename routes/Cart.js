import { Router } from 'express';
import {
  addToCart,
  fetchCartByUser,
  deleteFromCart,
  updateCart,
} from '../controller/Cart';

const router = Router();
//  /products is already added in base path
router
  .post('/', addToCart)
  .get('/', fetchCartByUser)
  .delete('/:id', deleteFromCart)
  .patch('/:id', updateCart);

export default router;
