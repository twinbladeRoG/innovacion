const express = require('express');
const router = express.Router();

router.use('/participant', require('./participant'));
router.use('/event', require('./event'));
router.use('/group', require('./group'));
router.use('/member', require('./member'));
router.use('/role', require('./role'));
router.use('/permission', require('./permission'));
router.use('/variable', require('./variable'));

module.exports = router;
