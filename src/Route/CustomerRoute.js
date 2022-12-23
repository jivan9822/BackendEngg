const router = require('express').Router();
const customer = require('../Controller/CustomerController');

router
  .route('/')
  .post(customer.createNewCustomer)
  .get(customer.getAllCustomers)
  .delete(customer.deleteCustomer);

module.exports = router;
