const express = require('express');
const router = express.Router();

const { ParticipantController } = require('../../controllers');

router.get('/', ParticipantController.getAll);
router.get('/:id', ParticipantController.getById);
router.post('/filter', ParticipantController.filter);

module.exports = router;
