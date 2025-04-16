const express = require('express');
const router = express.Router();
const earningController = require('../Controllers/EarningPayments');

router.post('/', earningController.createEarning);
router.get('/', earningController.getAllEarnings);
router.get('/:id', earningController.getEarningById);
router.put('/:id', earningController.updateEarning);
router.delete('/:id', earningController.deleteEarning);

module.exports = router;
