const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const WrongUserError = require('../errors/wrong-user-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch(next);
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
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  console.log(`req.user._id='${req.user._id}'`);
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.send(card);
    })
    .catch(next);
};
