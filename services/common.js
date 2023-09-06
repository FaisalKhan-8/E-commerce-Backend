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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjhkMDc3OGU0ZDdlMDJmMjU0MTUzZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NDAyNzk3Mn0.J9R62n_TMxpKdpJrWPIFrT3cw0GXpy9h1CsxfvnQbSI';
  return token;
}
