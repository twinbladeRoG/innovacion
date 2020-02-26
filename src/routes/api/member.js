const express = require('express');
const router = express.Router();

const { MemberController } = require('../../controllers');

router.get('/', MemberController.getAll);
router.get('/:id', MemberController.getById);
router.post('/', MemberController.create);
router.put('/', MemberController.update);
router.delete('/:id', MemberController.remove);

module.exports = router;
