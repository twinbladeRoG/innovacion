const express = require('express');
const router = express.Router();

const { RoleController } = require('../../controllers');

router.get('/', RoleController.getAll);
router.get('/:id', RoleController.getById);
router.post('/', RoleController.create);
router.put('/', RoleController.update);
router.delete('/:id', RoleController.remove);

module.exports = router;
