const logger = require('../middlewares/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  res.status(err.code || 500).json({ message: err.message });
  next();
};

module.exports = errorHandler;
