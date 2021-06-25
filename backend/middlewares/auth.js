const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(`token='${token}'`);
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
