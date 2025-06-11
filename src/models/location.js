const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Location', {
  location_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  parent_id: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'Locations', timestamps: false });
