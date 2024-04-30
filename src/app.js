const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./configs/db.config');
const userRoute = require('./routes/user.route');
// const globalErrorHandler = require('./src/routes/error.controller');
const globalErrorHandler = require('./middlewares/error.middleware');

const app = express();
dotenv.config();
dbConnect();
app.use(express.json());
app.use('/user',userRoute);
app.use(globalErrorHandler);

module.exports = app;

