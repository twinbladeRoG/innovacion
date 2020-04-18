const express = require('express');
const router = express.Router();
const { ParticipantController } = require('../../controllers');

const {
  validateParticipantID,
  validateParticipant,
  validateParticipantUpdate,
  validateFilter
} = require('../../validator/participant');

/**
 * @url /api/participant
 */
router.get('/', ParticipantController.getAll);
router.get('/:id', validateParticipantID, ParticipantController.getById);
router.post('/', validateParticipant, ParticipantController.create);
router.put('/:id', validateParticipantUpdate, ParticipantController.update);
router.delete('/:id', validateParticipantID, ParticipantController.remove);
router.post('/filter', validateFilter, ParticipantController.filter);

router.post('/:id/event', ParticipantController.addEvents);
router.get('/:id/event', ParticipantController.getEvents);
router.put('/:id/event', ParticipantController.removeEvents);

router.post('/:id/group', ParticipantController.addGroups);
router.get('/:id/group', ParticipantController.getGroups);
router.put('/:id/group', ParticipantController.removeGroups);

module.exports = router;
