const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const WrongUserError = require('../errors/wrong-user-err');
const getError = require('../errors/error-handler');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards.reverse()))
    .catch((err) => next(getError(err)));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => next(getError(err)));
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      } else if (String(card.owner._id) !== req.user._id) {
        throw new WrongUserError('Можно удалять только собственные посты');
      }

      Card.findByIdAndRemove(req.params.cardId)
        .then((removedCard) => {
          if (!removedCard) {
            throw new NotFoundError('Карточка с указанным _id не найдена');
          }
          res.send({ message: 'Пост удалён' });
        });
    })
    .catch((err) => next(getError(err)));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.send(card);
    })
    .catch((err) => next(getError(err)));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.send(card);
    })
    .catch((err) => next(getError(err)));
};
