const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

const whitelist = [
  'https://mesto.abanina.nomoredomains.monster',
  'http://mesto.abanina.nomoredomains.monster',
  'http://localhost:3000'
];

var corsOptions = {
  origin: (origin, callback) => {
    console.log(`origin='${origin}'`);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req, res) => res.status(404).send({
  message: 'Ресурс не найден. Проверьте URL и метод запроса',
}));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
  } else if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
