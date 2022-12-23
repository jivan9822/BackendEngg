const AppError = require('../Error/AppError');
const { CatchAsync } = require('../Error/CatchAsync');
const Customer = require('../Models/CustomerModel');

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
  const customers = await Customer.find();
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
