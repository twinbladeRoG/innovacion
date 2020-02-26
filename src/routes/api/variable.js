const express = require('express');
const router = express.Router();

const { VariableController } = require('../../controllers');

router.get('/', VariableController.getAll);
router.get('/:id', VariableController.getById);
router.post('/', VariableController.create);
router.put('/', VariableController.update);
router.delete('/:id', VariableController.remove);

module.exports = router;
