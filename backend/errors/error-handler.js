const WrongDataError = require('./wrong-data-err');

const getError = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return new WrongDataError('Переданы некорректные данные');
  }
  return err;
};

module.exports = getError;
