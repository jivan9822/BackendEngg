const express = require('express');
const mongoose = require('mongoose');
const cusRoute = require('./Route/CustomerRoute');
const cardRoute = require('./Route/CardRoute');
const AppError = require('./Error/AppError');
const { globalErrorHandler } = require('./Error/globalError');
require('dotenv').config({ path: 'config.env' });

const app = express();
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('Connection to mongoDb success!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/customer', cusRoute);
app.use('/card', cardRoute);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`The ${req.originalUrl} not found on this Server!`, 404)
  );
});

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
