const express = require('express');
const router = express.Router();

const ParticipantController = require('../../controllers').ParticipantController;

router.use('/', ParticipantController.get);

module.exports = router;
