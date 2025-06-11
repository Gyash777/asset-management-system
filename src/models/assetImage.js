const { DataTypes } = require('sequelize');
module.exports = (sequelize) => sequelize.define('AssetImage', {
  image_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  asset_id: { type: DataTypes.INTEGER, allowNull: false },
  filename: { type: DataTypes.STRING(255), allowNull: false },
  filepath: { type: DataTypes.STRING(500), allowNull: false }
}, { tableName: 'AssetImages', timestamps: false });
