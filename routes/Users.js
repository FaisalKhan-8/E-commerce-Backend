import express from 'express';
import { fetchUserById, updateUser } from '../controller/User';
const router = express.Router();

// /users is already added in base path
router.get('/:id', fetchUserById).patch('/:id', updateUser);

export default router;
