const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

router.post('/employees', employeesController.createEmployee);
router.get('/employees/:id', employeesController.getEmployee);
router.get('/employees', employeesController.getEmployees);
router.get('/employeesreport', employeesController.getReportEmployee);
router.put('/employees/:id', employeesController.putEmployee);
router.delete('/employees/:id', employeesController.deleteEmployee);

module.exports = router;