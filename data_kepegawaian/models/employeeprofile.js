'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EmployeeProfile.belongsTo(models.Employee, {foreignKey: 'employee_id'})
    }
  }
  EmployeeProfile.init({
    employee_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    place_of_birth: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    gender:{
      type: DataTypes.ENUM,
      values: ['Laki-Laki', 'Perempuan']
    },
    is_married: DataTypes.BOOLEAN,
    prof_pict: DataTypes.STRING,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING,
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize,
    modelName: 'EmployeeProfile',
  });
  return EmployeeProfile;
};