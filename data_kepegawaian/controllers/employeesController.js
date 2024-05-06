const { Employee, EmployeeProfile, Education, EmployeeFamily } = require('../models');
const employeeprofile = require('../models/employeeprofile');
const employeesController = {
  async getEmployees(req, res) {
    try {
      let employees;
      employees = await Employee.findAll({
        include: [
          { model: EmployeeProfile },
          { model: EmployeeFamily },
          { model: Education }
        ]
      });
      res.status(200).json({
        code: 200,
        message: 'Get Employees Success',
        data: employees
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: null
      });
    }
  },

  async getEmployee(req, res) {
    try {
      let employee;
      if (!req.params.id) {
        return res.status(400).json({
          code: 400,
          message: 'id is required',
          data: null
        });
      }
      employee = await Employee.findOne({
        where: { id: req.params.id },
        include: [
          { model: EmployeeProfile },
          { model: EmployeeFamily },
          { model: Education }
        ]
      });
      return res.status(200).json({
        code: 200,
        message: 'Get Employee Success',
        data: employee
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: null
      });
    }
  },

  async createEmployee(req, res) {
    try {
      const { nik, name, is_active, start_date, end_date, created_by, employeeProfile, employeeFamily, education } = req.body;
      if ((!start_date) || (!end_date)) {
        return res.status(400).json({
          code: 400,
          message: 'start_date and end_date are required',
          data: null
        });
      }
      if (employeeProfile) {
        const validGenders = ['Laki-Laki', 'Perempuan'];
        if (!validGenders.includes(employeeProfile.gender)) {
          return res.status(400).json({
            code: 400,
            message: 'Invalid gender for employee profile. Must be Laki-Laki or Perempuan',
            data: null
          });
        }
      }
      if (education) {
        const missingDescription = education.find(edu => !edu.description);
        if (missingDescription) {
          return res.status(400).json({
            code: 400,
            message: 'description on education is required',
            data: null
          });
        }
        const invalidLevels = education.filter(edu => !['Tk', 'Sd', 'Smp', 'Sma', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor'].includes(edu.level));
        if (invalidLevels.length) {
          return res.status(400).json({
            code: 400,
            message: 'Invalid education level(s). Must be Tk, Sd, Smp, Sma, Strata 1, Strata 2, Doktor, or Profesor',
            data: null
          });
        }
      }
      if (employeeFamily) {
        const invalidReligion = employeeFamily.filter(family => !['Islam', 'Katolik', 'Buda', 'Protestan', 'Konghucu'].includes(family.religion));
        if (invalidReligion.length) {
          return res.status(400).json({
            code: 400,
            message: 'invalid religion on employee family. Must be Islam, Katolik, Buda, Protestan, or Konghucu',
            data: null
          });
        }
        const invalidStatus = employeeFamily.filter(family => !['Suami', 'Istri', 'Anak', 'Anak Sambung'].includes(family.relation_status));
        if (invalidStatus.length) {
          return res.status(400).json({
            code: 400,
            message: 'Invalid relation_status on employee family. Must be Suami, Istri, Anak, Anak or Sambung',
            data: null
          });
        }
      }
      const employee = await Employee.create({
        nik,
        name,
        is_active,
        start_date,
        end_date,
        created_by
      });
      if (employeeProfile) {
        await EmployeeProfile.create({
          employee_id: employee.id,
          ...employeeProfile,
          created_by
        });
      }
      if (employeeFamily) {
        for (const family of employeeFamily) {
          await EmployeeFamily.create({
            employee_id: employee.id,
            ...family,
            created_by
          });
        }
      }
      if (education) {
        for (const edu of education) {
          await Education.create({
            employee_id: employee.id,
            ...edu,
            created_by: created_by || '',
            updated_by: ''
          });
        }
      }
      return res.status(201).json({
        code: 201,
        message: 'Employee created successfully',
        data: employee
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: null
      });
    }
  },

  async putEmployee(req, res) {
    try {
      const { nik, name, is_active, start_date, end_date, updated_by, employeeProfile, employeeFamily, education } = req.body;
      const employee = await Employee.findByPk(req.params.id);
      if (!employee) {
        return res.status(404).json({
          code: 404,
          message: 'Employee not found',
          data: null
        });
      }
      if ((!start_date) || (!end_date)) {
        return res.status(400).json({
          code: 400,
          message: 'start_date and end_date are required',
          data: null
        });
      }
      if (employeeProfile) {
        const existingEmployeeProfile = await EmployeeProfile.findOne({
          where: { employee_id: req.params.id, id: employeeProfile.id }
        });
        if (!existingEmployeeProfile) {
          return res.status(400).json({
            code: 400,
            message: 'Employee profile not found',
            data: null
          });
        }
        const validGenders = ['Laki-Laki', 'Perempuan'];
        if (!validGenders.includes(employeeProfile.gender)) {
          return res.status(400).json({
            code: 400,
            message: 'Invalid gender for employee profile. Must be Laki-Laki or Perempuan',
            data: null
          });
        }
      }
      if (education) {
        for (const edu of education) {
          const foundEdu = await Education.findOne({
            where: { employee_id: req.params.id, id: edu.id }
          });
          if (!foundEdu) {
            return res.status(400).json({
              code: 400,
              message: 'Some education id not found',
              data: null
            });
          }
        }
        const missingDescription = education.find(edu => !edu.description);
        if (missingDescription) {
          return res.status(400).json({
            code: 400,
            message: 'description on education is required',
            data: null
          });
        }
        const invalidLevels = education.filter(edu => !['Tk', 'Sd', 'Smp', 'Sma', 'Strata 1', 'Strata 2', 'Doktor', 'Profesor'].includes(edu.level));
        if (invalidLevels.length) {
          return res.status(400).json({
            code: 400,
            message: 'Invalid education level(s). Must be Tk, Sd, Smp, Sma, Strata 1, Strata 2, Doktor, or Profesor',
            data: null
          });
        }
      }
      if (employeeFamily) {
        for (const family of employeeFamily) {
          const foundFamily = await EmployeeFamily.findOne({
            where: { employee_id: req.params.id, id: family.id }
          });
          if (!foundFamily) {
            return res.status(400).json({
              code: 400,
              message: 'Some Family id not found',
              data: null
            });
          }
        }
        const invalidReligion = employeeFamily.filter(family => !['Islam', 'Katolik', 'Buda', 'Protestan', 'Konghucu'].includes(family.religion));
        if (invalidReligion.length) {
          return res.status(400).json({
            code: 400,
            message: 'invalid religion on employee family. Must be Islam, Katolik, Buda, Protestan, or Konghucu',
            data: null
          });
        }
        const invalidStatus = employeeFamily.filter(family => !['Suami', 'Istri', 'Anak', 'Anak Sambung'].includes(family.relation_status));
        if (invalidStatus.length) {
          return res.status(400).json({
            code: 400,
            message: 'Invalid relation_status on employee family. Must be Suami, Istri, Anak, Anak or Sambung',
            data: null
          });
        }
      }
      await employee.update({
        nik,
        name,
        is_active,
        start_date,
        end_date,
        updated_by
      });
      if (employeeProfile) {
        await EmployeeProfile.update({
          employee_id: req.params.id,
          ...employeeProfile,
          updated_by
        },
          {
            where: { employee_id: req.params.id, id: employeeProfile.id }
          });
      }
      if (employeeFamily) {
        for (const family of employeeFamily) {
          await EmployeeFamily.update({
            employee_id: req.params.id,
            ...family,
            updated_by
          },
            {
              where: { employee_id: req.params.id, id: family.id }
            });
        }
      }
      if (education) {
        for (const edu of education) {
          await Education.update({
            employee_id: employee.id,
            ...edu,
            updated_by: updated_by || ''
          },
            {
              where: { employee_id: req.params.id, id: edu.id }
            });
        }
      }
      return res.status(201).json({
        code: 201,
        message: 'Employee updated successfully',
        data: employee
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: null
      });
    }
  },

  async deleteEmployee(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id, {
        include: [
          { model: EmployeeProfile },
          { model: Education },
          { model: EmployeeFamily }
        ]
      });
      if (!employee) {
        return res.status(404).json({
          code: 404,
          message: 'Employee not found',
          data: null
        });
      }
      await employee.destroy();
      return res.json({
        code: 200,
        message: 'Employee deleted successfully',
        data: null
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: null
      });
    }
  },

  async getReportEmployee(req, res) {
    try {
      const employees = await Employee.findAll({
        attributes: [
          'id',
          'nik',
          'name',
          'is_active',
        ],
        include: [
          {
            model: EmployeeProfile,
            attributes: ['gender', 'date_of_birth'],
          },
          {
            model: Education,
            attributes: ['name', 'level'],
          },
          {
            model: EmployeeFamily,
            attributes: ['relation_status'],
          },
        ],
        where: { is_active: true },
        group: [
          'Employee.id',
          'Employee.name',
          'EmployeeProfile.id',
          'EmployeeProfile.gender',
          'Employee.nik',
          'EmployeeProfile.date_of_birth',
          'Education.id',
          'Education.name',
          'Education.level',
          'EmployeeFamilies.id',
        ],
      });

      const formattedEmployees = employees.map((employee) => {
        const { id, nik, name, is_active, gender, date_of_birth, level } = employee;
        const age = Math.floor(
          (new Date().getTime() - new Date(date_of_birth).getTime()) / (1000 * 3600 * 24 * 365.25)
        );
        const familyData = employee.EmployeeFamilies.reduce((acc, family) => {
          const { relation_status } = family;
          switch (relation_status) {
            case 'Suami':
              if (gender === 'Perempuan') {
                acc += acc ? ', ' : '';
                acc += 'Suami';
              }
              break;
            case 'Istri':
              if (gender === 'Laki-Laki') {
                acc += acc ? ', ' : '';
                acc += 'Istri';
              }
              break;
            case 'Anak':
              acc += acc ? ', ' : '';
              acc += 'Anak';
              break;
            case 'Anak Sambung':
              acc += acc ? ', ' : '';
              acc += 'Anak Sambung';
              break;
          }
          return acc;
        }, '');

        return {
          id,
          nik,
          name,
          is_active,
          gender,
          age: `${age} Years Old`,
          level,
          family_data: familyData || '',
        };
      });

      return res.status(200).json({
        code: 200,
        message: 'Employee Report Retrieved Successfully',
        data: formattedEmployees,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: null,
      });
    }
  }
};

module.exports = employeesController;
