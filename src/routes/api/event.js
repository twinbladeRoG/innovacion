const express = require('express');
const router = express.Router();

const { EventController } = require('../../controllers');

router.get('/', EventController.getAll);
router.get('/:id', EventController.getById);
router.post('/', EventController.create);
router.put('/', EventController.update);
router.delete('/:id', EventController.remove);

module.exports = router;
