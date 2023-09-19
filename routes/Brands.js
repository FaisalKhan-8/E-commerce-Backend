import express from 'express';
import { createBrand, fetchBrands } from '../controller/Brand';
const router = express.Router();

// /brands is already added in base path
router.get('/', fetchBrands).post('/', createBrand);

export default router;
