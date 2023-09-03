import Product from '../model/Product';

export async function createProduct(req, res) {
  // this product we have to get from the API body
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
}
