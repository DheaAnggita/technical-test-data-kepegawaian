const express = require('express');
const router = express.Router();
const employeeFamilyController = require('../controllers/employeeFamilyController');

router.post('/family', employeeFamilyController.createFamily);
router.get('/family/:id', employeeFamilyController.getFamilyById);
router.get('/family', employeeFamilyController.getFamily);
router.put('/family/:id', employeeFamilyController.putFamily);
router.delete('/family/:id', employeeFamilyController.deleteFamily);

module.exports = router;