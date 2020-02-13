const express = require('express')
const dotenv = require('dotenv');
const chalk = require('chalk');
const morgan = require('morgan');
const logger = require('./src/middlewares/logger');

dotenv.config();
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'production';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: logger.stream }));

app.use('/api', require('./src/routes/api'));

app.listen(port, () =>
  console.log(`> Server started at PORT: ${chalk.green(port)}, mode: ${chalk.blue(env)}`)
);