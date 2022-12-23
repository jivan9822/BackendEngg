const AppError = require('../Error/AppError');
const { CatchAsync } = require('../Error/CatchAsync');
const Card = require('../Models/CardModel');
const Customer = require('../Models/CustomerModel');

// CREATE NEW CARD CONTROLLER
exports.createNewCard = CatchAsync(async (req, res, next) => {
  const card = await Card.create(req.body);
  res.status(201).json({
    status: true,
    message: 'Card created Successfully!',
    data: {
      card,
    },
  });
});

// GET ALL CARD CONTROLLER
exports.getAllCard = CatchAsync(async (req, res, next) => {
  const cards = await Card.find();
  if (!cards.length) {
    return next(new AppError(`No Cards found!`, 404));
  }
  res.status(200).json({
    status: true,
    result: `${cards.length} cards found!`,
    data: {
      cards,
    },
  });
});
