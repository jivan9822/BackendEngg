const mongoose = require('mongoose');
const npmValid = require('validator');
const { v4: uuidv4 } = require('uuid');

const customerSchema = mongoose.Schema({
  // firstName string
  firstName: {
    type: String,
    required: [true, 'Please provide First Name!'],
    validate: {
      validator: (el) => npmValid.isAlpha(el),
      message: 'Please enter only alphabets!',
    },
  },
  // lastName string
  lastName: {
    type: String,
    required: [true, 'Please provide Last Name!'],
    validate: {
      validator: (el) => npmValid.isAlpha(el),
      message: 'Please enter only alphabets!',
    },
  },
  // mobileNumber string 10 digits long
  mobileNumber: {
    type: String,
    unique: true,
    required: [true, 'Please provide Mobile Number!'],
    validate: {
      validator: (el) => npmValid.isMobilePhone(el, ['en-IN']),
    },
  },
  // DOB date
  DOB: {
    type: String,
    validate: {
      validator: (el) =>
        new Date(el) < Date.now() && npmValid.isDate(el, new Date()),
      message:
        'Invalid Date! Date should be less than today and format YYYY-MM-DD',
    },
  },
  // emailID string abc@xyz.com
  emailID: {
    type: String,
    required: [true, 'Please provide a email!'],
    unique: true,
    validate: {
      validator: (el) => npmValid.isEmail(el),
      message: 'Please provide a valid email ex. abc@xyz.com',
    },
  },
  // address string
  address: {
    type: String,
    required: [true, 'Please provide your address!'],
  },
  // customerID string UUID
  customerID: {
    type: String,
    default: uuidv4(),
  },
  // status string ACTIVE / INACTIVE
  status: {
    type: String,
    default: 'ACTIVE',
  },
});

// THIS WILL HIDE ALL INACTIVE CUSTOMERS IN QUERY
customerSchema.pre(/^find/, function (next) {
  this.find({ status: 'ACTIVE' });
  next();
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
