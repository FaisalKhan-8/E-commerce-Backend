import express from 'express';

const { createUser, loginUser, checkAuth } = require('../controller/Auth');
import passport from 'passport';

const router = express.Router();

// /auth is already added in base path
router
  .post('/signup', createUser)
  .post('/login', passport.authenticate('local'), loginUser)
  .get('/check', passport.authenticate('jwt'), checkAuth);

export default router;
