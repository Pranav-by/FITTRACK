const express = require('express');
const router = express.Router();
const gymAttendanceController = require('../Controllers/GymAttendance');

router.post('/', gymAttendanceController.createAttendance);
router.get('/', gymAttendanceController.getAllAttendance);
router.get('/:id', gymAttendanceController.getAttendanceById);
router.put('/:id', gymAttendanceController.updateAttendance);
router.delete('/:id', gymAttendanceController.deleteAttendance);

module.exports = router;
