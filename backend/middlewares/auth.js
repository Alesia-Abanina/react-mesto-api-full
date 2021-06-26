const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

const getToken = (bearerHeader) => {
  let token;
  if (bearerHeader) {
    [, token] = bearerHeader.split(' ');
  }
  return token;
};

module.exports = (req, res, next) => {
  const token = getToken(req.headers.authorization);
  if (!token) {
    throw new AuthError('Необходима авторизация');
  }

  let payload;

  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
