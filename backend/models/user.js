const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthenticationError = require('../errors/authentication-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        const expression = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}[a-zA-Z0-9-._~:/?#@!$&'()*+,;=[]]*/gi;
        return expression.test(v);
      },
      message: (props) => `${props.value} не валидный url`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(s) {
        return validator.isEmail(s);
      },
      message: 'Wrong email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthenticationError('Неправильный логин или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthenticationError('Неправильный логин или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
