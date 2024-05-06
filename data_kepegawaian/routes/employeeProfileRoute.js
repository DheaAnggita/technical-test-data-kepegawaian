const express = require('express');
const router = express.Router();
const employeeProfileController = require('../controllers/employeeProfileController');

router.post('/profile', employeeProfileController.createProfile);
router.get('/profile/:id', employeeProfileController.getProfileById);
router.get('/profile', employeeProfileController.getProfile);
router.put('/profile/:id', employeeProfileController.putProfile);
router.delete('/profile/:id', employeeProfileController.deleteProfile);

module.exports = router;