const express = require('express');
const router = express.Router();

const { GroupController } = require('../../controllers');

router.get('/', GroupController.getAll);
router.get('/:id', GroupController.getById);
router.post('/', GroupController.create);
router.put('/', GroupController.update);
router.delete('/:id', GroupController.remove);

module.exports = router;
