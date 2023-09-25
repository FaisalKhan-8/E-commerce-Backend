import express from 'express';
import {
  createUser,
  loginUser,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
  logout,
} from '../controller/Auth';
import passport from 'passport';

const router = express.Router();

// /auth is already added in base path
router
  .post('/signup', createUser)
  .post('/login', passport.authenticate('local'), loginUser)
  .get('/check', passport.authenticate('jwt'), checkAuth)
  .get('/logout', logout)
  .post('/reset-password-request', resetPasswordRequest)
  .post('/reset-password', resetPassword);

export default router;
