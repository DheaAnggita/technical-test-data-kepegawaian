'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeFamily extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EmployeeFamily.belongsTo(models.Employee, {foreignKey: 'employee_id'})
    }
  }
  EmployeeFamily.init({
    employee_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: DataTypes.STRING,
    identifier: DataTypes.STRING,
    job: DataTypes.STRING,
    place_of_birth: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    religion:{
      type: DataTypes.ENUM,
      values: ['Islam','Katolik','Buda','Protestan','Konghucu']
    },
    is_life: DataTypes.BOOLEAN,
    is_divorced: DataTypes.BOOLEAN,
    relation_status:{
      type: DataTypes.ENUM,
      values: ['Suami','Istri','Anak','Anak Sambung']
    },
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
    modelName: 'EmployeeFamily',
  });
  return EmployeeFamily;
};