import express from 'express';
const router = express.Router();
import {
  createProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
} from '../controller/Product';
import Product from '../model/Product';

// /products is already added in base path
router
  .post('/', createProduct)
  .get('/', fetchAllProducts)
  .get('/:id', fetchProductById)
  .patch('/:id', updateProduct)
  .get('/update/test', async (req, res) => {
    const products = await Product.find({});
    for (let product of products) {
      product.discountPrice = Math.round(
        product.price * (1 - product.discountPrice / 100)
      );
      await product.save();
      console.log(product.title + 'updated');
    }

    res.send('ok');
  });

export default router;
