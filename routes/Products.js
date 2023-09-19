import express from 'express';
const router = express.Router();
import {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} from '../controller/Product';

// /products is already added in base path
router
  .post('/', createProduct)
  .get('/', fetchAllProducts)
  .get('/:id', fetchProductById)
  .patch('/:id', updateProduct);

export default router;
