import Category from '../model/Category';

export async function fetchCategory(req, res) {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function createCategory(req, res) {
  const category = new Category(req.body);
  try {
    const doc = await category.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
}
