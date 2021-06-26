const jwt = require('jsonwebtoken');

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
    res.status(401).send({ message: 'Необходима авторизация' });
    return;
  }

  let payload;

  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
    return;
  }

  req.user = payload;

  next();
};
