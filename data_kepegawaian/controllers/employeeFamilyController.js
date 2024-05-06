const { Employee, EmployeeFamily } = require('../models');
const employeeFamilyController = {
    async getFamily(req, res) {
      try{
        let family;
        const { employee_id } = req.query;
        if (employee_id) {
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                return res.status(404).json({
                    code: 404,
                    message: 'Employee not found',
                    data: null
                });
            }
            family = await EmployeeFamily.findAll({ where: { employee_id: employee_id} });
        } else {
            family = await EmployeeFamily.findAll();
        }
        res.status(200).json({
            code: 200,
            message: 'Get Family Success',
            data: family
        });
      } catch(error) {
        res.status(500).json({
          code: 500,
          message: 'Internal server error',
          data: null
        });
      }
    },

    async getFamilyById(req, res) {
      try{
        let family;
        if (!req.params.id) {
          return res.status(400).json({
            code: 400,
            message: 'id is required',
            data: null
          });
        }
        family = await EmployeeFamily.findOne({ where: { id: req.params.id } });
        return res.status(200).json({
            code: 200,
            message: 'Get family Success',
            data: family
        });
      } catch(error) {
        res.status(500).json({
          code: 500,
          message: 'Internal server error',
          data: null
        });
      }
    },

    async createFamily(req, res) {
      try {
        const { employee_id, name, identifier,job, place_of_birth, date_of_birth, religion, is_life, is_divorced, relation_status, created_by } = req.body;
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            return res.status(404).json({
                code: 404,
                message: 'Employee not found',
                data: null
            });
        }
        const allowedReligion = ['Islam', 'Katolik', 'Buda', 'Protestan', 'Konghucu'];
        if (!allowedReligion.includes(religion)) {
            return res.status(400).json({
                code: 400,
                message: 'Invalid religion. Must be Islam, Katolik, Buda, Protestan, Konghucu',
                data: null
            });
        }
        const allowedStatus = ['Suami', 'Istri', 'Anak', 'Anak Sambung'];
        if (!allowedStatus.includes(relation_status)) {
            return res.status(400).json({
                code: 400,
                message: 'Invalid relation_status. Must be Suami, Istri, Anak, Anak Sambung',
                data: null
            });
        }
        const family = EmployeeFamily.create({
            employee_id, 
            name, 
            identifier,
            job, 
            place_of_birth, 
            date_of_birth, 
            religion, 
            is_life, 
            is_divorced, 
            relation_status, 
            created_by
        });
        return res.status(201).json({
            code: 201,
            message: 'Family created successfully',
            data: family
        });
      } catch (error) {
          return res.status(500).json({
              code: 500,
              message: 'Internal server error',
              data: null
          });
      }
    },

    async putFamily(req, res) {
        try {
            const { employee_id, name, identifier,job, place_of_birth, date_of_birth, religion, is_life, is_divorced, relation_status, updated_by } = req.body;
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                return res.status(404).json({
                    code: 404,
                    message: 'Employee not found',
                    data: null
                });
            }
            const family = await EmployeeFamily.findByPk(req.params.id);
            if (!family) {
                return res.status(404).json({
                    code: 404,
                    message: 'Family not found',
                    data: null
                });
            }
            const allowedReligion = ['Islam', 'Katolik', 'Buda', 'Protestan', 'Konghucu'];
            if (!allowedReligion.includes(religion)) {
                return res.status(400).json({
                    code: 400,
                    message: 'Invalid religion. Must be Islam, Katolik, Buda, Protestan, Konghucu',
                    data: null
                });
            }
            const allowedStatus = ['Suami', 'Istri', 'Anak', 'Anak Sambung'];
            if (!allowedStatus.includes(relation_status)) {
                return res.status(400).json({
                    code: 400,
                    message: 'Invalid relation_status. Must be Suami, Istri, Anak, Anak Sambung',
                    data: null
                });
            }
            await family.update({
                employee_id, 
                name, 
                identifier,
                job, 
                place_of_birth, 
                date_of_birth, 
                religion, 
                is_life, 
                is_divorced, 
                relation_status, 
                updated_by
            });
            return res.json({
                code: 200,
                message: 'Family updated successfully',
                data: family
            });
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: 'Internal server error',
                data: null
            });
        }
    },

    async deleteFamily(req, res) {
      try {
        const family = await EmployeeFamily.findByPk(req.params.id);
        if (!family) {
            return res.status(404).json({
                code: 404,
                message: 'Family not found',
                data: null
            });
        }
        await family.destroy();
        return res.json({
            code: 200,
            message: 'Family deleted successfully',
            data: null
        });
      } catch (error) {
          return res.status(500).json({
              code: 500,
              message: 'Internal server error',
              data: null
          });
      }
    }
  };
  
  module.exports = employeeFamilyController;
