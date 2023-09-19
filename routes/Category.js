import express from 'express';
import { createCategory, fetchCategory } from '../controller/Category';
const router = express.Router();

// /categories is already added in base path
router.get('/', fetchCategory).post('/', createCategory);

export default router;
