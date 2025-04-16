const express = require('express');
const router = express.Router();
const memberController = require('../Controllers/Members');

// Create a new member
router.post('/', memberController.createMember);

// Get all members
router.get('/', memberController.getAllMembers);

// Get member by ID
router.get('/:id', memberController.getMemberById);

// Update member details
router.put('/:id', memberController.updateMember);

// Delete member by ID
router.delete('/:id', memberController.deleteMember);

module.exports = router;
