const express = require('express');
const router = express.Router();

router.use('/participant', require('./participant'));
router.use('/event', require('./event'));

module.exports = router;
