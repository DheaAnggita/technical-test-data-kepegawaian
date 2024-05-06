const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');

router.post('/education', educationController.createEducation);
router.get('/education/:id', educationController.getEducationById);
router.get('/education', educationController.getEducation);
router.put('/education/:id', educationController.putEducation);
router.delete('/education/:id', educationController.deleteEducation);

module.exports = router;