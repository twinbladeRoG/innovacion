const express = require('express');
const router = express.Router();

router.use('/participant', require('./participant'))

module.exports = router;