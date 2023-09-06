import express from 'express';
const server = express();
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';

// passport imports
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Routes imports
import productsRouter from './routes/Products';
import categoriesRouter from './routes/Category';
import brandsRouter from './routes/Brands';
import userRouter from './routes/Users';
import authRouter from './routes/Auth';
import cartRouter from './routes/Cart';
import ordersRouter from './routes/Order';
import User from './model/User';
import { isAuth, sanitizeUser, cookieExtractor } from './services/common';

const SECRET_KEY = 'SECRET_KEY';
// JWT options
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY; // TODO: should not be in code;

// middleware's

server.use(express.static('build'));
server.use(cookieParser());

server.use(
  session({
    secret: 'keyboard cat',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate('session'));

server.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
);
server.use(express.json()); // to parse req.body

server.use('/products', isAuth(), productsRouter);
// we can also use JWT token for client-only auth
server.use('/categories', isAuth(), categoriesRouter);
server.use('/brands', isAuth(), brandsRouter);
server.use('/users', isAuth(), userRouter);
server.use('/auth', authRouter);
server.use('/cart', isAuth(), cartRouter);
server.use('/orders', isAuth(), ordersRouter);

// Passport Strategies
passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email' }, async function (
    email,
    password,
    done
  ) {
    // by default passport uses username
    try {
      const user = await User.findOne({ email: email });
      console.log(email, password, user);
      if (!user) {
        return done(null, false, { message: 'invalid credentials' }); // for safety
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        'sha256',
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: 'invalid credentials' });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null, { id: user.id, role: user.role }); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  'jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this creates session variable req.user on being called from callbacks
passport.serializeUser(function (user, cb) {
  console.log('serialize', user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this changes session variable req.user when called from authorized request

passport.deserializeUser(function (user, cb) {
  console.log('de-serialize', user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/E-commerce');
  console.log('database connected');
}

server.listen(8080, (req, res) => {
  console.log('server started');
});
