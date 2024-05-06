const { Education, Employee } = require('../models');
const educationController = {
    async getEducation(req, res) {
      try{
        let education;
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
            education = await Education.findAll({ where: { employee_id: employee_id} });
        } else {
            education = await Education.findAll();
        }
        res.status(200).json({
            code: 200,
            message: 'Get Education Success',
            data: education
        });
      } catch(error) {
        res.status(500).json({
          code: 500,
          message: 'Internal server error',
          data: null
        });
      }
    },

    async getEducationById(req, res) {
      try{
        let education;
        if (!req.params.id) {
          return res.status(400).json({
            code: 400,
            message: 'id is required',
            data: null
          });
        }
        education = await Education.findOne({ where: { id: req.params.id } });
        return res.status(200).json({
            code: 200,
            message: 'Get Education Success',
            data: education
        });
      } catch(error) {
        res.status(500).json({
          code: 500,
          message: 'Internal server error',
          data: null
        });
      }
    },

    async createEducation(req, res) {
      try {
        const { employee_id, name, level, description, created_by} = req.body;
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            return res.status(404).json({
                code: 404,
                message: 'Employee not found',
                data: null
            });
        }
        if (!description) {
            return res.status(400).json({
                code: 400,
                message: 'Description is required',
                data: null
            });
        }
        if (!created_by) {
            return res.status(400).json({
                code: 400,
                message: 'created_by is required',
                data: null
            });
        }
        const allowedLevels = ['Tk', 'Sd', 'Smp', 'Sma', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor'];
        if (!allowedLevels.includes(level)) {
            return res.status(400).json({
                code: 400,
                message: 'Invalid education level. Must be Tk, Sd, Smp, Sma, Strata 1, Strata 2, Doktor, or Profesor',
                data: null
            });
        }
        const education = Education.create({
            employee_id, 
            name, 
            level, 
            description,
            created_by,
            updated_by: ''
        });
        return res.status(201).json({
            code: 201,
            message: 'Education created successfully',
            data: education
        });
      } catch (error) {
          return res.status(500).json({
              code: 500,
              message: 'Internal server error',
              data: null
          });
      }
    },

    async putEducation(req, res) {
        try {
            const { employee_id, name, level, description, updated_by } = req.body;
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                return res.status(404).json({
                    code: 404,
                    message: 'Employee not found',
                    data: null
                });
            }
            const education = await Education.findByPk(req.params.id);
            if (!education) {
                return res.status(404).json({
                    code: 404,
                    message: 'Education not found',
                    data: null
                });
            }
            if (!description) {
                return res.status(400).json({
                    code: 400,
                    message: 'Description is required',
                    data: null
                });
            }
            if (!updated_by) {
                return res.status(400).json({
                    code: 400,
                    message: 'updated_by is required',
                    data: null
                });
            }
            const allowedLevels = ['Tk', 'Sd', 'Smp', 'Sma', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor'];
            if (!allowedLevels.includes(level)) {
            return res.status(400).json({
                code: 400,
                message: 'Invalid education level. Must be Tk, Sd, Smp, Sma, Strata 1, Strata 2, Doktor, or Profesor',
                data: null
            });
            }
            await education.update({
                employee_id, 
                name, 
                level, 
                description, 
                updated_by
            });
            return res.json({
                code: 200,
                message: 'Education updated successfully',
                data: education
            });
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: 'Internal server error',
                data: null
            });
        }
    },

    async deleteEducation(req, res) {
      try {
        const education = await Education.findByPk(req.params.id);
        if (!education) {
            return res.status(404).json({
                code: 404,
                message: 'Education not found',
                data: null
            });
        }
        await education.destroy();
        return res.json({
            code: 200,
            message: 'Education deleted successfully',
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
  
  module.exports = educationController;
