const express = require('express');
const router = express.Router();

const { PermissionController } = require('../../controllers');

router.get('/', PermissionController.getAll);
router.get('/:id', PermissionController.getById);
router.post('/', PermissionController.create);
router.put('/', PermissionController.update);
router.delete('/:id', PermissionController.remove);

module.exports = router;
