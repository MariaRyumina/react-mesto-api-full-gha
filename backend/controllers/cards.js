const Card = require('../models/card');
const httpCode = require('../httpCode');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
        return;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => Error('NotFound'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Нельзя удалять карточки других пользователей!'));
        return;
      }
      Card.deleteOne({ _id: card._id })
        .then(() => res.status(httpCode.OK_REQUEST).send({ message: 'Карточка успешно удалена' }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Удаление карточки с некорректным id'));
        return;
      } if (err.message === 'NotFound') {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
        return;
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => Error('NotFound'))
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные для постановки лайка'));
        return;
      } if (err.message === 'NotFound') {
        next(new NotFoundError('Передан несуществующий _id карточки'));
        return;
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => Error('NotFound'))
    .then((data) => res.send({ data }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные для снятии лайка'));
        return;
      } if (err.message === 'NotFound') {
        next(new NotFoundError('Передан несуществующий _id карточки'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
