const { Employee, EmployeeProfile } = require('../models');
const employeeProfileController = {
    async getProfile(req, res) {
      try{
        let profile;
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
            profile = await EmployeeProfile.findAll({ where: { employee_id: employee_id} });
        } else {
            profile = await EmployeeProfile.findAll();
        }
        res.status(200).json({
            code: 200,
            message: 'Get Profile Success',
            data: profile
        });
      } catch(error) {
        res.status(500).json({
          code: 500,
          message: 'Internal server error',
          data: null
        });
      }
    },

    async getProfileById(req, res) {
      try{
        let profile;
        if (!req.params.id) {
          return res.status(400).json({
            code: 400,
            message: 'id is required',
            data: null
          });
        }
        profile = await EmployeeProfile.findOne({ where: { id: req.params.id } });
        return res.status(200).json({
            code: 200,
            message: 'Get Profile Success',
            data: profile
        });
      } catch(error) {
        res.status(500).json({
          code: 500,
          message: 'Internal server error',
          data: null
        });
      }
    },

    async createProfile(req, res) {
      try {
        const { employee_id, place_of_birth, date_of_birth, gender, is_married, prof_pict, created_by } = req.body;
        const employee = await Employee.findByPk(employee_id);
        if (!employee) {
            return res.status(404).json({
                code: 404,
                message: 'Employee not found',
                data: null
            });
        }
        const allowedGender = ['Laki-Laki', 'Perempuan'];
        if (!allowedGender.includes(gender)) {
            return res.status(400).json({
                code: 400,
                message: 'Invalid gender. Must be Laki-Laki or Perempuan',
                data: null
            });
        }
        const profile = EmployeeProfile.create({
            employee_id, 
            place_of_birth, 
            date_of_birth, 
            gender, 
            is_married, 
            prof_pict, 
            created_by
        });
        return res.status(201).json({
            code: 201,
            message: 'Profile created successfully',
            data: profile
        });
      } catch (error) {
          return res.status(500).json({
              code: 500,
              message: 'Internal server error',
              data: null
          });
      }
    },

    async putProfile(req, res) {
        try {
            const { employee_id, place_of_birth, date_of_birth, gender, is_married, prof_pict, updated_by } = req.body;
            const employee = await Employee.findByPk(employee_id);
            if (!employee) {
                return res.status(404).json({
                    code: 404,
                    message: 'Employee not found',
                    data: null
                });
            }
            const profile = await EmployeeProfile.findByPk(req.params.id);
            if (!profile) {
                return res.status(404).json({
                    code: 404,
                    message: 'Profile not found',
                    data: null
                });
            }
            const allowedGender = ['Laki-Laki', 'Perempuan'];
            if (!allowedGender.includes(gender)) {
                return res.status(400).json({
                    code: 400,
                    message: 'Invalid gender. Must be Laki-Laki or Perempuan',
                    data: null
                });
            }
            await profile.update({
                employee_id, 
                place_of_birth, 
                date_of_birth, 
                gender, 
                is_married, 
                prof_pict, 
                updated_by
            });
            return res.json({
                code: 200,
                message: 'Profile updated successfully',
                data: profile
            });
        } catch (error) {
            return res.status(500).json({
                code: 500,
                message: 'Internal server error',
                data: null
            });
        }
    },

    async deleteProfile(req, res) {
      try {
        const profile = await EmployeeProfile.findByPk(req.params.id);
        if (!profile) {
            return res.status(404).json({
                code: 404,
                message: 'Profile not found',
                data: null
            });
        }
        await profile.destroy();
        return res.json({
            code: 200,
            message: 'Profile deleted successfully',
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
  
  module.exports = employeeProfileController;
