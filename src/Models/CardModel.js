const mongoose = require('mongoose');
const npmValid = require('validator');
const AppError = require('../Error/AppError');
const Customer = require('./CustomerModel');

const cardSchema = mongoose.Schema({
  // cardNumber string Auto_increment e.g: C001
  cardNumber: {
    type: String,
    default: Date.now().toString(),
    required: [true, 'Please provide card number!'],
  },
  // cardType String [REGULAR/SPECIAL]
  cardType: {
    type: String,
    required: [true, 'Please provide card type!'],
  },
  // customerName string
  customerName: {
    type: String,
    default: 'xyz',
    required: [true, 'Please provide customer name!'],
  },
  // status string [ACTIVE/INACTIVE] Default: ACTIVE
  status: {
    type: String,
    default: 'ACTIVE',
  },
  // vision string
  // Provide the world's best customer experience every day.
  vision: {
    type: String,
  },
  // customerID string Reference from customer table
  customerID: {
    type: mongoose.Types.ObjectId,
    unique: true,
    ref: 'Customer',
    required: [true, 'Please provide customer id!'],
  },
});

cardSchema.pre(/^find/, function (next) {
  this.find({ status: 'ACTIVE' });
  next();
});

cardSchema.pre('save', async function (next) {
  const customer = await Customer.findById(this.customerID);
  if (!customer) {
    return next(
      new AppError(`Customer with the id: ${this.customerID} not found!`, 400)
    );
  }
  const { firstName, lastName } = customer;
  this.customerName = `${firstName} ${lastName}`;
  next();
});

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
