const express = require('express');
const router = express.Router();

const { GroupController } = require('../../controllers');

/**
 * @url /api/group
 */
router.get('/', GroupController.getAll);
router.get('/:id', GroupController.getById);
router.post('/', GroupController.create);
router.put('/', GroupController.update);
router.delete('/:id', GroupController.remove);

router.post('/:id/event', GroupController.addEvents);
router.get('/:id/event', GroupController.getEvents);
router.put('/:id/event', GroupController.removeEvents);

router.post('/:id/participant', GroupController.addParticipants);
router.get('/:id/participant', GroupController.getParticipants);
router.put('/:id/participant', GroupController.removeParticipants);

module.exports = router;
