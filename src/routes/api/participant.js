const express = require('express');
const router = express.Router();

const { ParticipantController } = require('../../controllers');

/**
 * @url /api/participant
 */
router.get('/', ParticipantController.getAll);
router.get('/:id', ParticipantController.getById);
router.post('/', ParticipantController.create);
router.put('/', ParticipantController.update);
router.delete('/:id', ParticipantController.remove);
router.post('/filter', ParticipantController.filter);

router.post('/:id/event', ParticipantController.addEvents);
router.get('/:id/event', ParticipantController.getEvents);
router.put('/:id/event', ParticipantController.removeEvents);

router.post('/:id/group', ParticipantController.addGroups);
router.get('/:id/group', ParticipantController.getGroups);
router.put('/:id/group', ParticipantController.removeGroups);

module.exports = router;
