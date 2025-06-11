const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('Vendor', {
  vendor_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, { tableName: 'Vendors', timestamps: false });
