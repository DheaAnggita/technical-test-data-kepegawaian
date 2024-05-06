'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.hasMany(models.Education,{foreignKey: 'employee_id', onDelete: 'CASCADE', hooks: true})
      Employee.hasMany(models.EmployeeFamily,{foreignKey: 'employee_id', onDelete: 'CASCADE', hooks: true})
      Employee.hasOne(models.EmployeeProfile,{foreignKey: 'employee_id', onDelete: 'CASCADE', hooks: true})
    }
  }
  Employee.init({
    nik: DataTypes.STRING,
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    start_date:{
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};