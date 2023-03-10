const AppError = require('../Error/AppError');
const { CatchAsync } = require('../Error/CatchAsync');
const Customer = require('../Models/CustomerModel');
const APIFeature = require('../Utils/APIFeature');

// CREATE NEW CUSTOMER CONTROLLER
exports.createNewCustomer = CatchAsync(async (req, res, next) => {
  const customer = await Customer.create(req.body);
  res.status(201).json({
    status: true,
    data: {
      customer,
    },
  });
});

exports.getAllCustomers = CatchAsync(async (req, res, next) => {
  const query = new APIFeature(Customer.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const customers = await query.query;
  // const customers = await Customer.find();
  if (!customers.length) {
    return next(new AppError(`No customers found!`, 404));
  }
  res.status(200).json({
    status: true,
    result: `${customers.length} customers found!`,
    data: {
      customers,
    },
  });
});

// DELETE CUSTOMER CONTROLLER
exports.deleteCustomer = CatchAsync(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(
    req.body.custId,
    {
      $set: { status: 'INACTIVE' },
    },
    { new: true }
  );
  res.status(204).json({
    status: true,
    data: null,
  });
});
