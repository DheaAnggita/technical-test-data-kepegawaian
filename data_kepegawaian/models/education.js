'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    static associate(models) {
      Education.belongsTo(models.Employee, {foreignKey: 'employee_id'})
    }
  }
  Education.init({
    employee_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: DataTypes.STRING,
    level:{
      type: DataTypes.ENUM,
      values: ['Tk','Sd','Sma','Strata 1','Strata 2','Doktor','Profesor']
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by:{
      type: DataTypes.STRING,
      allowNull: false
    },
    updated_by:{
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
    modelName: 'Education',
  });
  return Education;
};