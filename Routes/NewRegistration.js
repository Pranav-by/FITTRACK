const express = require('express');
const router = express.Router();
const registrationController = require('../Controllers/NewRegistration');

// POST: Create registration
router.post('/', registrationController.createRegistration);

// GET: All registrations
router.get('/', registrationController.getAllRegistrations);

// GET: Single registration by ID
router.get('/:id', registrationController.getRegistrationById);

// PUT: Update registration
router.put('/:id', registrationController.updateRegistration);

// DELETE: Delete registration
router.delete('/:id', registrationController.deleteRegistration);

module.exports = router;
