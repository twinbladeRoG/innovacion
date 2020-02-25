const express = require('express');
const router = express.Router();

const { ParticipantController } = require('../../controllers');

router.get('/', ParticipantController.getAll);
router.get('/:id', ParticipantController.getById);
router.post('/', ParticipantController.create);
router.put('/', ParticipantController.update);
router.delete('/:id', ParticipantController.remove);
router.post('/filter', ParticipantController.filter);

module.exports = router;
