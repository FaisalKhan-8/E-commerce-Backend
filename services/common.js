import passport from 'passport';

export function isAuth(req, res, done) {
  return passport.authenticate('jwt');
}

export function sanitizeUser(user) {
  return { id: user.id, role: user.role };
}

export function cookieExtractor(req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  //TODO : this is temporary token for testing without cookie
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjlhNzIyNmI5YzE4YzkxZjIyMGEwMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NDMyNzc1NX0.LmU8BPlsR-7QKkLKfAyCt1qASv079QyipPghd3Vj3y0';
  return token;
}
